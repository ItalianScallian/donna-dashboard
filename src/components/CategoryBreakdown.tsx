'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CategoryScore } from '@/lib/types';
import { getCategoryLabel } from '@/lib/categorizer';

interface CategoryBreakdownProps {
  categories: CategoryScore[];
}

export default function CategoryBreakdown({ categories }: CategoryBreakdownProps) {
  const data = categories
    .filter(c => c.totalSpend > 0)
    .slice(0, 10)
    .map(c => ({
      name: getCategoryLabel(c.category),
      actual: parseFloat(c.actualReward.toFixed(2)),
      optimal: parseFloat(c.optimalReward.toFixed(2)),
      missed: parseFloat(c.missedReward.toFixed(2)),
      spend: c.totalSpend,
    }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
    >
      <h3 className="text-xl font-bold text-white mb-1">Category Breakdown</h3>
      <p className="text-slate-400 text-sm mb-6">Actual vs. optimal rewards by spending category</p>

      {data.length > 0 ? (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 10, right: 20, top: 5, bottom: 5 }}>
              <XAxis type="number" tickFormatter={v => `$${v}`} tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" width={120} tick={{ fill: '#cbd5e1', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '12px',
                  color: '#fff',
                }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(value: any, name: any) => [`$${Number(value).toFixed(2)}`, name === 'actual' ? 'Your Rewards' : 'Optimal Rewards']}
                labelFormatter={(label) => String(label)}
              />
              <Bar dataKey="actual" name="actual" radius={[0, 4, 4, 0]} barSize={12}>
                {data.map((_, i) => (
                  <Cell key={i} fill="#6366f1" />
                ))}
              </Bar>
              <Bar dataKey="optimal" name="optimal" radius={[0, 4, 4, 0]} barSize={12}>
                {data.map((_, i) => (
                  <Cell key={i} fill="#22d3ee" opacity={0.5} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-slate-500 text-center py-8">No categorized spending data</p>
      )}

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-indigo-500" />
          <span className="text-sm text-slate-400">Your Rewards</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-cyan-400 opacity-50" />
          <span className="text-sm text-slate-400">Optimal Rewards</span>
        </div>
      </div>
    </motion.div>
  );
}
