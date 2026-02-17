'use client'

import { useEffect, useState } from 'react'

interface VisionItem {
  type: 'image' | 'quote' | 'goal'
  category: string
  title?: string
  description?: string
  image?: string
  size?: string
  url?: string
  text?: string
  author?: string
  gradient?: string
  progress?: number
  addedAt?: string
}

interface VisionData {
  items: VisionItem[]
}

const FILTERS = ['all', 'body', 'travel', 'business', 'social', 'style', 'content']

export default function VisionPage() {
  const [items, setItems] = useState<VisionItem[]>([])
  const [filter, setFilter] = useState('all')
  const [error, setError] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const r = await fetch('/vision.json?' + Date.now())
        const data: VisionData = await r.json()
        setItems(data.items)
      } catch {
        setError(true)
      }
    }
    load()
  }, [])

  const visible = items.filter((item) => filter === 'all' || item.category === filter)

  return (
    <>
      {/* Background */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(56, 189, 248, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.02) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(52, 211, 153, 0.02) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Title */}
        <div style={{ textAlign: 'center', padding: '32px 40px 0' }}>
          <h1
            style={{
              fontSize: 36,
              fontWeight: 900,
              letterSpacing: 4,
              textTransform: 'uppercase',
              background: 'linear-gradient(135deg, #38bdf8, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Vision Board
          </h1>
        </div>

        {/* Filters */}
        <div
          style={{
            padding: '24px 40px',
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '10px 24px',
                background: filter === f ? '#38bdf8' : 'rgba(56, 189, 248, 0.05)',
                border: filter === f ? '1px solid #38bdf8' : '1px solid rgba(56, 189, 248, 0.1)',
                borderRadius: 24,
                color: filter === f ? '#06080d' : '#94a3b8',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: 1,
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: filter === f ? '0 0 20px rgba(56, 189, 248, 0.3)' : 'none',
                fontFamily: 'inherit',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            Failed to load vision board
          </div>
        )}

        {/* Masonry Board */}
        <div
          style={{
            padding: '20px 40px 60px',
            columnCount: 3,
            columnGap: 24,
          }}
        >
          {visible.map((item, i) => (
            <VisionCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .vision-card {
          break-inside: avoid;
          margin-bottom: 24px;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 1px 8px rgba(0, 0, 0, 0.3);
          cursor: pointer;
          animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) backwards;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s;
        }
        .vision-card:hover {
          transform: rotate(0deg) scale(1.05) translateY(-8px) !important;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 40px rgba(56, 189, 248, 0.2) !important;
          z-index: 10;
        }
        .vision-card:nth-child(3n+1) { transform: rotate(-1.5deg); }
        .vision-card:nth-child(3n+2) { transform: rotate(1deg); }
        .vision-card:nth-child(3n+3) { transform: rotate(-0.8deg); }
        .vision-card:nth-child(5n+1) { transform: rotate(1.2deg); }
        .vision-card:nth-child(7n+1) { transform: rotate(-1.8deg); }
      `}</style>
    </>
  )
}

function VisionCard({ item, index }: { item: VisionItem; index: number }) {
  const delay = Math.min(index * 0.05, 0.6)

  if (item.type === 'image') {
    return (
      <div
        className="vision-card"
        style={{
          animationDelay: `${delay}s`,
          minHeight: item.size === 'tall' ? 400 : 280,
          background: '#fff',
        }}
        onClick={() => item.url && window.open(item.url, '_blank')}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: item.size === 'tall' ? 400 : 280 }}
        />
        {/* Category badge */}
        <div
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            padding: '6px 14px',
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            borderRadius: 16,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            color: '#38bdf8',
            border: '1px solid rgba(56, 189, 248, 0.3)',
          }}
        >
          {item.category}
        </div>
        {/* Overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '32px 20px 20px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 60%, transparent 100%)',
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 6, lineHeight: 1.3 }}>
            {item.title}
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>
            {item.description}
          </div>
        </div>
      </div>
    )
  }

  if (item.type === 'quote') {
    return (
      <div
        className="vision-card"
        style={{
          animationDelay: `${delay}s`,
          minHeight: 300,
        }}
      >
        <div
          style={{
            padding: '48px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            minHeight: 300,
            background: item.gradient || 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              lineHeight: 1.4,
              color: '#fff',
              marginBottom: 20,
              fontStyle: 'italic',
            }}
          >
            &ldquo;{item.text}&rdquo;
          </div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            — {item.author}
          </div>
        </div>
      </div>
    )
  }

  if (item.type === 'goal') {
    const progress = item.progress || 0
    return (
      <div
        className="vision-card"
        style={{
          animationDelay: `${delay}s`,
          minHeight: 320,
          background: '#000',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: 320, filter: 'brightness(0.6)' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 16 }}>
            {item.title}
          </div>
          <div
            style={{
              height: 8,
              background: 'rgba(255,255,255,0.2)',
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #38bdf8, #34d399)',
                borderRadius: 4,
                boxShadow: '0 0 16px rgba(56, 189, 248, 0.5)',
                width: `${progress}%`,
                transition: 'width 2s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  return null
}
