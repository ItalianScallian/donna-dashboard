import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}

export const CATEGORY_ICONS: Record<string, string> = {
  dining: '🍽️',
  groceries: '🛒',
  gas: '⛽',
  travel: '✈️',
  flights: '✈️',
  hotels: '🏨',
  entertainment: '🎭',
  streaming: '📺',
  drugstores: '💊',
  transit: '🚇',
  shopping: '🛍️',
  other: '💳',
}

export const CATEGORY_COLORS: Record<string, string> = {
  dining: '#f59e0b',
  groceries: '#10b981',
  gas: '#6366f1',
  travel: '#3b82f6',
  flights: '#60a5fa',
  hotels: '#8b5cf6',
  entertainment: '#ec4899',
  streaming: '#ef4444',
  drugstores: '#14b8a6',
  transit: '#a855f7',
  shopping: '#f97316',
  other: '#6b7280',
}
