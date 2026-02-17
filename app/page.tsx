'use client'

import { useState, useCallback } from 'react'
import CardSelector from '@/components/CardSelector'
import TransactionUpload from '@/components/TransactionUpload'
import Dashboard from '@/components/Dashboard'
import { analyzeTransactions } from '@/lib/optimizer'
import type { Transaction, AnalysisResult } from '@/types'
import { cn } from '@/lib/utils'
import { Zap, ChevronRight, BarChart2, RefreshCw, Github } from 'lucide-react'

type Step = 'setup' | 'results'

const DEFAULT_CARDS = [
  'chase-sapphire-preferred',
  'chase-freedom-unlimited',
]

export default function Home() {
  const [step, setStep] = useState<Step>('setup')
  const [selectedCards, setSelectedCards] = useState<string[]>(DEFAULT_CARDS)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = useCallback(() => {
    setError(null)
    if (selectedCards.length === 0) {
      setError('Please select at least one credit card')
      return
    }
    if (transactions.length === 0) {
      setError('Please load transactions (upload CSV or use sample data)')
      return
    }

    setIsAnalyzing(true)
    // Small delay for UX feel
    setTimeout(() => {
      try {
        const res = analyzeTransactions(transactions, selectedCards)
        setResult(res)
        setStep('results')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Analysis failed')
      } finally {
        setIsAnalyzing(false)
      }
    }, 400)
  }, [selectedCards, transactions])

  const handleReset = () => {
    setStep('setup')
    setResult(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="border-b border-white/5 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-lg tracking-tight">Point Scorer</span>
              <span className="hidden sm:inline text-gray-500 text-sm ml-2">
                Credit Card Rewards Optimizer
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {step === 'results' && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5 border border-white/10 rounded-lg hover:bg-white/5"
              >
                <RefreshCw size={14} />
                <span className="hidden sm:inline">New Analysis</span>
              </button>
            )}
            <a
              href="https://github.com/ItalianScallian-bot/point-scorer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-300 transition-colors"
            >
              <Github size={18} />
            </a>
          </div>
        </div>
      </header>

      {step === 'setup' ? (
        <>
          {/* Hero */}
          <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-gray-950 to-purple-950/30 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(99,102,241,0.12),transparent_60%)] pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 mb-6">
                  <BarChart2 size={14} className="text-indigo-400" />
                  <span className="text-indigo-300 text-sm font-medium">Retroactive Rewards Analysis</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                  How much money did{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                    the wrong card
                  </span>{' '}
                  cost you?
                </h1>

                <p className="text-gray-400 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl">
                  Upload your transactions and see exactly which card you should have used
                  for each purchase — and how much you left on the table.
                </p>

                <div className="flex flex-wrap gap-6 text-sm">
                  {[
                    { icon: '🔒', text: '100% client-side — your data never leaves your browser' },
                    { icon: '📊', text: '25+ popular US credit cards in our database' },
                    { icon: '⚡', text: 'Instant optimization score' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-2 text-gray-400">
                      <span>{item.icon}</span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Setup flow */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 space-y-10">
            {/* Step 1: Card selector */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                  1
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-indigo-600/50 to-transparent" />
              </div>
              <CardSelector selected={selectedCards} onChange={setSelectedCards} />
            </section>

            {/* Step 2: Transactions */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                  2
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-indigo-600/50 to-transparent" />
              </div>
              <div className="max-w-2xl">
                <TransactionUpload
                  onLoad={setTransactions}
                  currentCount={transactions.length}
                />
              </div>
            </section>

            {/* CTA */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                  3
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-indigo-600/50 to-transparent" />
              </div>

              {error && (
                <div className="mb-4 max-w-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className={cn(
                  'relative flex items-center gap-3 px-8 py-4 rounded-xl text-white font-bold text-lg',
                  'bg-gradient-to-r from-indigo-600 to-purple-600',
                  'hover:from-indigo-500 hover:to-purple-500',
                  'shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50',
                  'transition-all duration-200 active:scale-95',
                  'disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100'
                )}
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw size={20} className="animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <BarChart2 size={20} />
                    Analyze My Rewards
                    <ChevronRight size={20} />
                  </>
                )}
              </button>

              <div className="mt-4 text-gray-600 text-sm">
                {selectedCards.length > 0 && transactions.length > 0
                  ? `Ready: ${selectedCards.length} cards · ${transactions.length} transactions`
                  : selectedCards.length === 0
                  ? '⚠ Select at least one card'
                  : '⚠ Load your transactions above'}
              </div>
            </section>
          </div>
        </>
      ) : (
        /* Results */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Results header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-indigo-400 text-sm mb-2">
              <BarChart2 size={14} />
              <span>Analysis Complete</span>
            </div>
            <h2 className="text-3xl font-black text-white mb-2">Your Rewards Report</h2>
            <p className="text-gray-400">
              {transactions.length} transactions analyzed across {selectedCards.length} card{selectedCards.length > 1 ? 's' : ''}
            </p>
          </div>

          {result && <Dashboard result={result} />}
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/5 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-gray-600 text-sm">
          <p>Point Scorer — POC Demo · Data stays 100% in your browser · Not financial advice</p>
          <p className="mt-1">Built to validate the retroactive rewards analysis concept</p>
        </div>
      </footer>
    </div>
  )
}
