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
      className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
    >
      <h3 className="text-xl font-bold text-white mb-1">All Transactions</h3>
      <p className="text-slate-400 text-sm mb-4">{transactions.length} transactions analyzed</p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 text-xs uppercase border-b border-slate-700">
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
              <tr key={i} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                <td className="py-2.5 px-2 text-slate-400 whitespace-nowrap">{tx.date}</td>
                <td className="py-2.5 px-2 text-white font-medium max-w-[200px] truncate">{tx.description}</td>
                <td className="py-2.5 px-2">
                  <span className="px-2 py-0.5 bg-slate-700 rounded-full text-xs text-slate-300">
                    {getCategoryLabel(tx.assignedCategory)}
                  </span>
                </td>
                <td className="py-2.5 px-2 text-right text-white">${tx.amount.toFixed(2)}</td>
                <td className="py-2.5 px-2 text-right text-indigo-400">${tx.actualReward.toFixed(2)}</td>
                <td className="py-2.5 px-2 text-right text-cyan-400">${tx.optimalReward.toFixed(2)}</td>
                <td className={`py-2.5 px-2 text-right font-medium ${tx.missedReward > 0 ? 'text-red-400' : 'text-green-400'}`}>
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
            className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
          >
            {showAll ? 'Show Less' : `Show All ${transactions.length} Transactions`}
          </button>
        </div>
      )}
    </motion.div>
  );
}
