import { CreditCard, Transaction, ScoredTransaction, CategoryScore, CardUsage, ScoreResult } from '@/lib/types';
import { categorizeTransaction } from '@/lib/categorizer';

function getRewardForCard(card: CreditCard, category: string): number {
  // Check if card has a bonus for this category
  const catReward = card.categories.find(c => c.category === category);
  if (catReward) {
    return catReward.multiplier;
  }
  return card.baseReward;
}

function getRewardValue(card: CreditCard, amount: number, category: string): number {
  const multiplier = getRewardForCard(card, category);
  // multiplier * amount * (pointValue / 100) gives dollar value
  return (multiplier * amount * card.pointValue) / 100;
}

function findOptimalCard(cards: CreditCard[], category: string, amount: number): { card: CreditCard; reward: number } {
  let bestCard = cards[0];
  let bestReward = 0;

  for (const card of cards) {
    const reward = getRewardValue(card, amount, category);
    if (reward > bestReward) {
      bestReward = reward;
      bestCard = card;
    }
  }

  return { card: bestCard, reward: bestReward };
}

function calculateGrade(score: number): string {
  if (score >= 95) return 'A+';
  if (score >= 90) return 'A';
  if (score >= 85) return 'B+';
  if (score >= 80) return 'B';
  if (score >= 75) return 'C+';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

export function scoreTransactions(
  transactions: Transaction[],
  userCards: CreditCard[],
  actualCardId?: string // which card was used for these transactions
): ScoreResult {
  if (userCards.length === 0) {
    throw new Error('No cards selected');
  }

  const actualCard = actualCardId
    ? userCards.find(c => c.id === actualCardId) || userCards[0]
    : userCards[0];

  const scoredTransactions: ScoredTransaction[] = [];
  const categoryMap = new Map<string, CategoryScore>();
  const cardUsageMap = new Map<string, { card: CreditCard; totalSpend: number; transactionCount: number }>();

  let totalActualReward = 0;
  let totalOptimalReward = 0;
  let totalSpend = 0;

  for (const tx of transactions) {
    const category = categorizeTransaction(tx.description);
    const usedCard = tx.cardId ? userCards.find(c => c.id === tx.cardId) || actualCard : actualCard;
    const actualReward = getRewardValue(usedCard, tx.amount, category);
    const { card: optimalCard, reward: optimalReward } = findOptimalCard(userCards, category, tx.amount);
    const missedReward = Math.max(0, optimalReward - actualReward);

    scoredTransactions.push({
      ...tx,
      assignedCategory: category,
      actualCard: usedCard,
      actualReward: Math.round(actualReward * 100) / 100,
      optimalCard,
      optimalReward: Math.round(optimalReward * 100) / 100,
      missedReward: Math.round(missedReward * 100) / 100,
    });

    totalActualReward += actualReward;
    totalOptimalReward += optimalReward;
    totalSpend += tx.amount;

    // Aggregate by category
    const existing = categoryMap.get(category) || {
      category,
      totalSpend: 0,
      actualReward: 0,
      optimalReward: 0,
      missedReward: 0,
      transactionCount: 0,
    };
    existing.totalSpend += tx.amount;
    existing.actualReward += actualReward;
    existing.optimalReward += optimalReward;
    existing.missedReward += missedReward;
    existing.transactionCount += 1;
    categoryMap.set(category, existing);

    // Aggregate by card used
    const cardKey = usedCard.id;
    const cardEntry = cardUsageMap.get(cardKey) || { card: usedCard, totalSpend: 0, transactionCount: 0 };
    cardEntry.totalSpend += tx.amount;
    cardEntry.transactionCount += 1;
    cardUsageMap.set(cardKey, cardEntry);
  }

  // Round category scores
  const categoryScores: CategoryScore[] = Array.from(categoryMap.values()).map(cs => ({
    ...cs,
    totalSpend: Math.round(cs.totalSpend * 100) / 100,
    actualReward: Math.round(cs.actualReward * 100) / 100,
    optimalReward: Math.round(cs.optimalReward * 100) / 100,
    missedReward: Math.round(cs.missedReward * 100) / 100,
  }));

  // Sort by missed reward descending
  categoryScores.sort((a, b) => b.missedReward - a.missedReward);

  // Card usage
  const cardUsage: CardUsage[] = Array.from(cardUsageMap.values()).map(cu => ({
    ...cu,
    totalSpend: Math.round(cu.totalSpend * 100) / 100,
    percentage: totalSpend > 0 ? Math.round((cu.totalSpend / totalSpend) * 10000) / 100 : 0,
  }));
  cardUsage.sort((a, b) => b.totalSpend - a.totalSpend);

  // Top misses
  const topMisses = [...scoredTransactions]
    .sort((a, b) => b.missedReward - a.missedReward)
    .slice(0, 5);

  // Best and worst category
  const categoriesWithSpend = categoryScores.filter(c => c.totalSpend > 0 && c.category !== 'uncategorized');
  const worstCategory = categoriesWithSpend.length > 0 ? categoriesWithSpend[0] : null;
  const bestCategory = categoriesWithSpend.length > 0
    ? categoriesWithSpend.reduce((best, curr) => {
        const bestEfficiency = best.optimalReward > 0 ? best.actualReward / best.optimalReward : 0;
        const currEfficiency = curr.optimalReward > 0 ? curr.actualReward / curr.optimalReward : 0;
        return currEfficiency > bestEfficiency ? curr : best;
      })
    : null;

  // Score calculation
  const score = totalOptimalReward > 0
    ? Math.round((totalActualReward / totalOptimalReward) * 100)
    : 100;

  return {
    grade: calculateGrade(score),
    score: Math.min(100, Math.max(0, score)),
    totalSpend: Math.round(totalSpend * 100) / 100,
    actualRewardTotal: Math.round(totalActualReward * 100) / 100,
    optimalRewardTotal: Math.round(totalOptimalReward * 100) / 100,
    dollarsLeftOnTable: Math.round((totalOptimalReward - totalActualReward) * 100) / 100,
    categoryScores,
    topMisses,
    bestCategory,
    worstCategory,
    cardUsage,
    scoredTransactions,
  };
}
