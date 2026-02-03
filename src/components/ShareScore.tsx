'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ShareScoreProps {
  grade: string;
  score: number;
  dollarsLeftOnTable: number;
}

export default function ShareScore({ grade, score, dollarsLeftOnTable }: ShareScoreProps) {
  const [copied, setCopied] = useState(false);

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
      className="border border-accent/30 bg-accent/5 p-6 text-center"
    >
      <h3 className="text-lg font-bold text-text-primary mb-2 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
        Share Your Score
      </h3>
      <p className="text-text-secondary text-sm mb-5">
        Brag about it — or shame yourself into optimizing
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={handleCopy}
          className="px-5 py-2.5 border border-ps-border bg-surface hover:border-accent/30 text-text-primary text-sm font-medium transition-all flex items-center gap-2"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {copied ? (
            <>
              <span className="text-accent">✓</span>
              Copied
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>

        <button
          onClick={handleTwitter}
          className="px-5 py-2.5 bg-accent text-black text-sm font-bold transition-all hover:bg-accent-dim flex items-center gap-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Share on X
        </button>
      </div>
    </motion.div>
  );
}
