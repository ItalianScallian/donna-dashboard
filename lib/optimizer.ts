import type {
  Transaction,
  AnalyzedTransaction,
  CategorySummary,
  RecommendedCard,
  AnalysisResult,
  CreditCard,
  Category,
} from '@/types'
import { CARDS } from '@/data/cards'

/**
 * Get the reward rate (as a %) for a card in a specific category.
 * We normalize everything to "cash value cents per dollar" for comparison.
 */
export function getEffectiveRate(card: CreditCard, category: Category): number {
  const multiplier = (card.rewards[category] ?? card.rewards.default) as number
  // Convert to cash-equivalent %: multiplier × pointValue / 100
  return (multiplier * card.pointValue) / 100
}

/**
 * Given a set of owned cards, find the best card for a category.
 */
export function getBestCard(
  ownedCards: CreditCard[],
  category: Category
): { card: CreditCard; rate: number } {
  let best = ownedCards[0]
  let bestRate = getEffectiveRate(ownedCards[0], category)

  for (const card of ownedCards.slice(1)) {
    const rate = getEffectiveRate(card, category)
    if (rate > bestRate) {
      best = card
      bestRate = rate
    }
  }

  return { card: best, rate: bestRate }
}

/**
 * Parse a card name from a transaction to find the matching card.
 */
function resolveCard(name: string, allCards: CreditCard[]): CreditCard | null {
  // Exact match first
  const exact = allCards.find(
    (c) => c.name.toLowerCase() === name.toLowerCase() || c.id === name
  )
  if (exact) return exact

  // Fuzzy: does the transaction card name contain a card name?
  const fuzzy = allCards.find(
    (c) =>
      name.toLowerCase().includes(c.name.toLowerCase().split(' ').slice(-1)[0].toLowerCase()) ||
      c.name.toLowerCase().includes(name.toLowerCase())
  )
  return fuzzy ?? null
}

/**
 * Main analysis function — takes transactions + selected cards, returns full result.
 */
export function analyzeTransactions(
  transactions: Transaction[],
  selectedCardIds: string[]
): AnalysisResult {
  const ownedCards = CARDS.filter((c) => selectedCardIds.includes(c.id))

  if (ownedCards.length === 0) {
    throw new Error('Select at least one card')
  }

  let totalSpend = 0
  let totalEarned = 0
  let totalOptimal = 0

  const analyzed: AnalyzedTransaction[] = transactions.map((tx) => {
    const category = tx.category

    // Find the card actually used
    const usedCard = resolveCard(tx.cardUsed, ownedCards) ?? ownedCards[0]

    const usedRate = getEffectiveRate(usedCard, category)
    const usedReward = tx.amount * usedRate

    // Find the best possible card from owned cards
    const { card: bestCard, rate: bestRate } = getBestCard(ownedCards, category)
    const bestReward = tx.amount * bestRate

    const leftOnTable = bestReward - usedReward
    const efficiency = bestRate > 0 ? (usedRate / bestRate) * 100 : 100

    let status: 'optimal' | 'ok' | 'suboptimal'
    if (efficiency >= 99) status = 'optimal'
    else if (efficiency >= 60) status = 'ok'
    else status = 'suboptimal'

    totalSpend += tx.amount
    totalEarned += usedReward
    totalOptimal += bestReward

    return {
      ...tx,
      cardUsedMultiplier: usedCard.rewards[category] ?? usedCard.rewards.default,
      cardUsedReward: usedReward,
      bestCard: bestCard.name,
      bestCardMultiplier: bestCard.rewards[category] ?? bestCard.rewards.default,
      bestCardReward: bestReward,
      leftOnTable,
      efficiency,
      status,
    }
  })

  // Overall score: ratio of earned to optimal
  const overallScore = totalOptimal > 0 ? (totalEarned / totalOptimal) * 100 : 100

  // Category summaries
  const categoryMap = new Map<Category, { spend: number; earned: number; optimal: number; count: number }>()

  for (const tx of analyzed) {
    const cat = tx.category
    const existing = categoryMap.get(cat) ?? { spend: 0, earned: 0, optimal: 0, count: 0 }
    categoryMap.set(cat, {
      spend: existing.spend + tx.amount,
      earned: existing.earned + tx.cardUsedReward,
      optimal: existing.optimal + tx.bestCardReward,
      count: existing.count + 1,
    })
  }

  const categorySummaries: CategorySummary[] = Array.from(categoryMap.entries()).map(
    ([category, data]) => ({
      category,
      totalSpend: data.spend,
      totalEarned: data.earned,
      totalOptimal: data.optimal,
      leftOnTable: data.optimal - data.earned,
      efficiency: data.optimal > 0 ? (data.earned / data.optimal) * 100 : 100,
      transactionCount: data.count,
    })
  ).sort((a, b) => b.leftOnTable - a.leftOnTable)

  // Recommend unowned cards
  const unownedCards = CARDS.filter((c) => !selectedCardIds.includes(c.id))

  const recommendedCards: RecommendedCard[] = unownedCards.map((card) => {
    // How much would this card have earned on our transactions?
    let additionalRewards = 0
    const categoryGains = new Map<Category, number>()

    for (const tx of analyzed) {
      const rate = getEffectiveRate(card, tx.category)
      const potential = tx.amount * rate
      const currentBest = tx.bestCardReward

      // Only count if this card would beat what we currently earned
      const gain = potential - tx.cardUsedReward
      if (gain > 0) {
        additionalRewards += gain
        const existing = categoryGains.get(tx.category) ?? 0
        categoryGains.set(tx.category, existing + gain)
      }
    }

    // Top categories where this card helps most
    const topCategories = Array.from(categoryGains.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([cat]) => cat)

    const reason = generateRecommendationReason(card, topCategories, additionalRewards)

    return {
      card,
      additionalRewardsPerYear: additionalRewards * (12 / 3), // scale 3 months → 12
      topCategories,
      reason,
    }
  })
    .filter((r) => r.additionalRewardsPerYear > 5) // meaningful gains only
    .sort((a, b) => b.additionalRewardsPerYear - a.additionalRewardsPerYear)
    .slice(0, 5)

  return {
    transactions: analyzed,
    overallScore,
    totalSpend,
    totalEarned,
    totalOptimal,
    totalLeftOnTable: totalOptimal - totalEarned,
    categorySummaries,
    recommendedCards,
  }
}

function generateRecommendationReason(
  card: CreditCard,
  topCategories: string[],
  gains: number
): string {
  if (topCategories.length === 0) return `Solid flat-rate card for all spend`
  const catList = topCategories.slice(0, 2).join(' & ')
  return `Earns more on your ${catList} spend — you're leaving value on the table`
}

/**
 * Parse CSV text into Transaction array.
 */
export function parseCSV(text: string): Transaction[] {
  const lines = text.trim().split('\n')
  const header = lines[0].toLowerCase().split(',').map((h) => h.trim().replace(/"/g, ''))

  const dateIdx = header.findIndex((h) => h === 'date')
  const merchantIdx = header.findIndex((h) => h === 'merchant')
  const amountIdx = header.findIndex((h) => h === 'amount')
  const categoryIdx = header.findIndex((h) => h === 'category')
  const cardIdx = header.findIndex((h) => h.includes('card'))

  return lines.slice(1).map((line) => {
    const cols = line.split(',').map((c) => c.trim().replace(/"/g, ''))
    return {
      date: cols[dateIdx] ?? '',
      merchant: cols[merchantIdx] ?? '',
      amount: parseFloat(cols[amountIdx]) || 0,
      category: (cols[categoryIdx] ?? 'other') as Category,
      cardUsed: cols[cardIdx] ?? '',
    }
  }).filter((t) => t.amount > 0)
}
