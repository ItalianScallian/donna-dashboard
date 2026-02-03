'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
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

const gradeClasses: Record<string, string> = {
  'A+': 'grade-a-plus',
  'A': 'grade-a',
  'B+': 'grade-b-plus',
  'B': 'grade-b',
  'C+': 'grade-c-plus',
  'C': 'grade-c',
  'D': 'grade-d',
  'F': 'grade-f',
};

const PIE_COLORS = ['#c8ff00', '#00e5ff', '#ff4444', '#ff8800', '#00cc66', '#8855ff', '#ff55aa', '#ffdd00'];

function CountUp({ target, decimals = 2, prefix = '', duration = 1.5 }: { target: number; decimals?: number; prefix?: string; duration?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${prefix}${v.toFixed(decimals)}`);
  const [display, setDisplay] = useState(`${prefix}${(0).toFixed(decimals)}`);

  useEffect(() => {
    const controls = animate(count, target, { duration, ease: [0.22, 1, 0.36, 1] });
    const unsub = rounded.on('change', (v) => setDisplay(v));
    return () => { controls.stop(); unsub(); };
  }, [target, count, rounded, duration]);

  return <span>{display}</span>;
}

export default function ReportCard({ result, onReset }: ReportCardProps) {
  const gradeClass = gradeClasses[result.grade] || '';

  const pieData = result.cardUsage.map(cu => ({
    name: cu.card.name,
    value: cu.totalSpend,
    percentage: cu.percentage,
  }));

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Hero Grade Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center py-12 relative"
      >
        {/* Grade Letter — THE HERO MOMENT */}
        <motion.div
          initial={{ scale: 3, opacity: 0, filter: 'blur(20px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.3, duration: 0.6, type: 'spring', stiffness: 120, damping: 15 }}
          className="mb-6"
        >
          <span
            className={`text-[120px] md:text-[160px] font-extrabold leading-none ${gradeClass}`}
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {result.grade}
          </span>
        </motion.div>

        {/* Score percentage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            <CountUp target={result.score} decimals={0} duration={1.2} />% Rewards Efficiency
          </p>
          <p className="text-text-secondary text-lg">
            on <span className="text-text-primary font-semibold" style={{ fontFamily: 'var(--font-mono)' }}>${result.totalSpend.toFixed(2)}</span> total spending
          </p>
        </motion.div>

        {/* Background accent glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(200,255,0,0.06) 0%, transparent 70%)' }}
        />
      </motion.div>

      {/* Key Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-1"
      >
        <div className="border border-ps-border bg-surface p-6 text-center">
          <p className="text-[10px] text-text-tertiary uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-mono)' }}>You Earned</p>
          <p className="text-3xl font-bold text-ps-green" style={{ fontFamily: 'var(--font-mono)' }}>
            <CountUp target={result.actualRewardTotal} prefix="$" />
          </p>
          <p className="text-text-tertiary text-xs mt-1">in rewards</p>
        </div>
        <div className="border border-ps-border bg-surface p-6 text-center">
          <p className="text-[10px] text-text-tertiary uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-mono)' }}>Could Have Earned</p>
          <p className="text-3xl font-bold text-ps-cyan" style={{ fontFamily: 'var(--font-mono)' }}>
            <CountUp target={result.optimalRewardTotal} prefix="$" />
          </p>
          <p className="text-text-tertiary text-xs mt-1">with optimal cards</p>
        </div>
        <div className="border border-ps-red/30 bg-red-dim p-6 text-center">
          <p className="text-[10px] text-ps-red/70 uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-mono)' }}>Left on Table</p>
          <p className="text-3xl font-bold text-ps-red" style={{ fontFamily: 'var(--font-mono)' }}>
            <CountUp target={result.dollarsLeftOnTable} prefix="$" duration={2} />
          </p>
          <p className="text-ps-red/50 text-xs mt-1">in missed rewards</p>
        </div>
      </motion.div>

      {/* Best & Worst Category */}
      {(result.bestCategory || result.worstCategory) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-1"
        >
          {result.bestCategory && (
            <div className="border border-ps-green/30 bg-green-dim p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-ps-green text-xs font-bold uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
                  ▲ Best Category
                </span>
              </div>
              <p className="text-lg font-bold text-text-primary" style={{ fontFamily: 'var(--font-display)' }}>
                {getCategoryLabel(result.bestCategory.category)}
              </p>
              <p className="text-text-secondary text-sm mt-1" style={{ fontFamily: 'var(--font-mono)' }}>
                ${result.bestCategory.actualReward.toFixed(2)} earned on ${result.bestCategory.totalSpend.toFixed(2)}
              </p>
            </div>
          )}
          {result.worstCategory && (
            <div className="border border-ps-red/30 bg-red-dim p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-ps-red text-xs font-bold uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
                  ▼ Biggest Miss
                </span>
              </div>
              <p className="text-lg font-bold text-text-primary" style={{ fontFamily: 'var(--font-display)' }}>
                {getCategoryLabel(result.worstCategory.category)}
              </p>
              <p className="text-text-secondary text-sm mt-1" style={{ fontFamily: 'var(--font-mono)' }}>
                Left ${result.worstCategory.missedReward.toFixed(2)} on the table
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* Top Missed Opportunities */}
      {result.topMisses.length > 0 && result.topMisses[0].missedReward > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="border border-ps-border bg-surface p-6"
        >
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-xl font-bold text-text-primary tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Top Missed Opportunities
            </h3>
          </div>
          <p className="text-text-tertiary text-sm mb-5" style={{ fontFamily: 'var(--font-mono)' }}>
            Where you left the most money
          </p>

          <div className="space-y-1">
            {result.topMisses.filter(m => m.missedReward > 0).map((tx, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                className="flex items-start gap-4 p-4 border border-ps-border hover:border-ps-red/30 transition-colors group"
              >
                <div className="w-7 h-7 border border-ps-red/50 bg-red-dim flex items-center justify-center text-ps-red font-bold text-xs shrink-0" style={{ fontFamily: 'var(--font-mono)' }}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-text-primary font-medium text-sm truncate">{tx.description}</p>
                  <p className="text-text-tertiary text-xs mt-1" style={{ fontFamily: 'var(--font-mono)' }}>
                    ${tx.amount.toFixed(2)} · {getCategoryLabel(tx.assignedCategory)}
                  </p>
                  <div className="mt-2 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
                    <span className="text-text-secondary">Used </span>
                    <span className="text-text-primary">{tx.actualCard?.name || 'Unknown'}</span>
                    <span className="text-accent mx-2">→</span>
                    <span className="text-ps-cyan">{tx.optimalCard.name}</span>
                    <span className="text-ps-red ml-2 font-bold">-${tx.missedReward.toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>
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
          className="border border-ps-border bg-surface p-6"
        >
          <h3 className="text-xl font-bold text-text-primary tracking-tight mb-1" style={{ fontFamily: 'var(--font-display)' }}>
            Card Usage
          </h3>
          <p className="text-text-tertiary text-sm mb-6" style={{ fontFamily: 'var(--font-mono)' }}>
            Spending distribution across your cards
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="w-48 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
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
                    formatter={(value: any) => [`$${Number(value).toFixed(2)}`, 'Spend']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {result.cardUsage.map((cu, i) => (
                <div key={cu.card.id} className="flex items-center gap-3 py-1">
                  <div
                    className="w-2.5 h-2.5 shrink-0"
                    style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
                  />
                  <span className="text-sm text-text-primary flex-1 truncate">{cu.card.name}</span>
                  <span className="text-sm text-text-tertiary" style={{ fontFamily: 'var(--font-mono)' }}>
                    {cu.percentage.toFixed(1)}%
                  </span>
                  <span className="text-sm text-text-secondary w-24 text-right" style={{ fontFamily: 'var(--font-mono)' }}>
                    ${cu.totalSpend.toFixed(2)}
                  </span>
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
        transition={{ delay: 1.5 }}
        className="text-center pb-8"
      >
        <button
          onClick={onReset}
          className="px-6 py-3 font-medium text-text-secondary hover:text-accent border border-ps-border hover:border-accent/30 bg-surface transition-all"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          ← Start Over
        </button>
      </motion.div>
    </div>
  );
}
