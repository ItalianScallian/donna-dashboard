'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ScoredTransaction } from '@/lib/types';
import { getCategoryLabel } from '@/lib/categorizer';

interface TransactionTableProps {
  transactions: ScoredTransaction[];
}

export default function TransactionTable({ transactions }: TransactionTableProps) {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? transactions : transactions.slice(0, 10);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="border border-ps-border bg-surface p-6"
    >
      <h3 className="text-xl font-bold text-text-primary tracking-tight mb-1" style={{ fontFamily: 'var(--font-display)' }}>
        All Transactions
      </h3>
      <p className="text-text-tertiary text-sm mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
        {transactions.length} transactions analyzed
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-text-tertiary text-[10px] uppercase tracking-wider border-b border-ps-border" style={{ fontFamily: 'var(--font-mono)' }}>
              <th className="text-left py-3 px-2">Date</th>
              <th className="text-left py-3 px-2">Description</th>
              <th className="text-left py-3 px-2">Category</th>
              <th className="text-right py-3 px-2">Amount</th>
              <th className="text-right py-3 px-2">Earned</th>
              <th className="text-right py-3 px-2">Optimal</th>
              <th className="text-right py-3 px-2">Missed</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map((tx, i) => (
              <tr key={i} className="border-b border-ps-border/50 hover:bg-surface-2 transition-colors">
                <td className="py-2.5 px-2 text-text-tertiary whitespace-nowrap" style={{ fontFamily: 'var(--font-mono)' }}>{tx.date}</td>
                <td className="py-2.5 px-2 text-text-primary font-medium max-w-[200px] truncate">{tx.description}</td>
                <td className="py-2.5 px-2">
                  <span className="px-2 py-0.5 bg-surface-3 border border-ps-border text-[10px] text-text-secondary uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
                    {getCategoryLabel(tx.assignedCategory)}
                  </span>
                </td>
                <td className="py-2.5 px-2 text-right text-text-primary" style={{ fontFamily: 'var(--font-mono)' }}>${tx.amount.toFixed(2)}</td>
                <td className="py-2.5 px-2 text-right text-accent" style={{ fontFamily: 'var(--font-mono)' }}>${tx.actualReward.toFixed(2)}</td>
                <td className="py-2.5 px-2 text-right text-ps-cyan" style={{ fontFamily: 'var(--font-mono)' }}>${tx.optimalReward.toFixed(2)}</td>
                <td className={`py-2.5 px-2 text-right font-medium ${tx.missedReward > 0 ? 'text-ps-red' : 'text-ps-green'}`} style={{ fontFamily: 'var(--font-mono)' }}>
                  {tx.missedReward > 0 ? `-$${tx.missedReward.toFixed(2)}` : '✓'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {transactions.length > 10 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-accent hover:text-accent-dim text-sm font-medium transition-colors"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {showAll ? '← Show Less' : `Show All ${transactions.length} Transactions →`}
          </button>
        </div>
      )}
    </motion.div>
  );
}
