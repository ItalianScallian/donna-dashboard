'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { creditCards } from '@/data/cards';
import { CreditCard } from '@/lib/types';

interface CardSelectorProps {
  selectedCards: CreditCard[];
  onSelect: (cards: CreditCard[]) => void;
  onNext: () => void;
}

const issuerAccents: Record<string, string> = {
  'Chase': '#0066ff',
  'Amex': '#006fcf',
  'Citi': '#003b70',
  'Capital One': '#d03027',
  'Discover': '#ff6600',
  'Wells Fargo': '#d71e28',
  'US Bank': '#c41230',
  'Bank of America': '#e31837',
  'Apple': '#555555',
  'Barclays': '#00aeef',
  'Synchrony': '#00857c',
  'TD Bank': '#34a853',
  'SoFi': '#7b68ee',
  'Alliant': '#003087',
  'Fidelity': '#498505',
};

export default function CardSelector({ selectedCards, onSelect, onNext }: CardSelectorProps) {
  const [search, setSearch] = useState('');
  const [filterIssuer, setFilterIssuer] = useState<string | null>(null);

  const issuers = useMemo(() => {
    const set = new Set(creditCards.map(c => c.issuer));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    return creditCards.filter(card => {
      const matchesSearch = search === '' ||
        card.name.toLowerCase().includes(search.toLowerCase()) ||
        card.issuer.toLowerCase().includes(search.toLowerCase());
      const matchesIssuer = !filterIssuer || card.issuer === filterIssuer;
      return matchesSearch && matchesIssuer;
    });
  }, [search, filterIssuer]);

  const toggleCard = (card: CreditCard) => {
    const exists = selectedCards.find(c => c.id === card.id);
    if (exists) {
      onSelect(selectedCards.filter(c => c.id !== card.id));
    } else {
      onSelect([...selectedCards, card]);
    }
  };

  const isSelected = (card: CreditCard) => selectedCards.some(c => c.id === card.id);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h2
          className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tighter mb-3"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          What&apos;s in your wallet?
        </h2>
        <p className="text-text-secondary">Select the credit cards you carry. We&apos;ll figure out which one wins for every purchase.</p>
      </motion.div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search cards..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-surface border border-ps-border text-text-primary placeholder-text-tertiary focus:outline-none focus:border-accent transition-colors"
            style={{ fontFamily: 'var(--font-body)' }}
          />
        </div>
      </div>

      {/* Issuer Filter */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        <button
          onClick={() => setFilterIssuer(null)}
          className={`px-3 py-1.5 text-xs font-medium transition-all border ${
            !filterIssuer
              ? 'bg-accent text-black border-accent'
              : 'bg-transparent text-text-secondary border-ps-border hover:border-border-hover hover:text-text-primary'
          }`}
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          ALL
        </button>
        {issuers.map(issuer => (
          <button
            key={issuer}
            onClick={() => setFilterIssuer(filterIssuer === issuer ? null : issuer)}
            className={`px-3 py-1.5 text-xs font-medium transition-all border ${
              filterIssuer === issuer
                ? 'bg-accent text-black border-accent'
                : 'bg-transparent text-text-secondary border-ps-border hover:border-border-hover hover:text-text-primary'
            }`}
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {issuer.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Selected count */}
      <AnimatePresence>
        {selectedCards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-5 flex flex-wrap items-center gap-2"
          >
            <span className="text-xs text-text-tertiary uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
              {selectedCards.length} selected
            </span>
            <span className="text-text-tertiary">·</span>
            {selectedCards.map(card => (
              <span
                key={card.id}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-accent/30 bg-accent/5 text-xs text-accent"
              >
                {card.name}
                <button
                  onClick={() => toggleCard(card)}
                  className="hover:text-text-primary ml-0.5 opacity-60 hover:opacity-100"
                >
                  ×
                </button>
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-8 max-h-[50vh] overflow-y-auto pr-1">
        {filtered.map((card, i) => {
          const selected = isSelected(card);
          const accentColor = issuerAccents[card.issuer] || '#555';
          return (
            <motion.button
              key={card.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.02, 0.4) }}
              onClick={() => toggleCard(card)}
              className={`relative p-4 border text-left transition-all duration-200 group ${
                selected
                  ? 'bg-accent/5 border-accent'
                  : 'bg-surface border-ps-border hover:border-border-hover hover:bg-surface-2'
              }`}
            >
              {/* Selection indicator */}
              {selected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-5 h-5 bg-accent flex items-center justify-center"
                >
                  <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}

              {/* Issuer tag */}
              <div
                className="inline-block px-2 py-0.5 text-[10px] font-bold text-white mb-2 uppercase tracking-wider"
                style={{ backgroundColor: accentColor, fontFamily: 'var(--font-mono)' }}
              >
                {card.issuer}
              </div>

              <h3 className="font-semibold text-text-primary text-sm leading-tight mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                {card.name}
              </h3>

              <div className="flex items-center gap-3 text-xs text-text-tertiary" style={{ fontFamily: 'var(--font-mono)' }}>
                <span>{card.baseReward}x base</span>
                <span className="text-text-tertiary">·</span>
                <span>{card.annualFee === 0 ? 'No AF' : `$${card.annualFee}/yr`}</span>
              </div>

              {card.categories.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {card.categories.slice(0, 3).map((cat, j) => (
                    <span
                      key={j}
                      className="px-1.5 py-0.5 bg-surface-3 border border-ps-border text-[10px] text-text-secondary"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {cat.multiplier}x {cat.category.replace(/_/g, ' ')}
                    </span>
                  ))}
                  {card.categories.length > 3 && (
                    <span className="px-1.5 py-0.5 text-[10px] text-text-tertiary">+{card.categories.length - 3}</span>
                  )}
                </div>
              )}

              {/* Bottom accent line on selected */}
              {selected && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  className="absolute bottom-0 left-0 h-0.5 bg-accent"
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Continue Button */}
      <motion.div className="flex justify-center">
        <button
          onClick={onNext}
          disabled={selectedCards.length === 0}
          className={`px-10 py-4 font-bold text-lg tracking-tight transition-all ${
            selectedCards.length > 0
              ? 'bg-accent text-black hover:bg-accent-dim'
              : 'bg-surface-2 text-text-tertiary border border-ps-border cursor-not-allowed'
          }`}
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Continue with {selectedCards.length} card{selectedCards.length !== 1 ? 's' : ''} →
        </button>
      </motion.div>
    </div>
  );
}
