'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

/* ================================================
   Three stacking/shuffling credit cards
   ================================================ */
function ShufflingCards() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(p => (p + 1) % 3);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    { color: 'var(--accent)', zBase: 3 },
    { color: 'var(--cyan)', zBase: 2 },
    { color: 'var(--red)', zBase: 1 },
  ];

  return (
    <div className="relative w-56 h-36 mx-auto mb-8">
      {cards.map((card, i) => {
        const order = (i + phase) % 3;
        const xOff = (order - 1) * 12;
        const yOff = (order - 1) * -4;
        const rot = (order - 1) * 3;
        const z = 3 - order;

        return (
          <motion.div
            key={i}
            className="absolute inset-0"
            animate={{
              x: xOff,
              y: yOff,
              rotate: rot,
              zIndex: z,
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <div
              className="w-full h-full border relative overflow-hidden"
              style={{ borderColor: `color-mix(in srgb, ${card.color} 40%, transparent)` }}
            >
              {/* Card chip */}
              <div
                className="absolute top-5 left-5 w-8 h-6 border"
                style={{ borderColor: `color-mix(in srgb, ${card.color} 50%, transparent)` }}
              >
                <div className="absolute top-1/2 left-0 right-0 h-px" style={{ background: `color-mix(in srgb, ${card.color} 30%, transparent)` }} />
                <div className="absolute top-0 bottom-0 left-1/3 w-px" style={{ background: `color-mix(in srgb, ${card.color} 30%, transparent)` }} />
                <div className="absolute top-0 bottom-0 left-2/3 w-px" style={{ background: `color-mix(in srgb, ${card.color} 30%, transparent)` }} />
              </div>

              {/* Card number placeholders */}
              <div className="absolute bottom-8 left-5 right-5 flex gap-3">
                {[0, 1, 2, 3].map(j => (
                  <div
                    key={j}
                    className="flex-1 h-1.5"
                    style={{ background: `color-mix(in srgb, ${card.color} 20%, transparent)` }}
                  />
                ))}
              </div>

              {/* Card name line */}
              <div
                className="absolute bottom-4 left-5 h-1 w-20"
                style={{ background: `color-mix(in srgb, ${card.color} 15%, transparent)` }}
              />

              {/* Network logo placeholder */}
              <div
                className="absolute top-4 right-4 w-8 h-5 border"
                style={{ borderColor: `color-mix(in srgb, ${card.color} 25%, transparent)` }}
              />

              {/* Scan line across card */}
              <motion.div
                className="absolute left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${card.color}, transparent)`, opacity: 0.4 }}
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5, ease: 'linear' }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ================================================
   Data stream visualization
   ================================================ */
function DataStream() {
  const chars = '$0123456789.,%→←↑↓ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const columns = 24;
  const [streams, setStreams] = useState<Array<{ id: number; col: number; chars: string[]; speed: number }>>([]);

  const createStream = useCallback((id: number) => {
    const len = Math.floor(Math.random() * 6) + 3;
    return {
      id,
      col: Math.floor(Math.random() * columns),
      chars: Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]),
      speed: Math.random() * 2 + 1,
    };
  }, []);

  useEffect(() => {
    let counter = 0;
    const interval = setInterval(() => {
      setStreams(prev => {
        const filtered = prev.length > 15 ? prev.slice(-15) : prev;
        return [...filtered, createStream(counter++)];
      });
    }, 200);
    return () => clearInterval(interval);
  }, [createStream]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <AnimatePresence>
        {streams.map(stream => (
          <motion.div
            key={stream.id}
            className="absolute flex flex-col items-center"
            style={{
              left: `${(stream.col / columns) * 100}%`,
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
            }}
            initial={{ top: '-10%', opacity: 0 }}
            animate={{ top: '110%', opacity: [0, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: stream.speed, ease: 'linear' }}
          >
            {stream.chars.map((char, j) => (
              <span
                key={j}
                className={j === 0 ? 'text-accent' : 'text-accent/40'}
              >
                {char}
              </span>
            ))}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ================================================
   Processing steps with progressive checkmarks
   ================================================ */
const steps = [
  { label: 'Reading transactions', code: 'parse_csv()', timing: 0 },
  { label: 'Categorizing merchants', code: 'categorize()', timing: 600 },
  { label: 'Calculating optimal rewards', code: 'score()', timing: 1200 },
  { label: 'Generating your report', code: 'report()', timing: 1800 },
];

function ProcessingSteps() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    steps.forEach((step, i) => {
      // Show step
      setTimeout(() => setActiveStep(i), step.timing);
      // Complete step (if not last)
      if (i < steps.length - 1) {
        setTimeout(() => setCompletedSteps(prev => [...prev, i]), step.timing + 500);
      }
    });
  }, []);

  return (
    <div className="space-y-0">
      {steps.map((step, i) => {
        const isCompleted = completedSteps.includes(i);
        const isActive = activeStep === i && !isCompleted;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: step.timing / 1000 }}
            className="flex items-center gap-3 py-2.5 border-b border-ps-border/30 last:border-0"
          >
            {/* Status indicator */}
            <div className="w-5 h-5 flex items-center justify-center shrink-0">
              {isCompleted ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                    <motion.path
                      d="M5 13l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </svg>
                </motion.div>
              ) : isActive ? (
                <motion.div
                  className="w-2 h-2 bg-accent"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              ) : (
                <div className="w-1.5 h-1.5 bg-text-tertiary" />
              )}
            </div>

            {/* Label */}
            <span
              className={`text-sm flex-1 ${isCompleted ? 'text-text-primary' : isActive ? 'text-accent' : 'text-text-tertiary'}`}
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {step.label}
              {isActive && (
                <motion.span
                  animate={{ opacity: [0, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  ...
                </motion.span>
              )}
            </span>

            {/* Code */}
            <span
              className="text-[10px] text-text-tertiary hidden sm:block"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {step.code}
            </span>

            {/* Timing */}
            {isCompleted && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] text-accent/50"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                ✓
              </motion.span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

/* ================================================
   MAIN PROCESSING ANIMATION
   ================================================ */
export default function ProcessingAnimation() {
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center py-12 md:py-16">
      {/* Title */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-text-secondary text-sm mb-8 uppercase tracking-widest"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        Analyzing your rewards
      </motion.p>

      {/* Shuffling credit cards */}
      <ShufflingCards />

      {/* Terminal container */}
      <div className="w-full border border-ps-border bg-surface relative overflow-hidden">
        {/* Data stream background */}
        <DataStream />

        {/* Terminal header */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-ps-border relative z-10">
          <div className="w-2 h-2 rounded-full bg-ps-red" />
          <div className="w-2 h-2 rounded-full bg-ps-orange" />
          <div className="w-2 h-2 rounded-full bg-ps-green" />
          <span className="text-text-tertiary text-[10px] ml-auto" style={{ fontFamily: 'var(--font-mono)' }}>
            point-scorer — analysis
          </span>
        </div>

        {/* Steps */}
        <div className="px-5 py-4 relative z-10">
          <ProcessingSteps />
        </div>

        {/* Progress bar at bottom */}
        <div className="h-0.5 bg-surface-3 relative">
          <motion.div
            className="absolute inset-y-0 left-0 bg-accent"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.3, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {/* Bottom notice */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-text-tertiary text-xs mt-6"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        All processing happens in your browser
      </motion.p>
    </div>
  );
}
