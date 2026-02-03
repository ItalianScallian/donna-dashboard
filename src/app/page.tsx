'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-ps-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent flex items-center justify-center" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="text-black font-extrabold text-sm">P</span>
          </div>
          <span className="font-semibold text-text-primary text-base tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Point Scorer
          </span>
        </div>
        <Link
          href="/score"
          className="px-5 py-2.5 bg-accent text-black text-sm font-semibold tracking-tight transition-all hover:bg-accent-dim"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Get Started
        </Link>
      </nav>

      {/* Hero */}
      <main className="flex-1">
        <section className="px-6 md:px-10 pt-20 md:pt-32 pb-20 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            {/* Left - Text */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 border border-ps-border text-text-secondary text-xs tracking-wide uppercase mb-8"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <span className="w-1.5 h-1.5 bg-accent" />
                Free · No signup · Client-side only
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-text-primary leading-[0.95] tracking-tighter mb-8"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Are you leaving
                <br />
                money on
                <br />
                <span className="text-accent">the table?</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-lg text-text-secondary max-w-lg leading-relaxed mb-10"
              >
                Upload your statement. We&apos;ll score every transaction and show you exactly which card
                you should have used — and how much it cost you not to.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row items-start gap-4"
              >
                <Link
                  href="/score"
                  className="group relative px-8 py-4 bg-accent text-black text-lg font-bold tracking-tight transition-all hover:bg-accent-dim"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Score My Rewards
                  <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <a
                  href="#how-it-works"
                  className="px-8 py-4 text-text-secondary hover:text-text-primary transition-colors text-lg"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  How it works
                </a>
              </motion.div>
            </div>

            {/* Right - Mock Report Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5"
            >
              <div className="relative border border-ps-border bg-surface p-6 md:p-8">
                {/* Terminal dots */}
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-ps-border">
                  <div className="w-2.5 h-2.5 rounded-full bg-ps-red" />
                  <div className="w-2.5 h-2.5 rounded-full bg-ps-orange" />
                  <div className="w-2.5 h-2.5 rounded-full bg-ps-green" />
                  <span className="text-text-tertiary text-xs ml-2" style={{ fontFamily: 'var(--font-mono)' }}>
                    report.card
                  </span>
                </div>

                {/* Grade */}
                <div className="text-center mb-6">
                  <div className="text-7xl font-extrabold text-accent mb-2" style={{ fontFamily: 'var(--font-display)', textShadow: '0 0 40px rgba(200, 255, 0, 0.3)' }}>
                    B+
                  </div>
                  <p className="text-text-secondary text-sm">85% Rewards Efficiency</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="border border-ps-border p-3">
                    <p className="text-text-tertiary text-[10px] uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>Earned</p>
                    <p className="text-ps-green font-bold text-lg" style={{ fontFamily: 'var(--font-mono)' }}>$47.82</p>
                  </div>
                  <div className="border border-ps-border p-3">
                    <p className="text-text-tertiary text-[10px] uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>Optimal</p>
                    <p className="text-ps-cyan font-bold text-lg" style={{ fontFamily: 'var(--font-mono)' }}>$71.29</p>
                  </div>
                  <div className="border border-ps-border p-3">
                    <p className="text-text-tertiary text-[10px] uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>Missed</p>
                    <p className="text-ps-red font-bold text-lg" style={{ fontFamily: 'var(--font-mono)' }}>$23.47</p>
                  </div>
                </div>

                {/* Mini bar chart mock */}
                <div className="space-y-2">
                  {[
                    { label: 'Dining', w: '90%', optimal: '95%' },
                    { label: 'Travel', w: '60%', optimal: '88%' },
                    { label: 'Grocery', w: '75%', optimal: '80%' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="text-text-secondary">{item.label}</span>
                      </div>
                      <div className="relative h-1.5 bg-surface-3">
                        <div className="absolute inset-y-0 left-0 bg-accent/30" style={{ width: item.optimal }} />
                        <div className="absolute inset-y-0 left-0 bg-accent" style={{ width: item.w }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Glow effect */}
                <div className="absolute -inset-px pointer-events-none border border-accent/10" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Social proof bar */}
        <section className="border-y border-ps-border py-6 px-6 md:px-10">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-8 md:gap-16 text-text-tertiary text-sm">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <span className="text-accent font-bold">50+</span> cards supported
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <span className="text-accent font-bold">100%</span> client-side
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <span className="text-accent font-bold">0</span> data sent to servers
            </motion.span>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="px-6 md:px-10 py-24 md:py-32 max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-16">
              <h2
                className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tighter"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                How it works
              </h2>
              <div className="flex-1 h-px bg-ps-border" />
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              {
                num: '01',
                title: 'Select your cards',
                desc: 'Choose the credit cards in your wallet from our database of 50+ popular cards across all major issuers.',
              },
              {
                num: '02',
                title: 'Upload your CSV',
                desc: 'Drop your credit card statement CSV. We parse every transaction and auto-categorize merchants instantly.',
              },
              {
                num: '03',
                title: 'Get scored',
                desc: 'See your rewards efficiency grade, biggest missed opportunities, and which card to use for every category.',
              },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className={`p-8 border border-ps-border ${i < 2 ? 'md:border-r-0' : ''} relative group hover:bg-surface transition-colors duration-300`}>
                  <span
                    className="text-6xl font-extrabold text-surface-3 group-hover:text-accent/10 transition-colors duration-300 block mb-4"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {item.num}
                  </span>
                  <h3
                    className="text-xl font-bold text-text-primary mb-3 tracking-tight"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>

                  {/* Accent line on hover */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-500" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Diagonal section */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          {/* Diagonal top line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-ps-border transform -rotate-1 origin-left" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-ps-border transform rotate-1 origin-right" />

          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <AnimatedSection>
              <div className="max-w-2xl">
                <h2
                  className="text-4xl md:text-5xl font-extrabold text-text-primary tracking-tighter leading-tight mb-6"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Stop guessing.
                  <br />
                  <span className="text-accent">Start earning.</span>
                </h2>
                <p className="text-text-secondary text-lg leading-relaxed mb-8">
                  Most people use the wrong card for 30-40% of their purchases. That adds up to hundreds
                  of dollars in missed rewards every year. Point Scorer shows you exactly where you&apos;re losing
                  and what to do about it.
                </p>
                <Link
                  href="/score"
                  className="group inline-flex items-center gap-3 text-accent font-bold text-lg hover:gap-5 transition-all"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Score your rewards now
                  <span className="text-2xl">→</span>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-ps-border py-24 md:py-32 px-6 md:px-10">
          <AnimatedSection>
            <div className="max-w-6xl mx-auto text-center">
              <h2
                className="text-4xl md:text-5xl font-extrabold text-text-primary tracking-tighter mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Ready to find out?
              </h2>
              <p className="text-text-secondary text-lg mb-10 max-w-md mx-auto">
                Your data never leaves your browser. 100% client-side processing. No account needed.
              </p>
              <Link
                href="/score"
                className="group relative inline-block px-10 py-5 bg-accent text-black text-xl font-bold tracking-tight transition-all hover:bg-accent-dim"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Get Started — It&apos;s Free
                <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </AnimatedSection>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-ps-border px-6 md:px-10 py-6 flex items-center justify-between">
        <p className="text-text-tertiary text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
          Point Scorer — Open Source
        </p>
        <p className="text-text-tertiary text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
          Your data stays local
        </p>
      </footer>
    </div>
  );
}
