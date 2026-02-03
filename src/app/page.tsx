'use client';

import { motion, useInView, useMotionValue, useTransform, animate, useScroll, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState, useCallback } from 'react';
import { useScoring } from '@/hooks/useScoring';
import CardSelector from '@/components/CardSelector';
import FileUpload from '@/components/FileUpload';
import ProcessingAnimation from '@/components/ProcessingAnimation';
import ReportCard from '@/components/ReportCard';

/* ================================================
   ANIMATED SECTION WRAPPER
   ================================================ */
function AnimatedSection({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ================================================
   FLOATING PARTICLES
   ================================================ */
function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-accent"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 10, -20, 0],
            x: [0, 15, -10, 5, 0],
            opacity: [0, 0.4, 0.2, 0.5, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ================================================
   STAGGERED TEXT REVEAL
   ================================================ */
function StaggerText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            delay: delay + i * 0.03,
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

/* ================================================
   STEP INDICATOR (sticky sidebar)
   ================================================ */
function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = [
    { num: 1, label: 'Cards' },
    { num: 2, label: 'Upload' },
    { num: 3, label: 'Score' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-2"
    >
      {steps.map((step, i) => {
        const isActive = currentStep >= step.num;
        const isCurrent = currentStep === step.num;
        return (
          <div key={step.num} className="flex flex-col items-center">
            {i > 0 && (
              <motion.div
                className="w-px h-8 mb-2"
                style={{ backgroundColor: isActive ? 'var(--accent)' : 'var(--border)' }}
                animate={{ backgroundColor: isActive ? 'var(--accent)' : 'var(--border)' }}
                transition={{ duration: 0.3 }}
              />
            )}
            <motion.div
              className={`w-8 h-8 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                isActive
                  ? 'bg-accent text-black'
                  : 'bg-surface-2 text-text-tertiary border border-ps-border'
              }`}
              animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
              transition={isCurrent ? { duration: 2, repeat: Infinity } : {}}
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {step.num}
            </motion.div>
            <span
              className={`text-[9px] mt-1 uppercase tracking-wider ${isActive ? 'text-accent' : 'text-text-tertiary'}`}
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </motion.div>
  );
}

/* ================================================
   SECTION DIVIDER
   ================================================ */
function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-6 mb-10">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-ps-border" />
      <span
        className="text-text-tertiary text-xs uppercase tracking-[0.25em]"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {label}
      </span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-ps-border" />
    </div>
  );
}

/* ================================================
   MAIN PAGE COMPONENT
   ================================================ */
export default function Home() {
  const heroRef = useRef(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const uploadRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const {
    step,
    selectedCards,
    result,
    error,
    selectCards,
    processFiles,
    useSampleData,
    reset,
    goToStep,
  } = useScoring();

  // Track which visual step we're at for the indicator
  const currentStep = step === 'select-cards' ? 1 : step === 'upload' ? 2 : step === 'processing' || step === 'results' ? 3 : 1;

  // Smooth scroll helper
  const scrollTo = useCallback((ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // When cards are selected and user clicks next, scroll to upload
  const handleCardsNext = useCallback(() => {
    goToStep('upload');
    setTimeout(() => scrollTo(uploadRef), 100);
  }, [goToStep, scrollTo]);

  // When files are uploaded, scroll to results area
  const handleFileUpload = useCallback((files: File[]) => {
    processFiles(files);
    setTimeout(() => scrollTo(resultsRef), 100);
  }, [processFiles, scrollTo]);

  const handleUseSample = useCallback(() => {
    useSampleData();
    setTimeout(() => scrollTo(resultsRef), 100);
  }, [useSampleData, scrollTo]);

  // When results arrive, smooth scroll to them
  useEffect(() => {
    if (step === 'results' && resultsRef.current) {
      setTimeout(() => scrollTo(resultsRef), 300);
    }
  }, [step, scrollTo]);

  // Reset and scroll to top
  const handleReset = useCallback(() => {
    reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [reset]);

  // Scroll to cards section from hero CTA
  const handleGetStarted = useCallback(() => {
    scrollTo(cardsRef);
  }, [scrollTo]);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Nav */}
      <motion.nav
        className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-ps-border relative z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="w-8 h-8 bg-accent flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400 }}
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span className="text-black font-extrabold text-sm">P</span>
          </motion.div>
          <span className="font-semibold text-text-primary text-base tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Point Scorer
          </span>
        </div>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <button
            onClick={handleGetStarted}
            className="px-5 py-2.5 bg-accent text-black text-sm font-semibold tracking-tight transition-all hover:bg-accent-dim"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Get Started
          </button>
        </motion.div>
      </motion.nav>

      {/* Step Indicator */}
      <StepIndicator currentStep={currentStep} />

      <main className="flex-1">
        {/* ============================================
            HERO SECTION
            ============================================ */}
        <section ref={heroRef} className="relative min-h-[80vh] flex items-center">
          <div className="dot-grid" />
          <FloatingParticles />

          <motion.div
            className="px-6 md:px-10 py-20 md:py-28 max-w-5xl mx-auto w-full relative z-10 text-center"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 border border-ps-border text-text-secondary text-xs tracking-widest uppercase mb-10"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <motion.span
                className="w-1.5 h-1.5 bg-accent"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              Free · No signup · Client-side only
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-text-primary leading-[0.92] tracking-tighter mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              How good are you at
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[0.92] tracking-tighter mb-10"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <StaggerText text="credit card rewards?" className="text-accent" delay={0.6} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-12"
            >
              Select your cards, upload a statement, and find out exactly how much money
              you&apos;re leaving on the table — all without leaving this page.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <button
                onClick={handleGetStarted}
                className="group relative inline-block"
              >
                <div
                  className="relative bg-accent text-black font-bold tracking-tight px-10 py-5 text-xl transition-all hover:bg-accent-dim"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Score My Rewards
                  <motion.span
                    className="inline-block ml-2"
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    ↓
                  </motion.span>
                </div>
              </button>
            </motion.div>
          </motion.div>

          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
        </section>

        {/* Social proof bar */}
        <section className="border-y border-ps-border py-8 px-6 md:px-10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-10 md:gap-20">
            {[
              { value: '50+', label: 'cards supported' },
              { value: '100%', label: 'client-side' },
              { value: '0', label: 'data sent to servers' },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="flex items-center gap-3">
                  <span className="text-accent font-bold text-2xl" style={{ fontFamily: 'var(--font-mono)' }}>
                    {item.value}
                  </span>
                  <span className="text-text-tertiary text-sm">{item.label}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* ============================================
            STEP 1: SELECT YOUR CARDS
            ============================================ */}
        <section ref={cardsRef} className="px-6 md:px-10 py-24 md:py-32 max-w-7xl mx-auto scroll-mt-20">
          <AnimatedSection>
            <SectionDivider label="Step 1" />
            <CardSelector
              selectedCards={selectedCards}
              onSelect={selectCards}
              onNext={handleCardsNext}
            />
          </AnimatedSection>
        </section>

        {/* ============================================
            STEP 2: UPLOAD YOUR STATEMENT
            ============================================ */}
        <AnimatePresence>
          {(step === 'upload' || step === 'processing' || step === 'results') && (
            <motion.section
              ref={uploadRef}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="px-6 md:px-10 py-24 md:py-32 max-w-7xl mx-auto border-t border-ps-border scroll-mt-20"
            >
              <SectionDivider label="Step 2" />
              {step === 'upload' && (
                <FileUpload
                  onUpload={handleFileUpload}
                  onUseSample={handleUseSample}
                  onBack={() => {
                    goToStep('select-cards');
                    setTimeout(() => scrollTo(cardsRef), 100);
                  }}
                  error={error}
                />
              )}
              {step === 'processing' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProcessingAnimation />
                </motion.div>
              )}
            </motion.section>
          )}
        </AnimatePresence>

        {/* ============================================
            STEP 3: RESULTS
            ============================================ */}
        <AnimatePresence>
          {step === 'results' && result && (
            <motion.section
              ref={resultsRef}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="px-6 md:px-10 py-24 md:py-32 max-w-7xl mx-auto border-t border-ps-border scroll-mt-20"
            >
              <SectionDivider label="Your Score" />
              <ReportCard result={result} onReset={handleReset} />
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-ps-border px-6 md:px-10 py-6 flex items-center justify-between">
        <p className="text-text-tertiary text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
          Point Scorer — Open Source
        </p>
        <div className="flex items-center gap-1.5">
          <motion.div
            className="w-1.5 h-1.5 bg-ps-green rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <p className="text-text-tertiary text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
            Your data stays local
          </p>
        </div>
      </footer>
    </div>
  );
}
