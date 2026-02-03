'use client';

import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ScoreResult } from '@/lib/types';
import { getCategoryLabel } from '@/lib/categorizer';
import CategoryBreakdown from './CategoryBreakdown';
import TransactionTable from './TransactionTable';
import ShareScore from './ShareScore';

interface ReportCardProps {
  result: ScoreResult;
  onReset: () => void;
}

const gradeColors: Record<string, string> = {
  'A+': '#22c55e',
  'A': '#4ade80',
  'B+': '#a3e635',
  'B': '#facc15',
  'C+': '#fb923c',
  'C': '#f97316',
  'D': '#ef4444',
  'F': '#dc2626',
};

const PIE_COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#818cf8', '#6d28d9', '#7c3aed', '#4f46e5'];

export default function ReportCard({ result, onReset }: ReportCardProps) {
  const gradeColor = gradeColors[result.grade] || '#94a3b8';

  const pieData = result.cardUsage.map(cu => ({
    name: cu.card.name,
    value: cu.totalSpend,
    percentage: cu.percentage,
  }));

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Hero Grade */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="text-center py-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
          className="inline-flex items-center justify-center w-36 h-36 rounded-full mb-6"
          style={{
            background: `conic-gradient(${gradeColor} ${result.score * 3.6}deg, #1e293b ${result.score * 3.6}deg)`,
          }}
        >
          <div className="w-28 h-28 rounded-full bg-slate-900 flex items-center justify-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-5xl font-black"
              style={{ color: gradeColor }}
            >
              {result.grade}
            </motion.span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-2xl font-bold text-white mb-1">{result.score}% Rewards Efficiency</p>
          <p className="text-lg text-slate-400">
            on <span className="text-white font-semibold">${result.totalSpend.toFixed(2)}</span> total spending
          </p>
        </motion.div>
      </motion.div>

      {/* Key Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 text-center">
          <p className="text-sm text-slate-400 mb-1">You Earned</p>
          <p className="text-2xl font-bold text-green-400">${result.actualRewardTotal.toFixed(2)}</p>
          <p className="text-xs text-slate-500 mt-1">in rewards</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 text-center">
          <p className="text-sm text-slate-400 mb-1">Could Have Earned</p>
          <p className="text-2xl font-bold text-cyan-400">${result.optimalRewardTotal.toFixed(2)}</p>
          <p className="text-xs text-slate-500 mt-1">with optimal cards</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5 text-center">
          <p className="text-sm text-red-300 mb-1">Left on the Table</p>
          <p className="text-2xl font-bold text-red-400">${result.dollarsLeftOnTable.toFixed(2)}</p>
          <p className="text-xs text-red-400/60 mt-1">in missed rewards</p>
        </div>
      </motion.div>

      {/* Best & Worst Category */}
      {(result.bestCategory || result.worstCategory) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {result.bestCategory && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5">
              <p className="text-sm text-green-300 mb-1">🏆 Best Category</p>
              <p className="text-lg font-bold text-white">{getCategoryLabel(result.bestCategory.category)}</p>
              <p className="text-sm text-slate-400 mt-1">
                ${result.bestCategory.actualReward.toFixed(2)} earned on ${result.bestCategory.totalSpend.toFixed(2)} spend
              </p>
            </div>
          )}
          {result.worstCategory && (
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-5">
              <p className="text-sm text-orange-300 mb-1">😬 Biggest Miss</p>
              <p className="text-lg font-bold text-white">{getCategoryLabel(result.worstCategory.category)}</p>
              <p className="text-sm text-slate-400 mt-1">
                Left ${result.worstCategory.missedReward.toFixed(2)} on the table
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* Top 5 Worst Transactions */}
      {result.topMisses.length > 0 && result.topMisses[0].missedReward > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-1">Top Missed Opportunities</h3>
          <p className="text-slate-400 text-sm mb-4">Transactions where you missed the most rewards</p>

          <div className="space-y-3">
            {result.topMisses.filter(m => m.missedReward > 0).map((tx, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold text-sm shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">{tx.description}</p>
                  <p className="text-slate-400 text-xs mt-0.5">
                    ${tx.amount.toFixed(2)} • {getCategoryLabel(tx.assignedCategory)}
                  </p>
                  <p className="text-red-400 text-xs mt-1">
                    Used <span className="font-medium">{tx.actualCard?.name || 'Unknown'}</span>
                    {' → Should have used '}
                    <span className="font-medium text-cyan-400">{tx.optimalCard.name}</span>
                    {' for '}
                    <span className="font-medium">${tx.missedReward.toFixed(2)} more</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Category Breakdown */}
      <CategoryBreakdown categories={result.categoryScores} />

      {/* Card Usage Pie Chart */}
      {pieData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-1">Card Usage</h3>
          <p className="text-slate-400 text-sm mb-6">How your spending was distributed across cards</p>

          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="w-48 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '12px',
                      color: '#fff',
                    }}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter={(value: any) => [`$${Number(value).toFixed(2)}`, 'Spend']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {result.cardUsage.map((cu, i) => (
                <div key={cu.card.id} className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-sm shrink-0"
                    style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
                  />
                  <span className="text-sm text-white flex-1 truncate">{cu.card.name}</span>
                  <span className="text-sm text-slate-400">{cu.percentage.toFixed(1)}%</span>
                  <span className="text-sm text-slate-500 w-24 text-right">${cu.totalSpend.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* All Transactions */}
      <TransactionTable transactions={result.scoredTransactions} />

      {/* Share */}
      <ShareScore
        grade={result.grade}
        score={result.score}
        dollarsLeftOnTable={result.dollarsLeftOnTable}
      />

      {/* Reset */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center pb-8"
      >
        <button
          onClick={onReset}
          className="px-6 py-3 rounded-xl font-medium text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-all"
        >
          ← Start Over
        </button>
      </motion.div>
    </div>
  );
}
