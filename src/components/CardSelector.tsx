'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { creditCards } from '@/data/cards';
import { CreditCard, DetectedCard } from '@/lib/types';

interface CardSelectorProps {
  selectedCards: CreditCard[];
  onSelect: (cards: CreditCard[]) => void;
  onNext: () => void;
  /** If provided, show in detection/confirmation mode */
  detection?: DetectedCard | null;
  /** Called when user confirms detection and is ready to score */
  onConfirmDetection?: () => void;
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

/* ================================================
   CREDIT CARD SHAPED COMPONENT
   ================================================ */
function CreditCardItem({ card, selected, onToggle, delay }: {
  card: CreditCard; selected: boolean; onToggle: () => void; delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  const accentColor = issuerAccents[card.issuer] || '#555';

  return (
    <motion.button
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onClick={onToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative text-left transition-all duration-300 w-full"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className={`relative overflow-hidden p-4 pb-3 transition-all duration-300 ${
          selected
            ? 'border-accent bg-accent/5'
            : 'border-ps-border bg-surface hover:bg-surface-2 hover:border-border-hover'
        }`}
        style={{
          border: `1px solid ${selected ? 'var(--accent)' : ''}`,
          aspectRatio: '1.586',
        }}
      >
        {(hovered || selected) && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: selected
                ? 'linear-gradient(135deg, rgba(200,255,0,0) 0%, rgba(200,255,0,0.04) 30%, rgba(0,229,255,0.04) 50%, rgba(200,255,0,0.04) 70%, rgba(200,255,0,0) 100%)'
                : `linear-gradient(135deg, transparent 0%, ${accentColor}08 30%, ${accentColor}05 50%, ${accentColor}08 70%, transparent 100%)`,
              backgroundSize: '200% 200%',
            }}
            animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        )}

        <div className="flex items-start justify-between mb-auto">
          <div
            className="px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider"
            style={{ backgroundColor: accentColor, fontFamily: 'var(--font-mono)' }}
          >
            {card.issuer}
          </div>
          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="w-5 h-5 bg-accent flex items-center justify-center"
              >
                <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-3 mb-2">
          <div
            className="w-7 h-5 border relative"
            style={{ borderColor: selected ? 'rgba(200,255,0,0.3)' : 'rgba(85,85,85,0.3)' }}
          >
            <div className="absolute top-1/2 left-0 right-0 h-px" style={{ background: selected ? 'rgba(200,255,0,0.2)' : 'rgba(85,85,85,0.2)' }} />
            <div className="absolute top-0 bottom-0 left-1/2 w-px" style={{ background: selected ? 'rgba(200,255,0,0.2)' : 'rgba(85,85,85,0.2)' }} />
          </div>
        </div>

        <h3 className="font-semibold text-text-primary text-xs leading-tight mb-1.5" style={{ fontFamily: 'var(--font-display)' }}>
          {card.name}
        </h3>

        <div className="flex items-center gap-2 text-[10px] text-text-tertiary" style={{ fontFamily: 'var(--font-mono)' }}>
          <span>{card.baseReward}x base</span>
          <span>·</span>
          <span>{card.annualFee === 0 ? 'No AF' : `$${card.annualFee}/yr`}</span>
        </div>

        {card.categories.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-0.5">
            {card.categories.slice(0, 2).map((cat, j) => (
              <span
                key={j}
                className="px-1 py-0.5 bg-surface-3 border border-ps-border text-[9px] text-text-secondary"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {cat.multiplier}x {cat.category.replace(/_/g, ' ').slice(0, 10)}
              </span>
            ))}
            {card.categories.length > 2 && (
              <span className="px-1 py-0.5 text-[9px] text-text-tertiary">+{card.categories.length - 2}</span>
            )}
          </div>
        )}

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent origin-left"
            />
          )}
        </AnimatePresence>

        {selected && (
          <motion.div
            className="absolute -inset-[1px] pointer-events-none"
            style={{ boxShadow: '0 0 15px rgba(200, 255, 0, 0.15), 0 0 30px rgba(200, 255, 0, 0.05)' }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>
    </motion.button>
  );
}

/* ================================================
   DETECTION CONFIRMATION BANNER
   Shows detected issuer/card with option to change
   ================================================ */
function DetectionBanner({
  detection,
  issuerCards,
  selectedCards,
  onSelect,
  onExpand,
}: {
  detection: DetectedCard;
  issuerCards: CreditCard[];
  selectedCards: CreditCard[];
  onSelect: (cards: CreditCard[]) => void;
  onExpand: () => void;
}) {
  const accentColor = issuerAccents[detection.issuer] || '#555';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      {/* Detection header */}
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          className="w-3 h-3"
          style={{ backgroundColor: accentColor }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <div>
          <p className="text-text-primary font-semibold text-lg" style={{ fontFamily: 'var(--font-display)' }}>
            We detected a <span style={{ color: accentColor }}>{detection.issuer}</span> statement
            {detection.lastFour && (
              <span className="text-text-tertiary text-sm ml-2" style={{ fontFamily: 'var(--font-mono)' }}>
                (···{detection.lastFour})
              </span>
            )}
          </p>
          <p className="text-text-secondary text-sm">
            Which {detection.issuer} card is this?
          </p>
        </div>
      </div>

      {/* Filtered card grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-6">
        {issuerCards.map((card, i) => (
          <CreditCardItem
            key={card.id}
            card={card}
            selected={selectedCards.some(c => c.id === card.id)}
            onToggle={() => {
              const exists = selectedCards.find(c => c.id === card.id);
              if (exists) {
                onSelect(selectedCards.filter(c => c.id !== card.id));
              } else {
                onSelect([...selectedCards, card]);
              }
            }}
            delay={i * 0.05}
          />
        ))}
      </div>

      {/* Option to see all cards */}
      <button
        onClick={onExpand}
        className="text-text-tertiary hover:text-accent text-xs transition-colors"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        Not a {detection.issuer} card? → Show all cards
      </button>
    </motion.div>
  );
}

/* ================================================
   MAIN CARD SELECTOR
   ================================================ */
export default function CardSelector({ selectedCards, onSelect, onNext, detection, onConfirmDetection }: CardSelectorProps) {
  const [search, setSearch] = useState('');
  const [filterIssuer, setFilterIssuer] = useState<string | null>(null);
  const [expandedFromDetection, setExpandedFromDetection] = useState(false);

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

  // Cards from detected issuer
  const detectedIssuerCards = useMemo(() => {
    if (!detection || detection.confidence === 'unknown' || !detection.issuer) return [];
    return creditCards.filter(c => c.issuer === detection.issuer);
  }, [detection]);

  const showDetectionBanner = detection && detection.confidence !== 'unknown' && detection.issuer && !expandedFromDetection;

  const toggleCard = (card: CreditCard) => {
    const exists = selectedCards.find(c => c.id === card.id);
    if (exists) {
      onSelect(selectedCards.filter(c => c.id !== card.id));
    } else {
      onSelect([...selectedCards, card]);
    }
  };

  const isSelected = (card: CreditCard) => selectedCards.some(c => c.id === card.id);

  // In detection mode, the title and flow are different
  const title = showDetectionBanner ? 'Confirm Your Card' : "What\u2019s in your wallet?";
  const subtitle = showDetectionBanner
    ? 'We identified your statement format. Select the card(s) it belongs to, plus any others you carry.'
    : "Select the credit cards you carry. We\u2019ll figure out which one wins for every purchase.";

  return (
    <div className="w-full max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h2
          className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tighter mb-3"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {title}
        </h2>
        <p className="text-text-secondary text-lg">{subtitle}</p>
      </motion.div>

      {/* Detection banner with filtered cards */}
      {showDetectionBanner && (
        <DetectionBanner
          detection={detection!}
          issuerCards={detectedIssuerCards}
          selectedCards={selectedCards}
          onSelect={onSelect}
          onExpand={() => setExpandedFromDetection(true)}
        />
      )}

      {/* Full card selector (shown when no detection, or user clicked "show all") */}
      {(!showDetectionBanner || expandedFromDetection) && (
        <>
          {expandedFromDetection && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6"
            >
              <button
                onClick={() => setExpandedFromDetection(false)}
                className="text-accent hover:text-accent-dim text-xs transition-colors"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                ← Back to detected cards
              </button>
            </motion.div>
          )}

          {/* Search */}
          <motion.div
            className="mb-6 relative"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search cards..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-surface border border-ps-border text-text-primary placeholder-text-tertiary focus:outline-none focus:border-accent transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}
            />
          </motion.div>

          {/* Issuer filter tabs */}
          <motion.div
            className="flex flex-wrap gap-1 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            <motion.button
              onClick={() => setFilterIssuer(null)}
              className={`px-3 py-1.5 text-[10px] font-bold transition-all border uppercase tracking-wider ${
                !filterIssuer
                  ? 'bg-accent text-black border-accent'
                  : 'bg-transparent text-text-secondary border-ps-border hover:border-border-hover hover:text-text-primary'
              }`}
              style={{ fontFamily: 'var(--font-mono)' }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              All ({creditCards.length})
            </motion.button>
            {issuers.map(issuer => {
              const count = creditCards.filter(c => c.issuer === issuer).length;
              return (
                <motion.button
                  key={issuer}
                  onClick={() => setFilterIssuer(filterIssuer === issuer ? null : issuer)}
                  className={`px-3 py-1.5 text-[10px] font-bold transition-all border uppercase tracking-wider ${
                    filterIssuer === issuer
                      ? 'bg-accent text-black border-accent'
                      : 'bg-transparent text-text-secondary border-ps-border hover:border-border-hover hover:text-text-primary'
                  }`}
                  style={{ fontFamily: 'var(--font-mono)' }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {issuer} ({count})
                </motion.button>
              );
            })}
          </motion.div>

          {/* Card grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-10 max-h-[55vh] overflow-y-auto pr-1">
            {filtered.map((card, i) => (
              <CreditCardItem
                key={card.id}
                card={card}
                selected={isSelected(card)}
                onToggle={() => toggleCard(card)}
                delay={Math.min(i * 0.03, 0.5)}
              />
            ))}
          </div>
        </>
      )}

      {/* Selected pills */}
      <AnimatePresence>
        {selectedCards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-5 overflow-hidden"
          >
            <div className="flex flex-wrap items-center gap-2 py-3 px-4 border border-accent/20 bg-accent/3">
              <span className="text-xs text-accent font-bold uppercase tracking-wider mr-1" style={{ fontFamily: 'var(--font-mono)' }}>
                {selectedCards.length} selected
              </span>
              {selectedCards.map(card => (
                <motion.span
                  key={card.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-accent/30 bg-accent/5 text-xs text-accent"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {card.name}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleCard(card); }}
                    className="hover:text-text-primary ml-0.5 opacity-60 hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue button */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          onClick={onConfirmDetection || onNext}
          disabled={selectedCards.length === 0}
          className={`relative px-12 py-4 font-bold text-lg tracking-tight transition-all overflow-hidden ${
            selectedCards.length > 0
              ? 'bg-accent text-black'
              : 'bg-surface-2 text-text-tertiary border border-ps-border cursor-not-allowed'
          }`}
          style={{ fontFamily: 'var(--font-display)' }}
          whileHover={selectedCards.length > 0 ? { scale: 1.02 } : {}}
          whileTap={selectedCards.length > 0 ? { scale: 0.98 } : {}}
        >
          {detection ? 'Score My Rewards →' : `Continue with ${selectedCards.length} card${selectedCards.length !== 1 ? 's' : ''} →`}

          {selectedCards.length > 0 && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)',
              }}
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
            />
          )}
        </motion.button>
      </motion.div>
    </div>
  );
}
