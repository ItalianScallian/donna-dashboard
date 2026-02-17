'use client'

import { useState } from 'react'
import { CARDS } from '@/data/cards'
import type { CreditCard } from '@/types'
import { cn } from '@/lib/utils'
import { Check, CreditCard as CardIcon } from 'lucide-react'

interface CardSelectorProps {
  selected: string[]
  onChange: (ids: string[]) => void
}

function CardTile({ card, isSelected, onToggle }: {
  card: CreditCard
  isSelected: boolean
  onToggle: () => void
}) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'relative flex flex-col p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer group',
        isSelected
          ? 'border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/20'
          : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
      )}
    >
      {/* Card visual */}
      <div className={cn(
        'w-full h-14 rounded-lg mb-3 bg-gradient-to-br flex items-center justify-start px-3 shadow-lg',
        card.gradient
      )}>
        <CardIcon size={20} className="text-white/80 mr-2" />
        <span className="text-white text-xs font-semibold truncate">{card.issuer}</span>
      </div>

      {/* Info */}
      <div className="flex-1">
        <p className="text-white font-semibold text-sm leading-tight mb-1">{card.name}</p>
        <p className="text-gray-400 text-xs leading-snug line-clamp-2">{card.notes}</p>
      </div>

      {/* Annual fee */}
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-gray-500">
          {card.annualFee === 0 ? 'No annual fee' : `$${card.annualFee}/yr`}
        </span>
        <span className={cn(
          'text-xs px-2 py-0.5 rounded-full font-medium',
          card.rewardType === 'cashback'
            ? 'bg-green-500/20 text-green-400'
            : card.rewardType === 'points'
            ? 'bg-indigo-500/20 text-indigo-400'
            : 'bg-blue-500/20 text-blue-400'
        )}>
          {card.rewardType}
        </span>
      </div>

      {/* Selected checkmark */}
      {isSelected && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
          <Check size={12} className="text-white" />
        </div>
      )}
    </button>
  )
}

export default function CardSelector({ selected, onChange }: CardSelectorProps) {
  const [search, setSearch] = useState('')
  const [issuerFilter, setIssuerFilter] = useState<string>('all')

  const issuers = ['all', ...Array.from(new Set(CARDS.map((c) => c.issuer))).sort()]

  const filtered = CARDS.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.issuer.toLowerCase().includes(search.toLowerCase())
    const matchIssuer = issuerFilter === 'all' || c.issuer === issuerFilter
    return matchSearch && matchIssuer
  })

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id))
    } else {
      onChange([...selected, id])
    }
  }

  const selectAll = () => onChange(filtered.map((c) => c.id))
  const clearAll = () => onChange([])

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Your Cards</h2>
          <p className="text-gray-400 text-sm">
            {selected.length} selected · Select all cards you own
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={selectAll}
            className="text-xs text-indigo-400 hover:text-indigo-300 px-3 py-1.5 border border-indigo-500/30 rounded-lg hover:bg-indigo-500/10 transition-colors"
          >
            Select visible
          </button>
          <button
            onClick={clearAll}
            className="text-xs text-gray-400 hover:text-gray-300 px-3 py-1.5 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Search + filter */}
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Search cards..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/8 transition-colors"
        />
        <select
          value={issuerFilter}
          onChange={(e) => setIssuerFilter(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
        >
          {issuers.map((issuer) => (
            <option key={issuer} value={issuer} className="bg-gray-900">
              {issuer === 'all' ? 'All issuers' : issuer}
            </option>
          ))}
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {filtered.map((card) => (
          <CardTile
            key={card.id}
            card={card}
            isSelected={selected.includes(card.id)}
            onToggle={() => toggle(card.id)}
          />
        ))}
      </div>
    </div>
  )
}
