'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useScoring } from '@/hooks/useScoring';
import CardSelector from '@/components/CardSelector';
import FileUpload from '@/components/FileUpload';
import ProcessingAnimation from '@/components/ProcessingAnimation';
import ReportCard from '@/components/ReportCard';

const stepLabels = [
  { key: 'upload', label: 'Upload', num: 1 },
  { key: 'card-detection', label: 'Cards', num: 2 },
  { key: 'processing', label: 'Analyze', num: 3 },
  { key: 'results', label: 'Results', num: 4 },
];

/* ================================================
   ANIMATED STEP INDICATOR
   ================================================ */
function StepIndicator({ step, currentIndex }: { step: typeof stepLabels[0]; currentIndex: number }) {
  const i = stepLabels.indexOf(step);
  const isActive = i <= currentIndex;
  const isCurrent = i === currentIndex;
  const isCompleted = i < currentIndex;

  return (
    <div className="relative flex flex-col items-center z-10">
      <motion.div
        className={`w-7 h-7 flex items-center justify-center text-xs font-bold transition-all duration-500 ${
          isActive
            ? 'bg-accent text-black'
            : 'bg-surface-2 text-text-tertiary border border-ps-border'
        }`}
        style={{ fontFamily: 'var(--font-mono)' }}
        animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
        transition={isCurrent ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
      >
        {isCompleted ? (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400 }}>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
        ) : (
          step.num
        )}
      </motion.div>
      <motion.span
        className={`text-[10px] mt-1.5 uppercase tracking-wider transition-colors duration-300 ${
          isActive ? 'text-accent' : 'text-text-tertiary'
        }`}
        style={{ fontFamily: 'var(--font-mono)' }}
        animate={isCurrent ? { opacity: [0.7, 1, 0.7] } : {}}
        transition={isCurrent ? { duration: 2, repeat: Infinity } : {}}
      >
        {step.label}
      </motion.span>
    </div>
  );
}

/* ================================================
   PAGE TRANSITION VARIANTS
   ================================================ */
const pageVariants = {
  enter: { opacity: 0, x: 30, filter: 'blur(4px)' },
  center: { opacity: 1, x: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, x: -30, filter: 'blur(4px)' },
};

const pageTransition = {
  type: 'spring' as const,
  stiffness: 200,
  damping: 25,
};

/* ================================================
   MAIN SCORE PAGE
   ================================================ */
export default function ScorePage() {
  const {
    step,
    selectedCards,
    result,
    error,
    detection,
    selectCards,
    processFiles,
    scoreWithCards,
    useSampleData,
    reset,
    goToStep,
  } = useScoring();

  const currentStepIndex = stepLabels.findIndex(s => s.key === step);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Nav */}
      <motion.nav
        className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-ps-border"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            className="w-8 h-8 bg-accent flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400 }}
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span className="text-black font-extrabold text-sm">P</span>
          </motion.div>
          <span className="font-semibold text-text-primary text-base tracking-tight group-hover:text-accent transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
            Point Scorer
          </span>
        </Link>
        <AnimatePresence>
          {step !== 'upload' && step !== 'processing' && (
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onClick={reset}
              className="px-4 py-2 text-text-secondary hover:text-accent text-sm font-medium transition-colors border border-transparent hover:border-accent/20"
              style={{ fontFamily: 'var(--font-display)' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Over
            </motion.button>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Progress Bar */}
      <div className="px-6 md:px-10 py-5 border-b border-ps-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-3.5 left-0 right-0 h-px bg-ps-border" />
            <motion.div
              className="absolute top-3.5 left-0 h-px bg-accent origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: currentStepIndex / (stepLabels.length - 1) }}
              style={{ width: '100%' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              className="absolute top-3 left-0 h-[3px] bg-accent/30 origin-left blur-sm"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: currentStepIndex / (stepLabels.length - 1) }}
              style={{ width: '100%' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
            {stepLabels.map((s) => (
              <StepIndicator key={s.key} step={s} currentIndex={currentStepIndex} />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 px-6 md:px-10 py-10">
        <AnimatePresence mode="wait">
          {step === 'upload' && (
            <motion.div
              key="upload"
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={pageTransition}
            >
              <FileUpload
                onUpload={processFiles}
                onUseSample={useSampleData}
                onBack={() => {}}
                error={error}
                hideBack
              />
            </motion.div>
          )}

          {step === 'card-detection' && (
            <motion.div
              key="cards"
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={pageTransition}
            >
              <CardSelector
                selectedCards={selectedCards}
                onSelect={selectCards}
                onNext={scoreWithCards}
                detection={detection}
                onConfirmDetection={scoreWithCards}
              />
            </motion.div>
          )}

          {step === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <ProcessingAnimation />
            </motion.div>
          )}

          {step === 'results' && result && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <ReportCard result={result} onReset={reset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
