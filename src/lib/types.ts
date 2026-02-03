export interface CategoryReward {
  category: string;
  multiplier: number;
  isRotating?: boolean;
  quarter?: number;
}

export interface CreditCard {
  id: string;
  name: string;
  issuer: string;
  annualFee: number;
  categories: CategoryReward[];
  baseReward: number;
  rewardType: 'cashback' | 'points' | 'miles';
  pointValue: number; // cents per point
}

export interface Transaction {
  date: string;
  description: string;
  amount: number;
  category?: string;
  cardId?: string;
  originalCategory?: string;
}

export interface ScoredTransaction extends Transaction {
  assignedCategory: string;
  actualCard: CreditCard | null;
  actualReward: number; // dollar value
  optimalCard: CreditCard;
  optimalReward: number; // dollar value
  missedReward: number; // dollar value
}

export interface CategoryScore {
  category: string;
  totalSpend: number;
  actualReward: number;
  optimalReward: number;
  missedReward: number;
  transactionCount: number;
}

export interface CardUsage {
  card: CreditCard;
  totalSpend: number;
  transactionCount: number;
  percentage: number;
}

export interface ScoreResult {
  grade: string;
  score: number; // 0-100
  totalSpend: number;
  actualRewardTotal: number;
  optimalRewardTotal: number;
  dollarsLeftOnTable: number;
  categoryScores: CategoryScore[];
  topMisses: ScoredTransaction[];
  bestCategory: CategoryScore | null;
  worstCategory: CategoryScore | null;
  cardUsage: CardUsage[];
  scoredTransactions: ScoredTransaction[];
}

export type Step = 'select-cards' | 'upload' | 'processing' | 'results';
