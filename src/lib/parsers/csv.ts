import Papa from 'papaparse';
import { Transaction, DetectedCard, ParsedCSVResult } from '@/lib/types';
import { mapBankCategory, type BankFormat } from '@/lib/categorizer';

interface RawRow {
  [key: string]: string;
}

// Column name patterns for different bank formats
const DATE_COLUMNS = ['date', 'transaction date', 'trans date', 'post date', 'posting date', 'trans. date', 'posted date'];
const DESC_COLUMNS = ['description', 'merchant', 'name', 'memo', 'payee', 'transaction description', 'merchant name'];
const AMOUNT_COLUMNS = ['amount', 'debit', 'charge', 'transaction amount'];
const CATEGORY_COLUMNS = ['category', 'merchant category'];

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
  let cleaned = value.replace(/[$,\s]/g, '');
  if (cleaned.startsWith('(') && cleaned.endsWith(')')) {
    cleaned = '-' + cleaned.slice(1, -1);
  }
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

function normalizeAmount(amount: number, format: string): number {
  if (format === 'chase' || format === 'citi') {
    return amount < 0 ? Math.abs(amount) : -amount;
  }
  return amount;
}

export function detectBankFormat(headers: string[]): BankFormat {
  const lower = headers.map(h => h.toLowerCase().trim());
  const joined = lower.join(',');

  // Capital One: has "Card No." column — most distinctive
  if (lower.includes('card no.') && lower.includes('posted date')) return 'capital_one';

  // Amex: has "Appears On Your Statement As" — unique to Amex
  if (joined.includes('appears on your statement as')) return 'amex';

  // Discover: uses "Trans. Date" specifically
  if (lower.includes('trans. date') && lower.includes('post date') && lower.includes('category')) return 'discover';

  // Bank of America: has "Reference Number" and "Payee"
  if (lower.includes('reference number') && lower.includes('payee')) return 'boa';

  // Citi: has "Status" column with "Debit"/"Credit" split
  if (lower.includes('status') && lower.includes('debit') && lower.includes('credit')) return 'citi';

  // Chase: has "Post Date", "Type", "Category" — standard Chase format
  if (lower.includes('post date') && lower.includes('type') && lower.includes('category')) return 'chase';
  // Chase fallback: "Transaction Date" + "Post Date" + "Category"
  if (lower.includes('transaction date') && lower.includes('post date') && lower.includes('category')) return 'chase';

  return 'generic';
}

function formatToIssuer(format: BankFormat): string {
  switch (format) {
    case 'chase': return 'Chase';
    case 'amex': return 'Amex';
    case 'capital_one': return 'Capital One';
    case 'citi': return 'Citi';
    case 'discover': return 'Discover';
    case 'boa': return 'Bank of America';
    default: return '';
  }
}

export function detectIssuerFromCSV(csvContent: string): DetectedCard {
  const result = Papa.parse<RawRow>(csvContent, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h: string) => h.trim(),
    preview: 5, // only need a few rows
  });

  const headers = result.meta.fields || [];
  const format = detectBankFormat(headers);

  if (format === 'generic') {
    return { issuer: '', confidence: 'unknown' };
  }

  const issuer = formatToIssuer(format);

  // Try to narrow down to specific card
  // Capital One: check Card No. for last 4 digits
  if (format === 'capital_one' && result.data.length > 0) {
    const cardNoCol = findColumn(headers, ['card no.', 'card no']);
    if (cardNoCol) {
      const lastFour = result.data[0][cardNoCol]?.trim();
      if (lastFour) {
        return { issuer, confidence: 'issuer', lastFour };
      }
    }
  }

  return { issuer, confidence: 'issuer' };
}

export function parseCSV(csvContent: string, cardId?: string): ParsedCSVResult {
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
  const issuer = formatToIssuer(format);

  const dateCol = findColumn(headers, DATE_COLUMNS);
  const descCol = findColumn(headers, DESC_COLUMNS);
  const amountCol = findColumn(headers, AMOUNT_COLUMNS);
  const categoryCol = findColumn(headers, CATEGORY_COLUMNS);

  if (!dateCol || !descCol) {
    throw new Error(
      `Could not detect CSV format. Expected columns for date and description. Found: ${headers.join(', ')}`
    );
  }

  // Handle Citi / Capital One format with separate Debit/Credit columns
  const debitCol = findColumn(headers, ['debit']);
  const creditCol = findColumn(headers, ['credit']);

  const transactions: Transaction[] = [];

  for (const row of result.data) {
    const description = row[descCol]?.trim();
    if (!description) continue;

    let amount: number;
    if ((format === 'citi' || format === 'capital_one') && debitCol && creditCol) {
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

    // Extract bank category if available
    const rawBankCategory = categoryCol ? row[categoryCol]?.trim() : undefined;
    const mappedCategory = rawBankCategory ? mapBankCategory(rawBankCategory, format) : undefined;

    transactions.push({
      date: row[dateCol]?.trim() || '',
      description,
      amount: Math.round(amount * 100) / 100,
      category: mappedCategory || undefined,
      bankCategory: rawBankCategory || undefined,
      cardId: cardId || undefined,
    });
  }

  // Build detection result
  const detection: DetectedCard = format === 'generic'
    ? { issuer: '', confidence: 'unknown' }
    : { issuer, confidence: 'issuer' };

  // Capital One: extract last 4 digits
  if (format === 'capital_one') {
    const cardNoCol = findColumn(headers, ['card no.', 'card no']);
    if (cardNoCol && result.data.length > 0) {
      const lastFour = result.data[0][cardNoCol]?.trim();
      if (lastFour) {
        detection.lastFour = lastFour;
      }
    }
  }

  return { transactions, detection };
}

// Generate a sample CSV for testing (Chase format)
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
    ['01/23/2026', '01/24/2026', 'VERIZON WIRELESS', 'Bills & Utilities', 'Sale', '-85.00'],
    ['01/24/2026', '01/25/2026', 'TRADER JOES', 'Groceries', 'Sale', '-54.80'],
    ['01/25/2026', '01/26/2026', 'AMC THEATRES', 'Entertainment', 'Sale', '-28.00'],
  ];
  return rows.map(r => r.join(',')).join('\n');
}
