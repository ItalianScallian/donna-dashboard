'use client';

import { useState, useCallback } from 'react';
import { CreditCard, Transaction, ScoreResult, Step, DetectedCard } from '@/lib/types';
import { parseCSV } from '@/lib/parsers/csv';
import { scoreTransactions } from '@/lib/scorer';

export function useScoring() {
  const [step, setStep] = useState<Step>('upload');
  const [selectedCards, setSelectedCards] = useState<CreditCard[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [detection, setDetection] = useState<DetectedCard | null>(null);

  const selectCards = useCallback((cards: CreditCard[]) => {
    setSelectedCards(cards);
    setError(null);
  }, []);

  // Step 1: Parse files and detect issuer, then go to card-detection step
  const processFiles = useCallback(async (files: File[]) => {
    setError(null);

    try {
      const allTransactions: Transaction[] = [];
      let lastDetection: DetectedCard | null = null;

      for (const file of files) {
        if (file.name.toLowerCase().endsWith('.pdf')) {
          throw new Error('PDF support coming soon! Please export your statement as CSV from your bank\'s website.');
        }

        const text = await file.text();
        const { transactions: parsed, detection: det } = parseCSV(text);
        allTransactions.push(...parsed);
        // Use the last detected issuer (most files will be from same issuer)
        if (det.confidence !== 'unknown') {
          lastDetection = det;
        }
      }

      if (allTransactions.length === 0) {
        throw new Error('No transactions found in the uploaded file(s). Please check the format.');
      }

      setTransactions(allTransactions);
      setDetection(lastDetection);
      setStep('card-detection');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process files');
      setStep('upload');
    }
  }, []);

  // Step 2: User confirmed cards → score
  const scoreWithCards = useCallback(async () => {
    if (selectedCards.length === 0) return;
    setError(null);
    setIsProcessing(true);
    setStep('processing');

    try {
      // Assign cardId to transactions
      const txsWithCard = transactions.map(tx => ({
        ...tx,
        cardId: tx.cardId || selectedCards[0]?.id,
      }));

      // Simulate processing time for animation
      await new Promise(resolve => setTimeout(resolve, 2500));

      const scoreResult = scoreTransactions(txsWithCard, selectedCards);
      setResult(scoreResult);
      setStep('results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to score transactions');
      setStep('card-detection');
    } finally {
      setIsProcessing(false);
    }
  }, [transactions, selectedCards]);

  const useSampleData = useCallback(async () => {
    setError(null);

    try {
      const { generateSampleCSV, parseCSV: parseCsvFn } = await import('@/lib/parsers/csv');
      const sampleCSV = generateSampleCSV();
      const { transactions: parsed, detection: det } = parseCsvFn(sampleCSV);

      setTransactions(parsed);
      setDetection(det);
      setStep('card-detection');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process sample data');
      setStep('upload');
    }
  }, []);

  const reset = useCallback(() => {
    setStep('upload');
    setSelectedCards([]);
    setTransactions([]);
    setResult(null);
    setError(null);
    setIsProcessing(false);
    setDetection(null);
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
    detection,
    selectCards,
    processFiles,
    scoreWithCards,
    useSampleData,
    reset,
    goToStep,
    setStep,
  };
}
