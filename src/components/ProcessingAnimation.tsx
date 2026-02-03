'use client';

import { motion } from 'framer-motion';

const steps = [
  { label: 'Reading transactions...', icon: '📄' },
  { label: 'Categorizing merchants...', icon: '🏷️' },
  { label: 'Calculating rewards...', icon: '💰' },
  { label: 'Generating your score...', icon: '📊' },
];

export default function ProcessingAnimation() {
  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center py-16">
      {/* Spinning loader */}
      <motion.div
        className="relative w-32 h-32 mb-12"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-slate-700" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 border-r-indigo-500" />
        <motion.div
          className="absolute inset-4 rounded-full border-4 border-transparent border-b-purple-500 border-l-purple-500"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.6 }}
            className="flex items-center gap-3"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.6 + 0.3 }}
              className="text-2xl"
            >
              {step.icon}
            </motion.span>
            <motion.span
              className="text-slate-300 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ delay: i * 0.6, duration: 1.5, repeat: Infinity }}
            >
              {step.label}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
