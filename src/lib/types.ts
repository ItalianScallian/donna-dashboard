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
  bankCategory?: string; // raw category from the bank's CSV
}

export interface ScoredTransaction extends Transaction {
  assignedCategory: string;
  actualCard: CreditCard | null;
  actualReward: number; // dollar value
  optimalCard: CreditCard;
  optimalReward: number; // dollar value
  missedReward: number; // dollar value
  bankCategory?: string; // raw category from the bank's CSV
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

export type Issuer = 'Chase' | 'Amex' | 'Capital One' | 'Citi' | 'Discover' | 'Bank of America' | 'Wells Fargo' | 'US Bank' | 'Apple' | 'Barclays' | 'Synchrony' | 'TD Bank' | 'SoFi' | 'Alliant' | 'Fidelity';

export interface DetectedCard {
  issuer: Issuer | string;
  cardId?: string; // specific card if we can narrow it down
  confidence: 'exact' | 'issuer' | 'unknown';
  lastFour?: string; // from Capital One "Card No." column
}

export interface ParsedCSVResult {
  transactions: Transaction[];
  detection: DetectedCard;
}

export type Step = 'upload' | 'card-detection' | 'processing' | 'results';
