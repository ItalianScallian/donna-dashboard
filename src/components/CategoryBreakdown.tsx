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
      className="border border-ps-border bg-surface p-6"
    >
      <h3 className="text-xl font-bold text-text-primary tracking-tight mb-1" style={{ fontFamily: 'var(--font-display)' }}>
        Category Breakdown
      </h3>
      <p className="text-text-tertiary text-sm mb-6" style={{ fontFamily: 'var(--font-mono)' }}>
        Actual vs. optimal rewards by category
      </p>

      {data.length > 0 ? (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 10, right: 20, top: 5, bottom: 5 }}>
              <XAxis
                type="number"
                tickFormatter={v => `$${v}`}
                tick={{ fill: '#555555', fontSize: 11, fontFamily: 'var(--font-mono)' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={120}
                tick={{ fill: '#888888', fontSize: 11, fontFamily: 'var(--font-body)' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111111',
                  border: '1px solid #222222',
                  borderRadius: '0px',
                  color: '#e8e8e8',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(value: any, name: any) => [
                  `$${Number(value).toFixed(2)}`,
                  name === 'actual' ? 'Your Rewards' : 'Optimal Rewards'
                ]}
                labelFormatter={(label) => String(label)}
              />
              <Bar dataKey="actual" name="actual" radius={[0, 2, 2, 0]} barSize={10}>
                {data.map((_, i) => (
                  <Cell key={i} fill="#c8ff00" />
                ))}
              </Bar>
              <Bar dataKey="optimal" name="optimal" radius={[0, 2, 2, 0]} barSize={10}>
                {data.map((_, i) => (
                  <Cell key={i} fill="#00e5ff" opacity={0.35} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-text-tertiary text-center py-8">No categorized spending data</p>
      )}

      {/* Legend */}
      <div className="flex items-center justify-center gap-8 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-1.5 bg-accent" />
          <span className="text-xs text-text-secondary" style={{ fontFamily: 'var(--font-mono)' }}>Your Rewards</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-1.5 bg-ps-cyan opacity-35" />
          <span className="text-xs text-text-secondary" style={{ fontFamily: 'var(--font-mono)' }}>Optimal Rewards</span>
        </div>
      </div>
    </motion.div>
  );
}
