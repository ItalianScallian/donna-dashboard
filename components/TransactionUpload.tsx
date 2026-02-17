'use client'

import { useState, useCallback } from 'react'
import { Upload, FileText, Sparkles, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SAMPLE_TRANSACTIONS } from '@/data/sampleTransactions'
import type { Transaction } from '@/types'
import { parseCSV } from '@/lib/optimizer'

interface TransactionUploadProps {
  onLoad: (transactions: Transaction[]) => void
  currentCount: number
}

export default function TransactionUpload({ onLoad, currentCount }: TransactionUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleFile = useCallback((file: File) => {
    if (!file.name.endsWith('.csv')) {
      setError('Please upload a .csv file')
      return
    }
    setError(null)
    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string
        const transactions = parseCSV(text)
        if (transactions.length === 0) {
          setError('No valid transactions found in CSV')
          return
        }
        onLoad(transactions)
      } catch (err) {
        setError('Failed to parse CSV. Check the format.')
      }
    }
    reader.readAsText(file)
  }, [onLoad])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const loadSampleData = () => {
    setError(null)
    setFileName(null)
    onLoad(SAMPLE_TRANSACTIONS)
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-white">Transaction Data</h2>
        <p className="text-gray-400 text-sm">Upload your CSV or use our sample data to see how the tool works</p>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={cn(
          'relative border-2 border-dashed rounded-xl p-10 text-center transition-all duration-200',
          isDragging
            ? 'border-indigo-500 bg-indigo-500/10 scale-[1.01]'
            : 'border-white/20 bg-white/3 hover:border-white/40 hover:bg-white/5'
        )}
      >
        <input
          type="file"
          accept=".csv"
          onChange={onInputChange}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />
        <div className="flex flex-col items-center gap-3 pointer-events-none">
          <div className={cn(
            'w-14 h-14 rounded-full flex items-center justify-center transition-colors',
            isDragging ? 'bg-indigo-500/30' : 'bg-white/10'
          )}>
            <Upload size={24} className={isDragging ? 'text-indigo-400' : 'text-gray-400'} />
          </div>
          <div>
            <p className="text-white font-medium">Drop your CSV here</p>
            <p className="text-gray-500 text-sm mt-1">or click to browse</p>
          </div>
          <p className="text-gray-600 text-xs">
            Columns: date, merchant, amount, category, card_used
          </p>
        </div>
      </div>

      {/* Status */}
      {error && (
        <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {fileName && !error && (
        <div className="flex items-center gap-2 text-green-400 text-sm bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-3">
          <FileText size={16} />
          <span className="font-medium">{fileName}</span>
          <span className="text-green-500">· {currentCount} transactions loaded</span>
        </div>
      )}

      {/* OR divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-gray-500 text-sm">or</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Sample data button */}
      <button
        onClick={loadSampleData}
        className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 border border-indigo-500/40 rounded-xl text-white font-medium hover:from-indigo-600/50 hover:to-purple-600/50 hover:border-indigo-500/60 transition-all duration-200 group"
      >
        <Sparkles size={18} className="text-indigo-400 group-hover:text-indigo-300" />
        <div className="text-left">
          <p className="font-semibold">Use Sample Data</p>
          <p className="text-sm text-indigo-300/70 font-normal">43 realistic transactions · Jan–Mar 2024</p>
        </div>
      </button>

      {/* CSV format hint */}
      <details className="group">
        <summary className="text-gray-500 text-xs cursor-pointer hover:text-gray-400 transition-colors flex items-center gap-1">
          <FileText size={12} />
          View expected CSV format
        </summary>
        <div className="mt-2 bg-gray-900/80 border border-white/10 rounded-lg p-4 text-xs font-mono text-gray-400 overflow-x-auto">
          <p className="text-gray-600 mb-1"># Example rows:</p>
          <p>date,merchant,amount,category,card_used</p>
          <p>2024-01-15,Chipotle,23.18,dining,Chase Sapphire Preferred</p>
          <p>2024-01-16,Shell Gas,68.50,gas,Citi Double Cash</p>
          <p className="mt-2 text-gray-600">
            # categories: dining · groceries · gas · travel · flights · hotels<br />
            #             entertainment · streaming · drugstores · transit · shopping · other
          </p>
        </div>
      </details>
    </div>
  )
}
