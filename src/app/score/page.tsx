'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useScoring } from '@/hooks/useScoring';
import CardSelector from '@/components/CardSelector';
import FileUpload from '@/components/FileUpload';
import ProcessingAnimation from '@/components/ProcessingAnimation';
import ReportCard from '@/components/ReportCard';

const stepLabels = [
  { key: 'select-cards', label: 'Cards', num: 1 },
  { key: 'upload', label: 'Upload', num: 2 },
  { key: 'processing', label: 'Analyze', num: 3 },
  { key: 'results', label: 'Results', num: 4 },
];

export default function ScorePage() {
  const {
    step,
    selectedCards,
    result,
    error,
    selectCards,
    processFiles,
    useSampleData,
    reset,
    goToStep,
  } = useScoring();

  const currentStepIndex = stepLabels.findIndex(s => s.key === step);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-ps-border">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent flex items-center justify-center" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="text-black font-extrabold text-sm">P</span>
          </div>
          <span className="font-semibold text-text-primary text-base tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Point Scorer
          </span>
        </Link>
        {step !== 'select-cards' && step !== 'processing' && (
          <button
            onClick={reset}
            className="px-4 py-2 text-text-secondary hover:text-accent text-sm font-medium transition-colors"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Start Over
          </button>
        )}
      </nav>

      {/* Progress */}
      <div className="px-6 md:px-10 py-4 border-b border-ps-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between relative">
            {/* Progress line */}
            <div className="absolute top-3 left-0 right-0 h-px bg-ps-border">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: '0%' }}
                animate={{ width: `${(currentStepIndex / (stepLabels.length - 1)) * 100}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            {stepLabels.map((s, i) => (
              <div key={s.key} className="relative flex flex-col items-center z-10">
                <div
                  className={`w-6 h-6 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    i <= currentStepIndex
                      ? 'bg-accent text-black'
                      : 'bg-surface-2 text-text-tertiary border border-ps-border'
                  }`}
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {i < currentStepIndex ? (
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    s.num
                  )}
                </div>
                <span
                  className={`text-[10px] mt-1.5 uppercase tracking-wider ${i <= currentStepIndex ? 'text-accent' : 'text-text-tertiary'}`}
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 px-6 md:px-10 py-10">
        <AnimatePresence mode="wait">
          {step === 'select-cards' && (
            <motion.div key="cards" exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
              <CardSelector
                selectedCards={selectedCards}
                onSelect={selectCards}
                onNext={() => goToStep('upload')}
              />
            </motion.div>
          )}

          {step === 'upload' && (
            <motion.div key="upload" exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
              <FileUpload
                onUpload={processFiles}
                onUseSample={useSampleData}
                onBack={() => goToStep('select-cards')}
                error={error}
              />
            </motion.div>
          )}

          {step === 'processing' && (
            <motion.div key="processing" exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <ProcessingAnimation />
            </motion.div>
          )}

          {step === 'results' && result && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <ReportCard result={result} onReset={reset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
