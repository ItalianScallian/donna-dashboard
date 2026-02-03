'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { CategoryScore } from '@/lib/types';
import { getCategoryLabel } from '@/lib/categorizer';

interface CategoryBreakdownProps {
  categories: CategoryScore[];
}

/* ================================================
   CUSTOM ANIMATED HORIZONTAL BAR
   No recharts — full control over animation
   ================================================ */
function AnimatedBar({ actual, optimal, maxValue, label, spend, delay, index }: {
  actual: number; optimal: number; maxValue: number; label: string; spend: number; delay: number; index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const actualWidth = maxValue > 0 ? (actual / maxValue) * 100 : 0;
  const optimalWidth = maxValue > 0 ? (optimal / maxValue) * 100 : 0;
  const missed = optimal - actual;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: delay + index * 0.08, duration: 0.5 }}
      className="group"
    >
      {/* Label row */}
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-text-primary font-medium truncate mr-4" style={{ fontFamily: 'var(--font-body)' }}>
          {label}
        </span>
        <div className="flex items-center gap-3 shrink-0 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
          <span className="text-accent">${actual.toFixed(2)}</span>
          {missed > 0.01 && (
            <span className="text-ps-red opacity-70">-${missed.toFixed(2)}</span>
          )}
          <span className="text-text-tertiary">${spend.toFixed(0)}</span>
        </div>
      </div>

      {/* Bar */}
      <div className="relative h-2.5 bg-surface-3 overflow-hidden group-hover:bg-surface-2 transition-colors">
        {/* Optimal bar (background) */}
        <motion.div
          className="absolute inset-y-0 left-0 bg-ps-cyan/15"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${Math.min(optimalWidth, 100)}%` } : {}}
          transition={{ delay: delay + index * 0.08 + 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Actual bar (foreground) */}
        <motion.div
          className="absolute inset-y-0 left-0 bg-accent"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${Math.min(actualWidth, 100)}%` } : {}}
          transition={{ delay: delay + index * 0.08 + 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Shimmer across bar */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
            }}
            initial={{ x: '-100%' }}
            animate={isInView ? { x: '200%' } : {}}
            transition={{ delay: delay + index * 0.08 + 0.8, duration: 0.6, ease: 'easeOut' }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ================================================
   MAIN CATEGORY BREAKDOWN
   ================================================ */
export default function CategoryBreakdown({ categories }: CategoryBreakdownProps) {
  const data = categories
    .filter(c => c.totalSpend > 0)
    .sort((a, b) => b.totalSpend - a.totalSpend)
    .slice(0, 10)
    .map(c => ({
      name: getCategoryLabel(c.category),
      actual: parseFloat(c.actualReward.toFixed(2)),
      optimal: parseFloat(c.optimalReward.toFixed(2)),
      missed: parseFloat(c.missedReward.toFixed(2)),
      spend: c.totalSpend,
    }));

  const maxValue = data.reduce((max, d) => Math.max(max, d.optimal), 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="border border-ps-border bg-surface p-6 md:p-8"
    >
      <div className="flex items-start justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-text-primary tracking-tight mb-1" style={{ fontFamily: 'var(--font-display)' }}>
            Category Breakdown
          </h3>
          <p className="text-text-tertiary text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
            Rewards earned vs. optimal by category
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-5 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-3 h-2 bg-accent" />
            <span className="text-[10px] text-text-secondary uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>Actual</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-2 bg-ps-cyan/15 border border-ps-cyan/30" />
            <span className="text-[10px] text-text-secondary uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>Optimal</span>
          </div>
        </div>
      </div>

      {data.length > 0 ? (
        <div className="space-y-5">
          {data.map((item, i) => (
            <AnimatedBar
              key={item.name}
              actual={item.actual}
              optimal={item.optimal}
              maxValue={maxValue}
              label={item.name}
              spend={item.spend}
              delay={0.5}
              index={i}
            />
          ))}
        </div>
      ) : (
        <p className="text-text-tertiary text-center py-8">No categorized spending data</p>
      )}
    </motion.div>
  );
}
