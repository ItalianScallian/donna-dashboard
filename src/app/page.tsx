'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-800/50">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💳</span>
          <span className="font-bold text-white text-lg">Point Scorer</span>
        </div>
        <Link
          href="/score"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Get Started
        </Link>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-600/10 border border-indigo-500/20 rounded-full text-indigo-300 text-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            Free • No signup required
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
            How good are you at{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              credit card rewards?
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Upload your credit card statement and get an instant report card. Find out exactly how much money you&apos;re leaving on the table — and which card to use for every purchase.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/score"
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-lg font-semibold rounded-2xl shadow-lg shadow-indigo-600/25 transition-all hover:shadow-xl hover:shadow-indigo-600/30 hover:-translate-y-0.5"
            >
              Score My Rewards →
            </Link>
            <a
              href="#how-it-works"
              className="px-8 py-4 text-slate-400 hover:text-white font-medium transition-colors"
            >
              How it works
            </a>
          </motion.div>
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-20 w-full max-w-2xl"
        >
          <div className="relative bg-slate-800/50 border border-slate-700 rounded-3xl p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-500/20 to-green-500/5 border-2 border-green-500/30">
                <span className="text-4xl font-black text-green-400">B+</span>
              </div>
              <p className="text-white font-bold text-xl">85% Rewards Efficiency</p>
              <p className="text-red-400 font-medium">You left <span className="text-red-300 font-bold">$23.47</span> on the table this month</p>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="bg-slate-700/50 rounded-xl p-3">
                  <p className="text-xs text-slate-400">Earned</p>
                  <p className="text-green-400 font-bold">$47.82</p>
                </div>
                <div className="bg-slate-700/50 rounded-xl p-3">
                  <p className="text-xs text-slate-400">Optimal</p>
                  <p className="text-cyan-400 font-bold">$71.29</p>
                </div>
                <div className="bg-slate-700/50 rounded-xl p-3">
                  <p className="text-xs text-slate-400">Transactions</p>
                  <p className="text-white font-bold">24</p>
                </div>
              </div>
            </div>
            {/* Glow */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-indigo-500/10 via-transparent to-purple-500/10 pointer-events-none" />
          </div>
        </motion.div>

        {/* How It Works */}
        <div id="how-it-works" className="mt-32 w-full max-w-4xl">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white text-center mb-12"
          >
            How It Works
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { step: '1', icon: '💳', title: 'Select Your Cards', desc: 'Choose which credit cards are in your wallet from our database of 50+ popular cards.' },
              { step: '2', icon: '📄', title: 'Upload Statement', desc: 'Drop in your CSV statement. We parse every transaction and categorize merchants automatically.' },
              { step: '3', icon: '📊', title: 'Get Your Score', desc: 'See your rewards efficiency grade, missed opportunities, and exactly which card to use where.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 text-center"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="inline-block px-2 py-0.5 bg-indigo-600/20 text-indigo-400 text-xs font-bold rounded mb-2">Step {item.step}</div>
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 mb-12 text-center"
        >
          <p className="text-slate-400 mb-4">Your data never leaves your browser. 100% client-side processing.</p>
          <Link
            href="/score"
            className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-lg font-semibold rounded-2xl shadow-lg shadow-indigo-600/25 transition-all"
          >
            Get Started — It&apos;s Free →
          </Link>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 px-6 py-6 text-center text-slate-600 text-sm">
        <p>Point Scorer — Open Source Credit Card Rewards Optimizer</p>
      </footer>
    </div>
  );
}
