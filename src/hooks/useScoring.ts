'use client';

import { useState, useCallback } from 'react';
import { CreditCard, Transaction, ScoreResult, Step } from '@/lib/types';
import { parseCSV } from '@/lib/parsers/csv';
import { scoreTransactions } from '@/lib/scorer';

export function useScoring() {
  const [step, setStep] = useState<Step>('select-cards');
  const [selectedCards, setSelectedCards] = useState<CreditCard[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const selectCards = useCallback((cards: CreditCard[]) => {
    setSelectedCards(cards);
    setError(null);
  }, []);

  const processFiles = useCallback(async (files: File[]) => {
    setError(null);
    setIsProcessing(true);
    setStep('processing');

    try {
      const allTransactions: Transaction[] = [];

      for (const file of files) {
        if (file.name.toLowerCase().endsWith('.pdf')) {
          throw new Error('PDF support coming soon! Please export your statement as CSV from your bank\'s website.');
        }

        const text = await file.text();
        const parsed = parseCSV(text, selectedCards[0]?.id);
        allTransactions.push(...parsed);
      }

      if (allTransactions.length === 0) {
        throw new Error('No transactions found in the uploaded file(s). Please check the format.');
      }

      setTransactions(allTransactions);

      // Simulate processing time for animation
      await new Promise(resolve => setTimeout(resolve, 2500));

      const scoreResult = scoreTransactions(allTransactions, selectedCards);
      setResult(scoreResult);
      setStep('results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process files');
      setStep('upload');
    } finally {
      setIsProcessing(false);
    }
  }, [selectedCards]);

  const useSampleData = useCallback(async () => {
    setError(null);
    setIsProcessing(true);
    setStep('processing');

    try {
      const { generateSampleCSV } = await import('@/lib/parsers/csv');
      const sampleCSV = generateSampleCSV();
      const parsed = parseCSV(sampleCSV, selectedCards[0]?.id);

      setTransactions(parsed);

      await new Promise(resolve => setTimeout(resolve, 2500));

      const scoreResult = scoreTransactions(parsed, selectedCards);
      setResult(scoreResult);
      setStep('results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process sample data');
      setStep('upload');
    } finally {
      setIsProcessing(false);
    }
  }, [selectedCards]);

  const reset = useCallback(() => {
    setStep('select-cards');
    setSelectedCards([]);
    setTransactions([]);
    setResult(null);
    setError(null);
    setIsProcessing(false);
  }, []);

  const goToStep = useCallback((newStep: Step) => {
    setStep(newStep);
    setError(null);
  }, []);

  return {
    step,
    selectedCards,
    transactions,
    result,
    error,
    isProcessing,
    selectCards,
    processFiles,
    useSampleData,
    reset,
    goToStep,
    setStep,
  };
}
