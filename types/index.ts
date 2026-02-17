export type Category =
  | 'dining'
  | 'groceries'
  | 'gas'
  | 'travel'
  | 'flights'
  | 'hotels'
  | 'entertainment'
  | 'streaming'
  | 'drugstores'
  | 'transit'
  | 'shopping'
  | 'other'

export interface CardRewards {
  [category: string]: number // multiplier (e.g. 3 = 3x points or 3% cash back)
  default: number // fallback for uncategorized spend
}

export interface CreditCard {
  id: string
  name: string
  issuer: string
  network: string
  rewards: CardRewards
  annualFee: number
  color: string // for UI
  gradient: string
  rewardType: 'points' | 'cashback' | 'miles'
  pointValue: number // cents per point/mile (for normalization)
  signupBonus?: string
  notes?: string
}

export interface Transaction {
  date: string
  merchant: string
  amount: number
  category: Category
  cardUsed: string // card name or ID
}

export interface AnalyzedTransaction extends Transaction {
  cardUsedMultiplier: number
  cardUsedReward: number // $ earned
  bestCard: string
  bestCardMultiplier: number
  bestCardReward: number // $ could have earned
  leftOnTable: number // $ difference
  efficiency: number // 0-100%
  status: 'optimal' | 'ok' | 'suboptimal'
}

export interface CategorySummary {
  category: Category
  totalSpend: number
  totalEarned: number
  totalOptimal: number
  leftOnTable: number
  efficiency: number
  transactionCount: number
}

export interface RecommendedCard {
  card: CreditCard
  additionalRewardsPerYear: number // if you had this card
  topCategories: string[]
  reason: string
}

export interface AnalysisResult {
  transactions: AnalyzedTransaction[]
  overallScore: number // 0-100
  totalSpend: number
  totalEarned: number
  totalOptimal: number
  totalLeftOnTable: number
  categorySummaries: CategorySummary[]
  recommendedCards: RecommendedCard[]
}
