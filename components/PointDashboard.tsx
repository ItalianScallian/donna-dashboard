'use client'

import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, Legend
} from 'recharts'
import type { AnalysisResult, AnalyzedTransaction } from '@/types'
import { formatCurrency, formatPercent, CATEGORY_ICONS, CATEGORY_COLORS } from '@/lib/utils'
import { cn } from '@/lib/utils'
import ScoreGauge from './ScoreGauge'
import {
  TrendingDown, TrendingUp, DollarSign, CreditCard as CardIcon,
  ChevronDown, ChevronUp, Star, AlertTriangle, CheckCircle, ArrowRight
} from 'lucide-react'

interface DashboardProps {
  result: AnalysisResult
}

function StatCard({ label, value, sub, icon: Icon, color }: {
  label: string
  value: string
  sub?: string
  icon: React.ElementType
  color: string
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-3">
      <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', color)}>
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <p className="text-gray-400 text-sm">{label}</p>
        <p className="text-white text-2xl font-bold mt-0.5">{value}</p>
        {sub && <p className="text-gray-500 text-xs mt-1">{sub}</p>}
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: 'optimal' | 'ok' | 'suboptimal' }) {
  const config = {
    optimal: { label: 'Optimal', cls: 'bg-green-500/20 text-green-400 border-green-500/30' },
    ok: { label: 'OK', cls: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    suboptimal: { label: 'Wrong Card', cls: 'bg-red-500/20 text-red-400 border-red-500/30' },
  }
  const { label, cls } = config[status]
  return (
    <span className={cn('text-xs px-2.5 py-1 rounded-full border font-medium', cls)}>
      {label}
    </span>
  )
}

function TransactionRow({ tx }: { tx: AnalyzedTransaction }) {
  const [expanded, setExpanded] = useState(false)
  const icon = CATEGORY_ICONS[tx.category] ?? '💳'

  return (
    <>
      <tr
        className={cn(
          'border-b border-white/5 hover:bg-white/3 cursor-pointer transition-colors',
          tx.status === 'suboptimal' && 'bg-red-500/3',
        )}
        onClick={() => setExpanded(!expanded)}
      >
        <td className="py-3 px-4 text-gray-400 text-sm whitespace-nowrap">{tx.date}</td>
        <td className="py-3 px-4">
          <div className="flex items-center gap-2">
            <span>{icon}</span>
            <span className="text-white text-sm font-medium">{tx.merchant}</span>
          </div>
        </td>
        <td className="py-3 px-4 text-right text-white text-sm font-mono font-medium">
          {formatCurrency(tx.amount)}
        </td>
        <td className="py-3 px-4 hidden md:table-cell">
          <span className="text-gray-300 text-sm">{tx.cardUsed}</span>
        </td>
        <td className="py-3 px-4 text-right hidden md:table-cell">
          <span className="text-gray-300 text-sm font-mono">{formatCurrency(tx.cardUsedReward)}</span>
        </td>
        <td className="py-3 px-4 text-right">
          <span className={cn(
            'text-sm font-mono font-medium',
            tx.leftOnTable > 0.01 ? 'text-red-400' : 'text-green-400'
          )}>
            {tx.leftOnTable > 0.01 ? `-${formatCurrency(tx.leftOnTable)}` : '✓'}
          </span>
        </td>
        <td className="py-3 px-4">
          <StatusBadge status={tx.status} />
        </td>
        <td className="py-3 px-4 text-gray-500">
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </td>
      </tr>
      {expanded && tx.status !== 'optimal' && (
        <tr className="bg-amber-500/5 border-b border-white/5">
          <td colSpan={8} className="px-4 py-3">
            <div className="flex items-center gap-2 text-sm">
              <ArrowRight size={14} className="text-amber-400 shrink-0" />
              <span className="text-gray-300">
                Use <span className="text-amber-300 font-semibold">{tx.bestCard}</span> instead
                (earns {tx.bestCardMultiplier}× vs {tx.cardUsedMultiplier}× on {tx.category})
                — save <span className="text-green-400 font-semibold">{formatCurrency(tx.leftOnTable)}</span> on this transaction
              </span>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

function CategoryChart({ result }: { result: AnalysisResult }) {
  const data = result.categorySummaries.map((s) => ({
    name: `${CATEGORY_ICONS[s.category] ?? ''} ${s.category}`,
    earned: parseFloat(s.totalEarned.toFixed(2)),
    missed: parseFloat(s.leftOnTable.toFixed(2)),
    efficiency: parseFloat(s.efficiency.toFixed(1)),
  }))

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
      <h3 className="text-white font-semibold mb-4">Rewards by Category</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="name"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#6b7280', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${v.toFixed(0)}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#111827',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#fff',
            }}
            formatter={(value: number, name: string) => [
              formatCurrency(value),
              name === 'earned' ? 'Rewards Earned' : 'Left on Table',
            ]}
          />
          <Legend
            formatter={(value) => (
              <span style={{ color: '#9ca3af', fontSize: 12 }}>
                {value === 'earned' ? 'Rewards Earned' : 'Left on Table'}
              </span>
            )}
          />
          <Bar dataKey="earned" fill="#6366f1" radius={[4, 4, 0, 0]} />
          <Bar dataKey="missed" fill="#ef4444" radius={[4, 4, 0, 0]} opacity={0.7} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function RecommendedCards({ result }: { result: AnalysisResult }) {
  if (result.recommendedCards.length === 0) return null

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Star size={18} className="text-amber-400" />
        <h3 className="text-white font-semibold">Cards to Consider</h3>
        <span className="text-xs text-gray-500 ml-1">Based on your spending patterns</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {result.recommendedCards.map(({ card, additionalRewardsPerYear, topCategories, reason }) => (
          <div
            key={card.id}
            className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-amber-500/30 transition-colors group"
          >
            {/* Card visual */}
            <div className={`w-full h-12 rounded-lg mb-3 bg-gradient-to-br ${card.gradient} flex items-center px-3`}>
              <CardIcon size={16} className="text-white/60 mr-2" />
              <span className="text-white text-xs font-medium">{card.issuer}</span>
            </div>

            <p className="text-white font-semibold text-sm mb-1">{card.name}</p>
            <p className="text-gray-400 text-xs mb-3 leading-relaxed">{reason}</p>

            {/* Benefit */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2 mb-3">
              <p className="text-green-400 font-bold text-base">
                +{formatCurrency(additionalRewardsPerYear)}
              </p>
              <p className="text-green-600 text-xs">estimated extra/year</p>
            </div>

            {/* Top categories */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {topCategories.map((cat) => (
                <span key={cat} className="text-xs bg-indigo-500/15 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/20">
                  {CATEGORY_ICONS[cat]} {cat}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{card.annualFee === 0 ? 'No annual fee' : `$${card.annualFee}/yr`}</span>
              {card.signupBonus && (
                <span className="text-amber-500/70 truncate ml-2 text-right">{card.signupBonus}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PointDashboard({ result }: DashboardProps) {
  const [txFilter, setTxFilter] = useState<'all' | 'suboptimal' | 'ok' | 'optimal'>('all')
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'left'>('date')

  const filteredTx = result.transactions
    .filter((tx) => txFilter === 'all' || tx.status === txFilter)
    .sort((a, b) => {
      if (sortBy === 'amount') return b.amount - a.amount
      if (sortBy === 'left') return b.leftOnTable - a.leftOnTable
      return a.date.localeCompare(b.date)
    })

  const suboptimalCount = result.transactions.filter((t) => t.status === 'suboptimal').length

  return (
    <div className="space-y-6">
      {/* Score + stats row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Gauge */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center">
          <ScoreGauge score={result.overallScore} size={220} />
          {suboptimalCount > 0 && (
            <div className="mt-4 flex items-center gap-2 text-amber-400 text-sm bg-amber-500/10 border border-amber-500/20 rounded-lg px-4 py-2">
              <AlertTriangle size={14} />
              <span>{suboptimalCount} transactions used the wrong card</span>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="lg:col-span-3 grid grid-cols-2 gap-4">
          <StatCard
            label="Total Spend"
            value={formatCurrency(result.totalSpend)}
            sub="across all transactions"
            icon={DollarSign}
            color="bg-indigo-500/20"
          />
          <StatCard
            label="Rewards Earned"
            value={formatCurrency(result.totalEarned)}
            sub={`${formatPercent((result.totalEarned / result.totalSpend) * 100)} effective rate`}
            icon={TrendingUp}
            color="bg-green-500/20"
          />
          <StatCard
            label="Optimal Possible"
            value={formatCurrency(result.totalOptimal)}
            sub="if perfect card used each time"
            icon={CardIcon}
            color="bg-purple-500/20"
          />
          <StatCard
            label="Left on Table"
            value={formatCurrency(result.totalLeftOnTable)}
            sub="rewards you missed out on"
            icon={TrendingDown}
            color="bg-red-500/20"
          />
        </div>
      </div>

      {/* Category chart */}
      <CategoryChart result={result} />

      {/* Category detail table */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
        <h3 className="text-white font-semibold mb-4">Category Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-gray-500 font-medium py-2 px-3">Category</th>
                <th className="text-right text-gray-500 font-medium py-2 px-3">Spend</th>
                <th className="text-right text-gray-500 font-medium py-2 px-3">Earned</th>
                <th className="text-right text-gray-500 font-medium py-2 px-3">Left on Table</th>
                <th className="text-right text-gray-500 font-medium py-2 px-3">Efficiency</th>
              </tr>
            </thead>
            <tbody>
              {result.categorySummaries.map((s) => (
                <tr key={s.category} className="border-b border-white/5 hover:bg-white/3">
                  <td className="py-3 px-3">
                    <span className="text-white">
                      {CATEGORY_ICONS[s.category]} {s.category}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right text-gray-300 font-mono">
                    {formatCurrency(s.totalSpend)}
                  </td>
                  <td className="py-3 px-3 text-right text-green-400 font-mono">
                    {formatCurrency(s.totalEarned)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono">
                    <span className={s.leftOnTable > 0.01 ? 'text-red-400' : 'text-gray-500'}>
                      {s.leftOnTable > 0.01 ? formatCurrency(s.leftOnTable) : '—'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            'h-full rounded-full',
                            s.efficiency >= 80 ? 'bg-green-500' :
                            s.efficiency >= 60 ? 'bg-amber-500' : 'bg-red-500'
                          )}
                          style={{ width: `${s.efficiency}%` }}
                        />
                      </div>
                      <span className={cn(
                        'text-sm font-mono',
                        s.efficiency >= 80 ? 'text-green-400' :
                        s.efficiency >= 60 ? 'text-amber-400' : 'text-red-400'
                      )}>
                        {formatPercent(s.efficiency, 0)}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommended cards */}
      <RecommendedCards result={result} />

      {/* Transaction table */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <h3 className="text-white font-semibold">Transaction Breakdown</h3>
          <div className="flex gap-2 flex-wrap">
            {/* Filter pills */}
            {(['all', 'suboptimal', 'ok', 'optimal'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setTxFilter(f)}
                className={cn(
                  'text-xs px-3 py-1.5 rounded-full border transition-colors capitalize',
                  txFilter === f
                    ? f === 'optimal' ? 'bg-green-500/20 border-green-500/40 text-green-400'
                      : f === 'ok' ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                      : f === 'suboptimal' ? 'bg-red-500/20 border-red-500/40 text-red-400'
                      : 'bg-indigo-500/20 border-indigo-500/40 text-indigo-400'
                    : 'border-white/10 text-gray-400 hover:border-white/20'
                )}
              >
                {f === 'all' ? `All (${result.transactions.length})` :
                 f === 'suboptimal' ? `Wrong Card (${result.transactions.filter(t => t.status === 'suboptimal').length})` :
                 f === 'ok' ? `OK (${result.transactions.filter(t => t.status === 'ok').length})` :
                 `Optimal (${result.transactions.filter(t => t.status === 'optimal').length})`}
              </button>
            ))}
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-gray-400 focus:outline-none"
            >
              <option value="date" className="bg-gray-900">Sort: Date</option>
              <option value="amount" className="bg-gray-900">Sort: Amount</option>
              <option value="left" className="bg-gray-900">Sort: Left on Table</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-gray-500 font-medium py-2 px-4">Date</th>
                <th className="text-left text-gray-500 font-medium py-2 px-4">Merchant</th>
                <th className="text-right text-gray-500 font-medium py-2 px-4">Amount</th>
                <th className="text-left text-gray-500 font-medium py-2 px-4 hidden md:table-cell">Card Used</th>
                <th className="text-right text-gray-500 font-medium py-2 px-4 hidden md:table-cell">Earned</th>
                <th className="text-right text-gray-500 font-medium py-2 px-4">Left on Table</th>
                <th className="text-left text-gray-500 font-medium py-2 px-4">Status</th>
                <th className="py-2 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredTx.map((tx, i) => (
                <TransactionRow key={`${tx.date}-${tx.merchant}-${i}`} tx={tx} />
              ))}
            </tbody>
          </table>
          {filteredTx.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No transactions matching this filter
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
