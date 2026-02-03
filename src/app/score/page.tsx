'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useScoring } from '@/hooks/useScoring';
import CardSelector from '@/components/CardSelector';
import FileUpload from '@/components/FileUpload';
import ProcessingAnimation from '@/components/ProcessingAnimation';
import ReportCard from '@/components/ReportCard';

const stepLabels = [
  { key: 'select-cards', label: 'Select Cards', num: 1 },
  { key: 'upload', label: 'Upload', num: 2 },
  { key: 'processing', label: 'Processing', num: 3 },
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
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-800/50">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">💳</span>
          <span className="font-bold text-white text-lg">Point Scorer</span>
        </Link>
        {step !== 'select-cards' && step !== 'processing' && (
          <button
            onClick={reset}
            className="px-4 py-2 text-slate-400 hover:text-white text-sm font-medium transition-colors"
          >
            Start Over
          </button>
        )}
      </nav>

      {/* Progress */}
      <div className="px-6 py-4 border-b border-slate-800/30">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between relative">
            {/* Progress line */}
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-slate-700">
              <motion.div
                className="h-full bg-indigo-500"
                initial={{ width: '0%' }}
                animate={{ width: `${(currentStepIndex / (stepLabels.length - 1)) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {stepLabels.map((s, i) => (
              <div key={s.key} className="relative flex flex-col items-center z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    i <= currentStepIndex
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-700 text-slate-500'
                  }`}
                >
                  {i < currentStepIndex ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    s.num
                  )}
                </div>
                <span className={`text-xs mt-1.5 ${i <= currentStepIndex ? 'text-slate-300' : 'text-slate-600'}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 px-6 py-10">
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
