import type { Transaction } from '@/types'

export const SAMPLE_TRANSACTIONS: Transaction[] = [
  // January
  { date: '2024-01-03', merchant: 'Whole Foods Market', amount: 127.43, category: 'groceries', cardUsed: 'Chase Freedom Unlimited' },
  { date: '2024-01-05', merchant: 'Delta Airlines', amount: 342.00, category: 'flights', cardUsed: 'Chase Sapphire Preferred' },
  { date: '2024-01-07', merchant: 'Chipotle Mexican Grill', amount: 23.18, category: 'dining', cardUsed: 'Chase Freedom Unlimited' },
  { date: '2024-01-09', merchant: 'Shell Gas Station', amount: 68.50, category: 'gas', cardUsed: 'Chase Sapphire Preferred' },
  { date: '2024-01-11', merchant: 'Netflix', amount: 22.99, category: 'streaming', cardUsed: 'Chase Freedom Unlimited' },
  { date: '2024-01-14', merchant: 'Marriott Hotel', amount: 289.00, category: 'hotels', cardUsed: 'Chase Freedom Unlimited' },
  { date: '2024-01-16', merchant: 'Trader Joes', amount: 89.22, category: 'groceries', cardUsed: 'Chase Sapphire Preferred' },
  { date: '2024-01-18', merchant: 'Uber', amount: 34.50, category: 'transit', cardUsed: 'Chase Freedom Unlimited' },
  { date: '2024-01-20', merchant: 'The Cheesecake Factory', amount: 78.94, category: 'dining', cardUsed: 'Chase Freedom Unlimited' },
  { date: '2024-01-22', merchant: 'CVS Pharmacy', amount: 42.30, category: 'drugstores', cardUsed: 'Chase Sapphire Preferred' },
  { date: '2024-01-24', merchant: 'Amazon', amount: 156.78, category: 'shopping', cardUsed: 'Chase Freedom Unlimited' },
  { date: '2024-01-26', merchant: 'Spotify', amount: 10.99, category: 'streaming', cardUsed: 'Chase Sapphire Preferred' },
  { date: '2024-01-28', merchant: 'AMC Theaters', amount: 38.00, category: 'entertainment', cardUsed: 'Chase Freedom Unlimited' },
  { date: '2024-01-30', merchant: "McDonald's", amount: 14.23, category: 'dining', cardUsed: 'Chase Sapphire Preferred' },

  // February
  { date: '2024-02-02', merchant: 'Kroger', amount: 203.15, category: 'groceries', cardUsed: 'Chase Freedom Unlimited' },
  { date: '2024-02-04', merchant: 'United Airlines', amount: 589.00, category: 'flights', cardUsed: 'Chase Sapphire Preferred' },
  { date: '2024-02-06', merchant: 'Starbucks', amount: 28.45, category: 'dining', cardUsed: 'Chase Freedom Unlimited' },
  { date: '2024-02-08', merchant: 'BP Gas', amount: 72.18, category: 'gas', cardUsed: 'Chase Sapphire Preferred' },
  { date: '2024-02-10', merchant: 'Hilton Hotels', amount: 415.00, category: 'hotels', cardUsed: 'Chase Sapphire Preferred' },
  { date: '2024-02-12', merchant: 'Hulu', amount: 17.99, category: 'streaming', cardUsed: 'Chase Freedom Unlimited' },
  { date: '2024-02-14', merchant: 'Morton\'s Steakhouse', amount: 234.50, category: 'dining', cardUsed: 'Chase Freedom Unlimited' },
  { date: '2024-02-16', merchant: 'Walgreens', amount: 56.78, category: 'drugstores', cardUsed: 'Chase Freedom Unlimited' },
  { date: '2024-02-18', merchant: 'Target', amount: 143.29, category: 'shopping', cardUsed: 'Chase Sapphire Preferred' },
  { date: '2024-02-20', merchant: 'Lyft', amount: 22.50, category: 'transit', cardUsed: 'Chase Sapphire Preferred' },
  { date: '2024-02-22', merchant: 'Concert Tickets - StubHub', amount: 185.00, category: 'entertainment', cardUsed: 'Chase Freedom Unlimited' },
  { date: '2024-02-24', merchant: 'Safeway', amount: 97.63, category: 'groceries', cardUsed: 'Chase Sapphire Preferred' },
  { date: '2024-02-26', merchant: 'Sushi Restaurant', amount: 87.30, category: 'dining', cardUsed: 'Chase Sapphire Preferred' },
  { date: '2024-02-28', merchant: 'Disney+', amount: 13.99, category: 'streaming', cardUsed: 'Chase Freedom Unlimited' },

  // March
  { date: '2024-03-02', merchant: 'Whole Foods Market', amount: 178.90, category: 'groceries', cardUsed: 'Chase Freedom Unlimited' },
  { date: '2024-03-04', merchant: 'Southwest Airlines', amount: 278.00, category: 'flights', cardUsed: 'Chase Freedom Unlimited' },
  { date: '2024-03-06', merchant: 'Panera Bread', amount: 31.47, category: 'dining', cardUsed: 'Chase Sapphire Preferred' },
  { date: '2024-03-08', merchant: 'Exxon Gas', amount: 65.40, category: 'gas', cardUsed: 'Chase Freedom Unlimited' },
  { date: '2024-03-10', merchant: 'Amazon Prime', amount: 14.99, category: 'streaming', cardUsed: 'Chase Sapphire Preferred' },
  { date: '2024-03-12', merchant: 'Best Buy', amount: 329.00, category: 'shopping', cardUsed: 'Chase Freedom Unlimited' },
  { date: '2024-03-14', merchant: 'Olive Garden', amount: 64.82, category: 'dining', cardUsed: 'Chase Freedom Unlimited' },
  { date: '2024-03-16', merchant: 'Hyatt Hotels', amount: 356.00, category: 'hotels', cardUsed: 'Chase Sapphire Preferred' },
  { date: '2024-03-18', merchant: 'Rite Aid', amount: 38.92, category: 'drugstores', cardUsed: 'Chase Sapphire Preferred' },
  { date: '2024-03-20', merchant: 'Metro Transit', amount: 45.00, category: 'transit', cardUsed: 'Chase Freedom Unlimited' },
  { date: '2024-03-22', merchant: 'NBA Game Tickets', amount: 250.00, category: 'entertainment', cardUsed: 'Chase Sapphire Preferred' },
  { date: '2024-03-24', merchant: 'Costco', amount: 312.45, category: 'groceries', cardUsed: 'Chase Freedom Unlimited' },
  { date: '2024-03-26', merchant: 'Texas Roadhouse', amount: 52.17, category: 'dining', cardUsed: 'Chase Freedom Unlimited' },
  { date: '2024-03-28', merchant: 'Apple', amount: 999.00, category: 'shopping', cardUsed: 'Chase Sapphire Preferred' },
  { date: '2024-03-30', merchant: 'Chevron Gas', amount: 78.90, category: 'gas', cardUsed: 'Chase Freedom Unlimited' },
]

export const SAMPLE_CSV = `date,merchant,amount,category,card_used
2024-01-03,Whole Foods Market,127.43,groceries,Chase Freedom Unlimited
2024-01-05,Delta Airlines,342.00,flights,Chase Sapphire Preferred
2024-01-07,Chipotle Mexican Grill,23.18,dining,Chase Freedom Unlimited
2024-01-09,Shell Gas Station,68.50,gas,Chase Sapphire Preferred
2024-01-11,Netflix,22.99,streaming,Chase Freedom Unlimited
2024-01-14,Marriott Hotel,289.00,hotels,Chase Freedom Unlimited
2024-01-16,Trader Joes,89.22,groceries,Chase Sapphire Preferred
2024-01-18,Uber,34.50,transit,Chase Freedom Unlimited
2024-01-20,The Cheesecake Factory,78.94,dining,Chase Freedom Unlimited
2024-01-22,CVS Pharmacy,42.30,drugstores,Chase Sapphire Preferred
2024-01-24,Amazon,156.78,shopping,Chase Freedom Unlimited
2024-01-26,Spotify,10.99,streaming,Chase Sapphire Preferred
2024-01-28,AMC Theaters,38.00,entertainment,Chase Freedom Unlimited
2024-01-30,McDonald's,14.23,dining,Chase Sapphire Preferred
2024-02-02,Kroger,203.15,groceries,Chase Freedom Unlimited
2024-02-04,United Airlines,589.00,flights,Chase Sapphire Preferred
2024-02-06,Starbucks,28.45,dining,Chase Freedom Unlimited
2024-02-08,BP Gas,72.18,gas,Chase Sapphire Preferred
2024-02-10,Hilton Hotels,415.00,hotels,Chase Sapphire Preferred
2024-02-12,Hulu,17.99,streaming,Chase Freedom Unlimited
2024-02-14,Morton's Steakhouse,234.50,dining,Chase Freedom Unlimited
2024-02-16,Walgreens,56.78,drugstores,Chase Freedom Unlimited
2024-02-18,Target,143.29,shopping,Chase Sapphire Preferred
2024-02-20,Lyft,22.50,transit,Chase Sapphire Preferred
2024-02-22,Concert Tickets - StubHub,185.00,entertainment,Chase Freedom Unlimited
2024-02-24,Safeway,97.63,groceries,Chase Sapphire Preferred
2024-02-26,Sushi Restaurant,87.30,dining,Chase Sapphire Preferred
2024-02-28,Disney+,13.99,streaming,Chase Freedom Unlimited
2024-03-02,Whole Foods Market,178.90,groceries,Chase Freedom Unlimited
2024-03-04,Southwest Airlines,278.00,flights,Chase Freedom Unlimited
2024-03-06,Panera Bread,31.47,dining,Chase Sapphire Preferred
2024-03-08,Exxon Gas,65.40,gas,Chase Freedom Unlimited
2024-03-10,Amazon Prime,14.99,streaming,Chase Sapphire Preferred
2024-03-12,Best Buy,329.00,shopping,Chase Freedom Unlimited
2024-03-14,Olive Garden,64.82,dining,Chase Freedom Unlimited
2024-03-16,Hyatt Hotels,356.00,hotels,Chase Sapphire Preferred
2024-03-18,Rite Aid,38.92,drugstores,Chase Sapphire Preferred
2024-03-20,Metro Transit,45.00,transit,Chase Freedom Unlimited
2024-03-22,NBA Game Tickets,250.00,entertainment,Chase Sapphire Preferred
2024-03-24,Costco,312.45,groceries,Chase Freedom Unlimited
2024-03-26,Texas Roadhouse,52.17,dining,Chase Freedom Unlimited
2024-03-28,Apple,999.00,shopping,Chase Sapphire Preferred
2024-03-30,Chevron Gas,78.90,gas,Chase Freedom Unlimited`
