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

const issuerColors: Record<string, string> = {
  'Chase': 'bg-blue-600',
  'Amex': 'bg-blue-500',
  'Citi': 'bg-sky-600',
  'Capital One': 'bg-red-600',
  'Discover': 'bg-orange-500',
  'Wells Fargo': 'bg-yellow-600',
  'US Bank': 'bg-purple-600',
  'Bank of America': 'bg-red-700',
  'Apple': 'bg-gray-500',
  'Barclays': 'bg-cyan-600',
  'Synchrony': 'bg-teal-600',
  'TD Bank': 'bg-green-600',
  'SoFi': 'bg-indigo-600',
  'Alliant': 'bg-emerald-600',
  'Fidelity': 'bg-green-700',
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
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-white mb-2">Select Your Cards</h2>
        <p className="text-slate-400">Choose the credit cards in your wallet. We&apos;ll figure out the optimal card for every purchase.</p>
      </motion.div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search cards..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Issuer Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilterIssuer(null)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
            !filterIssuer ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}
        >
          All
        </button>
        {issuers.map(issuer => (
          <button
            key={issuer}
            onClick={() => setFilterIssuer(filterIssuer === issuer ? null : issuer)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              filterIssuer === issuer ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {issuer}
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
            className="mb-4 flex flex-wrap items-center gap-2"
          >
            <span className="text-sm text-slate-400">{selectedCards.length} selected:</span>
            {selectedCards.map(card => (
              <span
                key={card.id}
                className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-600/20 border border-indigo-500/30 rounded-full text-xs text-indigo-300"
              >
                {card.name}
                <button
                  onClick={() => toggleCard(card)}
                  className="hover:text-white ml-1"
                >
                  ✕
                </button>
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8 max-h-[50vh] overflow-y-auto pr-2">
        {filtered.map((card, i) => (
          <motion.button
            key={card.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.02, 0.5) }}
            onClick={() => toggleCard(card)}
            className={`relative p-4 rounded-xl border text-left transition-all ${
              isSelected(card)
                ? 'bg-indigo-600/20 border-indigo-500 ring-1 ring-indigo-500/50'
                : 'bg-slate-800/50 border-slate-700 hover:border-slate-600 hover:bg-slate-800'
            }`}
          >
            {isSelected(card) && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
            <div className={`inline-block px-2 py-0.5 rounded text-xs font-medium text-white mb-2 ${issuerColors[card.issuer] || 'bg-slate-600'}`}>
              {card.issuer}
            </div>
            <h3 className="font-semibold text-white text-sm leading-tight">{card.name}</h3>
            <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
              <span>{card.baseReward}x base</span>
              <span>•</span>
              <span>{card.annualFee === 0 ? 'No AF' : `$${card.annualFee}/yr`}</span>
            </div>
            {card.categories.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {card.categories.slice(0, 3).map((cat, j) => (
                  <span key={j} className="px-1.5 py-0.5 bg-slate-700/50 rounded text-[10px] text-slate-300">
                    {cat.multiplier}x {cat.category.replace(/_/g, ' ')}
                  </span>
                ))}
                {card.categories.length > 3 && (
                  <span className="px-1.5 py-0.5 text-[10px] text-slate-500">+{card.categories.length - 3} more</span>
                )}
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Continue Button */}
      <motion.div className="flex justify-center">
        <button
          onClick={onNext}
          disabled={selectedCards.length === 0}
          className={`px-8 py-3 rounded-xl font-semibold text-lg transition-all ${
            selectedCards.length > 0
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/25'
              : 'bg-slate-700 text-slate-500 cursor-not-allowed'
          }`}
        >
          Continue with {selectedCards.length} card{selectedCards.length !== 1 ? 's' : ''}
        </button>
      </motion.div>
    </div>
  );
}
