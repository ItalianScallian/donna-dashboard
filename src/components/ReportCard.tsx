'use client';

import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
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

const gradeGlowColors: Record<string, string> = {
  'A+': 'rgba(0, 255, 136, 0.3)',
  'A': 'rgba(102, 255, 153, 0.25)',
  'B+': 'rgba(200, 255, 0, 0.3)',
  'B': 'rgba(255, 221, 0, 0.25)',
  'C+': 'rgba(255, 136, 0, 0.25)',
  'C': 'rgba(255, 102, 0, 0.25)',
  'D': 'rgba(255, 68, 68, 0.25)',
  'F': 'rgba(255, 0, 0, 0.3)',
};

const PIE_COLORS = ['#c8ff00', '#00e5ff', '#ff4444', '#ff8800', '#00cc66', '#8855ff', '#ff55aa', '#ffdd00'];

/* ================================================
   ANIMATED COUNTER
   ================================================ */
function CountUp({ target, decimals = 2, prefix = '', duration = 1.5, delay = 0 }: {
  target: number; decimals?: number; prefix?: string; duration?: number; delay?: number
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${prefix}${v.toFixed(decimals)}`);
  const [display, setDisplay] = useState(`${prefix}${(0).toFixed(decimals)}`);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const controls = animate(count, target, { duration, ease: [0.22, 1, 0.36, 1] });
      const unsub = rounded.on('change', (v) => setDisplay(v));
      return () => { controls.stop(); unsub(); };
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [target, count, rounded, duration, delay]);

  return <span>{display}</span>;
}

/* ================================================
   SLOT MACHINE GRADE REVEAL
   Cycles through random characters before landing on the grade
   ================================================ */
function GradeReveal({ grade, className }: { grade: string; className: string }) {
  const [displayGrade, setDisplayGrade] = useState('');
  const [phase, setPhase] = useState<'cycling' | 'revealed'>('cycling');
  const allGrades = ['F', 'D', 'C', 'C+', 'B', 'B+', 'A', 'A+'];

  useEffect(() => {
    let count = 0;
    const maxCycles = 15;
    const interval = setInterval(() => {
      if (count < maxCycles) {
        setDisplayGrade(allGrades[Math.floor(Math.random() * allGrades.length)]);
        count++;
      } else {
        setDisplayGrade(grade);
        setPhase('revealed');
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [grade]);

  return (
    <motion.span
      className={className}
      animate={phase === 'revealed' ? {
        scale: [1.3, 0.95, 1.05, 1],
      } : {
        filter: 'blur(2px)',
      }}
      transition={phase === 'revealed' ? {
        duration: 0.5,
        times: [0, 0.4, 0.7, 1],
        ease: 'easeOut',
      } : undefined}
      style={{
        fontFamily: 'var(--font-display)',
        filter: phase === 'cycling' ? 'blur(2px)' : 'blur(0px)',
        transition: 'filter 0.15s ease',
      }}
    >
      {displayGrade}
    </motion.span>
  );
}

/* ================================================
   PULSE RING EFFECT
   ================================================ */
function PulseRings({ color, count = 3, delay = 0 }: { color: string; count?: number; delay?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ border: `1px solid ${color}` }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.8, 2.5 + i * 0.5], opacity: [0.5, 0] }}
          transition={{
            delay: delay + 1.2 + i * 0.25,
            duration: 1.8,
            ease: 'easeOut',
          }}
        />
      ))}
    </>
  );
}

/* ================================================
   CONFETTI (for A+ grades)
   ================================================ */
function Confetti() {
  const pieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ['#c8ff00', '#00e5ff', '#00ff88', '#ffffff'][Math.floor(Math.random() * 4)],
    rotation: Math.random() * 720,
    delay: Math.random() * 0.5,
    size: Math.random() * 6 + 3,
    duration: Math.random() * 2 + 1.5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pieces.map(p => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: '40%',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          initial={{ y: 0, opacity: 1, rotate: 0 }}
          animate={{
            y: [0, -150, 250],
            x: [0, (Math.random() - 0.5) * 200],
            opacity: [0, 1, 1, 0],
            rotate: p.rotation,
          }}
          transition={{
            delay: 1.5 + p.delay,
            duration: p.duration,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

/* ================================================
   SCORE ARC — animated conic gradient ring
   ================================================ */
function ScoreArc({ score, color, delay = 0 }: { score: number; color: string; delay?: number }) {
  const progress = useMotionValue(0);
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const controls = animate(progress, score, { duration: 1.5, ease: [0.22, 1, 0.36, 1] });
      const unsub = progress.on('change', (v) => setCurrentProgress(v));
      return () => { controls.stop(); unsub(); };
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [score, progress, delay]);

  return (
    <div
      className="absolute inset-0 rounded-full pointer-events-none"
      style={{
        background: `conic-gradient(${color} ${currentProgress * 3.6}deg, transparent ${currentProgress * 3.6}deg)`,
        mask: 'radial-gradient(circle, transparent 65%, black 66%, black 100%)',
        WebkitMask: 'radial-gradient(circle, transparent 65%, black 66%, black 100%)',
        opacity: 0.6,
      }}
    />
  );
}

/* ================================================
   SCREEN FLASH OVERLAY
   ================================================ */
function ScreenFlash({ delay = 1 }: { delay?: number }) {
  return (
    <motion.div
      className="fixed inset-0 bg-white pointer-events-none z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.3, 0] }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
    />
  );
}

/* ================================================
   STAT CARD with animated border
   ================================================ */
function StatCard({ label, value, prefix, color, borderColor, bgColor, delay, subtext }: {
  label: string; value: number; prefix: string; color: string; borderColor: string; bgColor: string; delay: number; subtext: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 200, damping: 20 }}
      className="relative p-6 text-center overflow-hidden"
      style={{ border: `1px solid ${borderColor}`, background: bgColor }}
    >
      <p className="text-[10px] uppercase tracking-wider mb-2 opacity-60" style={{ fontFamily: 'var(--font-mono)', color }}>{label}</p>
      <p className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-mono)', color }}>
        <CountUp target={value} prefix={prefix} delay={delay} />
      </p>
      <p className="text-xs mt-1 opacity-40" style={{ color }}>{subtext}</p>

      {/* Shimmer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(105deg, transparent 40%, ${color}08 50%, transparent 60%)`,
        }}
        initial={{ x: '-100%' }}
        animate={{ x: ['100%'] }}
        transition={{ delay: delay + 0.5, duration: 1, ease: 'easeOut' }}
      />
    </motion.div>
  );
}

/* ================================================
   MAIN REPORT CARD COMPONENT
   ================================================ */
export default function ReportCard({ result, onReset }: ReportCardProps) {
  const gradeClass = gradeClasses[result.grade] || '';
  const glowColor = gradeGlowColors[result.grade] || 'rgba(200, 255, 0, 0.3)';
  const isTopGrade = result.grade === 'A+' || result.grade === 'A';

  const pieData = result.cardUsage.map(cu => ({
    name: cu.card.name,
    value: cu.totalSpend,
    percentage: cu.percentage,
  }));

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Screen flash on reveal */}
      <ScreenFlash delay={0.8} />

      {/* Confetti for top grades */}
      {isTopGrade && <Confetti />}

      {/* ========== HERO GRADE SECTION ========== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center py-16 md:py-20 relative"
      >
        {/* Background radial glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.0, duration: 1 }}
          style={{ background: `radial-gradient(circle, ${glowColor} 0%, transparent 60%)` }}
        />

        {/* Score arc ring */}
        <div className="relative inline-block w-48 h-48 md:w-56 md:h-56 mx-auto mb-8">
          <ScoreArc score={result.score} color={`color-mix(in srgb, currentColor 80%, transparent)`} delay={0.5} />

          {/* Pulse rings */}
          <PulseRings color={glowColor} />

          {/* Grade in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <GradeReveal
              grade={result.grade}
              className={`text-[100px] md:text-[130px] font-extrabold leading-none ${gradeClass}`}
            />
          </div>
        </div>

        {/* Score + context */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <p className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            <CountUp target={result.score} decimals={0} duration={1.2} delay={1.5} />% Rewards Efficiency
          </p>
          <p className="text-text-secondary text-lg">
            across{' '}
            <span className="text-text-primary font-semibold" style={{ fontFamily: 'var(--font-mono)' }}>
              ${result.totalSpend.toFixed(2)}
            </span>
            {' '}in spending
          </p>
        </motion.div>

        {/* Breathing glow behind grade */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)` }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* ========== KEY STATS — cascading cards ========== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
        <StatCard
          label="You Earned"
          value={result.actualRewardTotal}
          prefix="$"
          color="var(--green)"
          borderColor="rgba(0, 204, 102, 0.3)"
          bgColor="rgba(0, 204, 102, 0.06)"
          delay={1.6}
          subtext="in rewards"
        />
        <StatCard
          label="Could Have Earned"
          value={result.optimalRewardTotal}
          prefix="$"
          color="var(--cyan)"
          borderColor="rgba(0, 229, 255, 0.3)"
          bgColor="rgba(0, 229, 255, 0.06)"
          delay={1.8}
          subtext="with optimal cards"
        />
        <StatCard
          label="Left on Table"
          value={result.dollarsLeftOnTable}
          prefix="$"
          color="var(--red)"
          borderColor="rgba(255, 68, 68, 0.3)"
          bgColor="rgba(255, 68, 68, 0.08)"
          delay={2.0}
          subtext="in missed rewards"
        />
      </div>

      {/* ========== BEST & WORST CATEGORY ========== */}
      {(result.bestCategory || result.worstCategory) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-1"
        >
          {result.bestCategory && (
            <motion.div
              className="border border-ps-green/30 bg-green-dim p-6 relative overflow-hidden"
              whileHover={{ borderColor: 'rgba(0, 204, 102, 0.5)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <motion.span
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-ps-green text-sm"
                >
                  ▲
                </motion.span>
                <span className="text-ps-green text-xs font-bold uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
                  Best Category
                </span>
              </div>
              <p className="text-xl font-bold text-text-primary tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                {getCategoryLabel(result.bestCategory.category)}
              </p>
              <p className="text-text-secondary text-sm mt-2" style={{ fontFamily: 'var(--font-mono)' }}>
                ${result.bestCategory.actualReward.toFixed(2)} earned on ${result.bestCategory.totalSpend.toFixed(2)}
              </p>
            </motion.div>
          )}
          {result.worstCategory && (
            <motion.div
              className="border border-ps-red/30 bg-red-dim p-6 relative overflow-hidden"
              whileHover={{ borderColor: 'rgba(255, 68, 68, 0.5)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <motion.span
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-ps-red text-sm"
                >
                  ▼
                </motion.span>
                <span className="text-ps-red text-xs font-bold uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
                  Biggest Miss
                </span>
              </div>
              <p className="text-xl font-bold text-text-primary tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                {getCategoryLabel(result.worstCategory.category)}
              </p>
              <p className="text-text-secondary text-sm mt-2" style={{ fontFamily: 'var(--font-mono)' }}>
                Left ${result.worstCategory.missedReward.toFixed(2)} on the table
              </p>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ========== TOP MISSED OPPORTUNITIES — dramatic ========== */}
      {result.topMisses.length > 0 && result.topMisses[0].missedReward > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4 }}
          className="border border-ps-red/20 bg-surface p-6 md:p-8 relative overflow-hidden"
        >
          {/* Red warning accent line at top */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-ps-red to-transparent opacity-50" />

          <div className="flex items-center gap-3 mb-2">
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-ps-red text-lg"
            >
              ⚠
            </motion.span>
            <h3 className="text-xl font-bold text-text-primary tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Top Missed Opportunities
            </h3>
          </div>
          <p className="text-text-tertiary text-sm mb-6" style={{ fontFamily: 'var(--font-mono)' }}>
            Where you left the most money
          </p>

          <div className="space-y-1">
            {result.topMisses.filter(m => m.missedReward > 0).map((tx, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.6 + i * 0.12, type: 'spring', stiffness: 200, damping: 20 }}
                className="flex items-start gap-4 p-4 border border-ps-border hover:border-ps-red/40 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Red left bar on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-1 bg-ps-red transition-all duration-300" />

                <div className="w-8 h-8 border border-ps-red/50 bg-red-dim flex items-center justify-center text-ps-red font-bold text-xs shrink-0" style={{ fontFamily: 'var(--font-mono)' }}>
                  #{i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-text-primary font-medium text-sm truncate">{tx.description}</p>
                  <p className="text-text-tertiary text-xs mt-1" style={{ fontFamily: 'var(--font-mono)' }}>
                    ${tx.amount.toFixed(2)} · {getCategoryLabel(tx.assignedCategory)}
                  </p>
                  <div className="mt-2.5 text-xs flex flex-wrap items-center gap-1" style={{ fontFamily: 'var(--font-mono)' }}>
                    <span className="text-text-secondary">Used</span>
                    <span className="text-text-primary px-1.5 py-0.5 bg-surface-3 border border-ps-border">{tx.actualCard?.name || 'Unknown'}</span>
                    <motion.span
                      className="text-accent mx-1"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                    <span className="text-ps-cyan px-1.5 py-0.5 bg-ps-cyan/5 border border-ps-cyan/20">{tx.optimalCard.name}</span>
                    <span className="text-ps-red font-bold ml-2 text-sm">-${tx.missedReward.toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Category Breakdown */}
      <CategoryBreakdown categories={result.categoryScores} />

      {/* ========== CARD USAGE PIE CHART ========== */}
      {pieData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="border border-ps-border bg-surface p-6 md:p-8"
        >
          <h3 className="text-xl font-bold text-text-primary tracking-tight mb-1" style={{ fontFamily: 'var(--font-display)' }}>
            Card Usage
          </h3>
          <p className="text-text-tertiary text-sm mb-8" style={{ fontFamily: 'var(--font-mono)' }}>
            Spending distribution across your cards
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-10">
            <div className="w-52 h-52 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                    animationDuration={1500}
                    animationEasing="ease-out"
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
                      padding: '8px 12px',
                    }}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter={(value: any) => [`$${Number(value).toFixed(2)}`, 'Spend']}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Center text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-text-tertiary text-[10px] uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
                  {pieData.length} cards
                </span>
              </div>
            </div>
            <div className="flex-1 space-y-3">
              {result.cardUsage.map((cu, i) => (
                <motion.div
                  key={cu.card.id}
                  className="flex items-center gap-3 py-1.5 group"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.08 }}
                >
                  <div
                    className="w-3 h-3 shrink-0"
                    style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
                  />
                  <span className="text-sm text-text-primary flex-1 truncate group-hover:text-accent transition-colors">{cu.card.name}</span>
                  <span className="text-sm text-text-tertiary" style={{ fontFamily: 'var(--font-mono)' }}>
                    {cu.percentage.toFixed(1)}%
                  </span>
                  <span className="text-sm text-text-secondary w-24 text-right" style={{ fontFamily: 'var(--font-mono)' }}>
                    ${cu.totalSpend.toFixed(2)}
                  </span>
                </motion.div>
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
        transition={{ delay: 3 }}
        className="text-center pb-12"
      >
        <motion.button
          onClick={onReset}
          className="px-8 py-3 font-medium text-text-secondary hover:text-accent border border-ps-border hover:border-accent/30 bg-surface transition-all"
          style={{ fontFamily: 'var(--font-display)' }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          ← Start Over
        </motion.button>
      </motion.div>
    </div>
  );
}
