import Papa from 'papaparse';
import { Transaction } from '@/lib/types';

interface RawRow {
  [key: string]: string;
}

// Column name patterns for different bank formats
const DATE_COLUMNS = ['date', 'transaction date', 'trans date', 'post date', 'posting date', 'trans. date'];
const DESC_COLUMNS = ['description', 'merchant', 'name', 'memo', 'payee', 'transaction description', 'merchant name'];
const AMOUNT_COLUMNS = ['amount', 'debit', 'charge', 'transaction amount'];
const CATEGORY_COLUMNS = ['category', 'type', 'transaction type', 'merchant category'];

function findColumn(headers: string[], patterns: string[]): string | null {
  const lowerHeaders = headers.map(h => h.toLowerCase().trim());
  for (const pattern of patterns) {
    const idx = lowerHeaders.indexOf(pattern);
    if (idx !== -1) return headers[idx];
  }
  // Partial match
  for (const pattern of patterns) {
    const idx = lowerHeaders.findIndex(h => h.includes(pattern));
    if (idx !== -1) return headers[idx];
  }
  return null;
}

function parseAmount(value: string): number {
  if (!value) return 0;
  // Remove currency symbols, spaces, parentheses
  let cleaned = value.replace(/[$,\s]/g, '');
  // Handle parenthetical negative: (123.45) → -123.45
  if (cleaned.startsWith('(') && cleaned.endsWith(')')) {
    cleaned = '-' + cleaned.slice(1, -1);
  }
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

// Chase CSVs have Amount as negative for purchases
// Amex uses positive for purchases
// We normalize to positive = purchase
function normalizeAmount(amount: number, format: string): number {
  if (format === 'chase' || format === 'citi') {
    return amount < 0 ? Math.abs(amount) : -amount; // negative = purchase in Chase
  }
  return amount; // Amex, Cap One: positive = purchase
}

function detectBankFormat(headers: string[]): string {
  const lower = headers.map(h => h.toLowerCase().trim()).join(',');
  if (lower.includes('post date') && lower.includes('category')) return 'chase';
  if (lower.includes('reference') && lower.includes('appears on your statement as')) return 'amex';
  if (lower.includes('posted date') && lower.includes('card no')) return 'capital_one';
  if (lower.includes('status') && lower.includes('debit') && lower.includes('credit')) return 'citi';
  return 'generic';
}

export function parseCSV(csvContent: string, cardId?: string): Transaction[] {
  const result = Papa.parse<RawRow>(csvContent, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h: string) => h.trim(),
  });

  if (!result.data || result.data.length === 0) {
    throw new Error('No data found in CSV file');
  }

  const headers = result.meta.fields || [];
  const format = detectBankFormat(headers);

  const dateCol = findColumn(headers, DATE_COLUMNS);
  const descCol = findColumn(headers, DESC_COLUMNS);
  const amountCol = findColumn(headers, AMOUNT_COLUMNS);
  const categoryCol = findColumn(headers, CATEGORY_COLUMNS);

  if (!dateCol || !descCol) {
    throw new Error(
      `Could not detect CSV format. Expected columns for date and description. Found: ${headers.join(', ')}`
    );
  }

  // Handle Citi format with separate Debit/Credit columns
  const debitCol = findColumn(headers, ['debit']);
  const creditCol = findColumn(headers, ['credit']);

  const transactions: Transaction[] = [];

  for (const row of result.data) {
    const description = row[descCol]?.trim();
    if (!description) continue;

    let amount: number;
    if (format === 'citi' && debitCol && creditCol) {
      const debit = parseAmount(row[debitCol]);
      const credit = parseAmount(row[creditCol]);
      amount = debit > 0 ? debit : -credit;
    } else if (amountCol) {
      amount = normalizeAmount(parseAmount(row[amountCol]), format);
    } else {
      continue;
    }

    // Skip credits/payments (negative after normalization)
    if (amount <= 0) continue;

    transactions.push({
      date: row[dateCol]?.trim() || '',
      description,
      amount: Math.round(amount * 100) / 100,
      category: categoryCol ? row[categoryCol]?.trim() : undefined,
      cardId: cardId || undefined,
    });
  }

  return transactions;
}

// Generate a sample CSV for testing
export function generateSampleCSV(): string {
  const rows = [
    ['Transaction Date', 'Post Date', 'Description', 'Category', 'Type', 'Amount'],
    ['01/02/2026', '01/03/2026', 'UBER EATS', 'Food & Drink', 'Sale', '-45.67'],
    ['01/03/2026', '01/04/2026', 'SHELL OIL', 'Gas', 'Sale', '-52.30'],
    ['01/04/2026', '01/05/2026', 'NETFLIX.COM', 'Entertainment', 'Sale', '-15.99'],
    ['01/05/2026', '01/06/2026', 'WHOLE FOODS MKT', 'Groceries', 'Sale', '-87.43'],
    ['01/06/2026', '01/07/2026', 'AMAZON.COM', 'Shopping', 'Sale', '-156.78'],
    ['01/07/2026', '01/08/2026', 'SOUTHWEST AIRLINES', 'Travel', 'Sale', '-324.00'],
    ['01/08/2026', '01/09/2026', 'COSTCO WHSE', 'Merchandise', 'Sale', '-210.55'],
    ['01/09/2026', '01/10/2026', 'STARBUCKS', 'Food & Drink', 'Sale', '-6.75'],
    ['01/10/2026', '01/11/2026', 'HOME DEPOT', 'Home', 'Sale', '-145.00'],
    ['01/11/2026', '01/12/2026', 'CHIPOTLE', 'Food & Drink', 'Sale', '-12.50'],
    ['01/12/2026', '01/13/2026', 'SPOTIFY', 'Entertainment', 'Sale', '-10.99'],
    ['01/13/2026', '01/14/2026', 'CHEVRON', 'Gas', 'Sale', '-48.00'],
    ['01/14/2026', '01/15/2026', 'KROGER', 'Groceries', 'Sale', '-63.21'],
    ['01/15/2026', '01/16/2026', 'UBER TRIP', 'Travel', 'Sale', '-22.45'],
    ['01/16/2026', '01/17/2026', 'DISNEY+ MONTHLY', 'Entertainment', 'Sale', '-13.99'],
    ['01/17/2026', '01/18/2026', 'CVS PHARMACY', 'Health', 'Sale', '-34.67'],
    ['01/18/2026', '01/19/2026', 'MARRIOTT HOTEL', 'Travel', 'Sale', '-189.00'],
    ['01/19/2026', '01/20/2026', 'CHICK-FIL-A', 'Food & Drink', 'Sale', '-11.25'],
    ['01/20/2026', '01/21/2026', 'WALGREENS', 'Health', 'Sale', '-18.99'],
    ['01/21/2026', '01/22/2026', 'TARGET', 'Shopping', 'Sale', '-76.50'],
    ['01/22/2026', '01/23/2026', 'PLANET FITNESS', 'Health', 'Sale', '-25.00'],
    ['01/23/2026', '01/24/2026', 'VERIZON WIRELESS', 'Bills', 'Sale', '-85.00'],
    ['01/24/2026', '01/25/2026', 'TRADER JOES', 'Groceries', 'Sale', '-54.80'],
    ['01/25/2026', '01/26/2026', 'AMC THEATRES', 'Entertainment', 'Sale', '-28.00'],
  ];
  return rows.map(r => r.join(',')).join('\n');
}
