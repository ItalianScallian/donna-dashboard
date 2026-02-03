'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareScoreProps {
  grade: string;
  score: number;
  dollarsLeftOnTable: number;
}

export default function ShareScore({ grade, score, dollarsLeftOnTable }: ShareScoreProps) {
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const shareText = `I scored ${grade} (${score}%) on my credit card rewards optimization! 💳 I left $${dollarsLeftOnTable.toFixed(2)} on the table this month. Check your score at Point Scorer!`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = shareText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="border border-accent/20 bg-accent/3 p-6 md:p-8 text-center relative overflow-hidden"
    >
      {/* Subtle accent gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(200,255,0,0.05) 0%, transparent 60%)' }}
      />

      <div className="relative z-10">
        {/* Trophy/achievement icon */}
        <motion.div
          className="text-3xl mb-3"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          🏆
        </motion.div>

        <h3 className="text-xl font-bold text-text-primary mb-2 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
          Share Your Score
        </h3>
        <p className="text-text-secondary text-sm mb-6">
          Brag about it — or shame yourself into optimizing
        </p>

        {/* Share text preview */}
        <motion.button
          onClick={() => setShowPreview(!showPreview)}
          className="text-text-tertiary text-xs hover:text-text-secondary transition-colors mb-4 inline-block"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {showPreview ? 'Hide' : 'Preview'} share text
        </motion.button>

        <AnimatePresence>
          {showPreview && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <p className="text-text-secondary text-sm bg-surface border border-ps-border p-4 text-left" style={{ fontFamily: 'var(--font-mono)' }}>
                {shareText}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <motion.button
            onClick={handleCopy}
            className={`px-5 py-2.5 border text-sm font-medium transition-all flex items-center gap-2 ${
              copied
                ? 'border-accent/40 bg-accent/10 text-accent'
                : 'border-ps-border bg-surface hover:border-accent/30 text-text-primary'
            }`}
            style={{ fontFamily: 'var(--font-mono)' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-accent">✓</span> Copied!
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex items-center gap-2"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.button
            onClick={handleTwitter}
            className="px-5 py-2.5 bg-accent text-black text-sm font-bold transition-all flex items-center gap-2 relative overflow-hidden"
            style={{ fontFamily: 'var(--font-display)' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Share on X
            {/* Shimmer */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)' }}
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
            />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
