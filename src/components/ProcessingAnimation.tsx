'use client';

import { motion } from 'framer-motion';

const steps = [
  { label: 'Reading transactions', code: 'parse_csv()' },
  { label: 'Categorizing merchants', code: 'categorize()' },
  { label: 'Calculating rewards', code: 'score()' },
  { label: 'Generating report', code: 'report()' },
];

// Animated credit card made of lines
function CreditCardAnimation() {
  return (
    <div className="relative w-48 h-28 mx-auto mb-12">
      {/* Card outline */}
      <motion.div
        className="absolute inset-0 border border-accent/40"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Chip */}
      <motion.div
        className="absolute top-5 left-5 w-8 h-6 border border-accent/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.5, 1] }}
        transition={{ duration: 1.5, delay: 0.3, repeat: Infinity, repeatDelay: 2 }}
      >
        <div className="absolute top-1/2 left-0 right-0 h-px bg-accent/40" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-accent/40" />
      </motion.div>

      {/* Card number lines */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute bottom-10 h-1.5 bg-accent/20"
          style={{ left: `${12 + i * 22}%`, width: '16%' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.6 + i * 0.15 }}
        />
      ))}

      {/* Shimmer across card */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent"
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: 'linear' }}
      />

      {/* Processing pulse */}
      <motion.div
        className="absolute -inset-2 border border-accent/20"
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
}

export default function ProcessingAnimation() {
  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center py-16">
      <CreditCardAnimation />

      {/* Terminal-style log */}
      <div className="w-full border border-ps-border bg-surface p-6">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-ps-border">
          <div className="w-2 h-2 rounded-full bg-ps-red" />
          <div className="w-2 h-2 rounded-full bg-ps-orange" />
          <div className="w-2 h-2 rounded-full bg-ps-green" />
          <span className="text-text-tertiary text-[10px] ml-2" style={{ fontFamily: 'var(--font-mono)' }}>
            analyzing...
          </span>
        </div>

        <div className="space-y-3">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.5 }}
              className="flex items-center gap-3"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.5 + 0.3 }}
                className="text-accent text-xs"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                ▸
              </motion.span>
              <motion.span
                className="text-text-secondary text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 1] }}
                transition={{ delay: i * 0.5, duration: 0.5 }}
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {step.label}
              </motion.span>
              <motion.span
                className="text-text-tertiary text-xs ml-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: i * 0.5 + 0.2 }}
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {step.code}
              </motion.span>
            </motion.div>
          ))}
        </div>

        {/* Blinking cursor */}
        <motion.div
          className="mt-4 flex items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.span
            className="w-2 h-4 bg-accent"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </div>
  );
}
