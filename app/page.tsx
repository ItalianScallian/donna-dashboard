'use client'

import { useEffect, useState, useCallback } from 'react'

// ─── Types ──────────────────────────────────────────────────────────────────
interface Goal {
  name: string
  type: 'progress' | 'milestone'
  current?: number
  target?: number
  unit?: string
  milestones?: { name: string; completed: boolean }[]
}

interface Asset {
  symbol: string
  price: number
  change: number
}

interface Portfolio {
  total: number
  stocks: Asset[]
  crypto: Asset[]
}

interface ContentStats {
  followers: number
  engagement: number
  streak: number
}

interface PersonEntry {
  name: string
  tier?: string
  daysSince?: number
  cadence?: string
  lastContact?: string
}

interface BirthdayEntry {
  name: string
  date: string
  daysUntil?: number
}

interface People {
  overdue?: PersonEntry[]
  birthdays?: BirthdayEntry[]
}

interface AccountabilityItem {
  id: string
  label: string
}

interface CronJob {
  name: string
  status: string
  lastRun: string
  nextRun: string
}

interface EdgeItem {
  title: string
  description: string
  urgency?: string
}

interface Tweet {
  author: string
  text: string
  likes?: number
  retweets?: number
  url?: string
}

interface SystemInfo {
  uptime: string
  diskUsage: string
  memoryUsage: string
  openclawVersion: string
}

interface DashboardData {
  goals: Goal[]
  portfolio: Portfolio
  contentStats: ContentStats
  people: People
  accountability: AccountabilityItem[]
  cronHealth: CronJob[]
  edgeFinder?: EdgeItem[]
  twitterPulse?: Tweet[]
  system: SystemInfo
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const fmt = (n: number | null | undefined) =>
  n != null && n !== 0
    ? '$' + Number(n).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })
    : '—'

const fmtPct = (n: number | null | undefined) =>
  n != null ? (n >= 0 ? '+' : '') + n.toFixed(1) + '%' : ''

const fmtPrice = (n: number | null | undefined) =>
  n != null && n !== 0
    ? '$' +
      Number(n).toLocaleString(undefined, {
        minimumFractionDigits: n >= 100 ? 0 : 2,
        maximumFractionDigits: n >= 100 ? 0 : 2,
      })
    : '—'

// ─── Shared card styles ──────────────────────────────────────────────────────
const cardStyle: React.CSSProperties = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: 12,
  overflow: 'hidden',
}

const cardHeaderStyle: React.CSSProperties = {
  padding: '16px 20px',
  borderBottom: '1px solid var(--border)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

const cardTitleStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: 1.5,
  textTransform: 'uppercase',
  color: 'var(--text-secondary)',
}

const cardBadgeStyle: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 11,
  padding: '3px 10px',
  borderRadius: 6,
  background: 'var(--accent-glow)',
  color: 'var(--accent)',
}

const mono: React.CSSProperties = { fontFamily: "'JetBrains Mono', 'Courier New', monospace" }

// ─── Sub-components ──────────────────────────────────────────────────────────

function MetricsRow({ data, checkState }: { data: DashboardData; checkState: Record<string, boolean> }) {
  const goalsDone = data.goals.filter((g) => {
    if (g.type === 'progress') return (g.current ?? 0) >= (g.target ?? 1)
    if (g.type === 'milestone') return g.milestones?.every((m) => m.completed)
    return false
  }).length
  const checksTotal = data.accountability.length
  const checksDone = data.accountability.filter((a) => checkState[a.id]).length

  const metrics = [
    { label: 'Portfolio', value: fmt(data.portfolio.total), sub: null },
    { label: 'Goals Progress', value: `${goalsDone}/${data.goals.length}`, sub: 'completed' },
    { label: 'Content Streak', value: String(data.contentStats.streak), sub: 'days' },
    { label: 'Followers', value: data.contentStats.followers.toLocaleString(), sub: null },
    {
      label: "Today's Score",
      value: `${checksDone}/${checksTotal}`,
      sub: checksDone === checksTotal && checksTotal > 0 ? 'perfect day' : '',
    },
  ]

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 16,
        marginBottom: 24,
      }}
    >
      {metrics.map((m) => (
        <div key={m.label} style={cardStyle}>
          <div style={{ padding: 20 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: 1.5,
                marginBottom: 8,
              }}
            >
              {m.label}
            </div>
            <div style={{ ...mono, fontSize: 28, fontWeight: 600, color: 'var(--text-primary)' }}>
              {m.value}
            </div>
            {m.sub && (
              <div style={{ ...mono, fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                {m.sub}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function GoalsCard({ goals }: { goals: Goal[] }) {
  return (
    <div style={{ ...cardStyle, gridColumn: 'span 2' }}>
      <div style={cardHeaderStyle}>
        <span style={cardTitleStyle}>Goals</span>
        <span style={cardBadgeStyle}>{goals.length} active</span>
      </div>
      <div style={{ padding: '16px 20px' }}>
        {goals.map((g, i) => {
          if (g.type === 'progress') {
            const pct = Math.min(((g.current ?? 0) / (g.target || 1)) * 100, 100)
            return (
              <div key={i} style={{ marginBottom: i < goals.length - 1 ? 16 : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>{g.name}</span>
                  <span style={{ ...mono, fontSize: 13, color: 'var(--accent)' }}>
                    {g.current} / {g.target} {g.unit}
                  </span>
                </div>
                <div style={{ height: 6, background: 'var(--bg-elevated)', borderRadius: 3, overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      borderRadius: 3,
                      width: `${pct}%`,
                      background: 'linear-gradient(90deg, var(--accent), var(--green))',
                      boxShadow: '0 0 8px var(--accent-glow)',
                      transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  />
                </div>
              </div>
            )
          } else {
            return (
              <div key={i} style={{ marginBottom: i < goals.length - 1 ? 16 : 0 }}>
                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>{g.name}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {g.milestones?.map((m, mi) => (
                    <span
                      key={mi}
                      style={{
                        ...mono,
                        fontSize: 11,
                        padding: '4px 10px',
                        borderRadius: 6,
                        background: m.completed ? 'var(--green-dim)' : 'var(--bg-elevated)',
                        color: m.completed ? 'var(--green)' : 'var(--text-muted)',
                        border: m.completed ? '1px solid rgba(52, 211, 153, 0.2)' : '1px solid transparent',
                      }}
                    >
                      {m.completed ? '✓ ' : ''}{m.name}
                    </span>
                  ))}
                </div>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

function AccountabilityCard({
  items,
  checkState,
  onToggle,
}: {
  items: AccountabilityItem[]
  checkState: Record<string, boolean>
  onToggle: (id: string) => void
}) {
  const done = items.filter((a) => checkState[a.id]).length
  const pct = items.length > 0 ? Math.round((done / items.length) * 100) : 0

  return (
    <div style={cardStyle}>
      <div style={cardHeaderStyle}>
        <span style={cardTitleStyle}>Daily Check-in</span>
      </div>
      <div style={{ padding: '16px 20px' }}>
        {items.map((a) => (
          <div
            key={a.id}
            onClick={() => onToggle(a.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: 12,
              background: 'var(--bg-elevated)',
              borderRadius: 8,
              marginBottom: 6,
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                border: checkState[a.id] ? 'none' : '2px solid var(--text-muted)',
                background: checkState[a.id] ? 'var(--green)' : 'transparent',
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.2s',
              }}
            >
              {checkState[a.id] && (
                <span style={{ color: 'var(--bg-primary)', fontSize: 12, fontWeight: 700 }}>✓</span>
              )}
            </div>
            <span
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: checkState[a.id] ? 'var(--text-muted)' : 'var(--text-primary)',
                textDecoration: checkState[a.id] ? 'line-through' : 'none',
              }}
            >
              {a.label}
            </span>
          </div>
        ))}
        <div style={{ ...mono, textAlign: 'center', fontSize: 24, fontWeight: 600, color: 'var(--accent)', marginTop: 12 }}>
          {pct}%
        </div>
        <div
          style={{
            textAlign: 'center',
            fontSize: 11,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          daily score
        </div>
      </div>
    </div>
  )
}

function PortfolioCard({ portfolio }: { portfolio: Portfolio }) {
  return (
    <div style={{ ...cardStyle, gridColumn: 'span 2' }}>
      <div style={cardHeaderStyle}>
        <span style={cardTitleStyle}>Portfolio</span>
      </div>
      <div style={{ padding: '16px 20px' }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: 8,
            paddingBottom: 6,
            borderBottom: '1px solid var(--border)',
          }}
        >
          Stocks
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: 8, marginBottom: 16 }}>
          {portfolio.stocks.map((a) => (
            <div
              key={a.symbol}
              style={{
                background: 'var(--bg-elevated)',
                borderRadius: 8,
                padding: 12,
                textAlign: 'center',
              }}
            >
              <div style={{ ...mono, fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>
                {a.symbol}
              </div>
              <div style={{ ...mono, fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 2 }}>
                {fmtPrice(a.price)}
              </div>
              <div style={{ ...mono, fontSize: 11, fontWeight: 500, color: a.change >= 0 ? 'var(--green)' : 'var(--red)' }}>
                {fmtPct(a.change)}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: 8,
            paddingBottom: 6,
            borderBottom: '1px solid var(--border)',
          }}
        >
          Crypto
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: 8 }}>
          {portfolio.crypto.map((a) => (
            <div
              key={a.symbol}
              style={{
                background: 'var(--bg-elevated)',
                borderRadius: 8,
                padding: 12,
                textAlign: 'center',
              }}
            >
              <div style={{ ...mono, fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>
                {a.symbol}
              </div>
              <div style={{ ...mono, fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 2 }}>
                {fmtPrice(a.price)}
              </div>
              <div style={{ ...mono, fontSize: 11, fontWeight: 500, color: a.change >= 0 ? 'var(--green)' : 'var(--red)' }}>
                {fmtPct(a.change)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PeopleCard({ people }: { people: People }) {
  const hasContent = (people.overdue?.length ?? 0) > 0 || (people.birthdays?.length ?? 0) > 0
  return (
    <div style={cardStyle}>
      <div style={cardHeaderStyle}>
        <span style={cardTitleStyle}>People</span>
      </div>
      <div style={{ padding: '16px 20px' }}>
        {!hasContent && (
          <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)', fontSize: 13 }}>
            All caught up
          </div>
        )}
        {(people.overdue?.length ?? 0) > 0 && (
          <>
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: 'var(--red)',
                marginBottom: 8,
                paddingBottom: 6,
                borderBottom: '1px solid var(--border)',
              }}
            >
              Overdue
            </div>
            {people.overdue!.map((x, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 12px',
                  background: 'var(--bg-elevated)',
                  borderRadius: 8,
                  marginBottom: 6,
                  borderLeft: '3px solid var(--red)',
                }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{x.name}</div>
                  <div style={{ ...mono, fontSize: 11, color: 'var(--text-muted)' }}>{x.cadence}</div>
                </div>
                <div style={{ ...mono, fontSize: 11, color: 'var(--text-muted)' }}>{x.lastContact || 'never'}</div>
              </div>
            ))}
          </>
        )}
        {(people.birthdays?.length ?? 0) > 0 && (
          <>
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: 'var(--amber)',
                marginTop: 12,
                marginBottom: 8,
                paddingBottom: 6,
                borderBottom: '1px solid var(--border)',
              }}
            >
              Birthdays
            </div>
            {people.birthdays!.map((x, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 12px',
                  background: 'var(--bg-elevated)',
                  borderRadius: 8,
                  marginBottom: 6,
                  borderLeft: '3px solid var(--amber)',
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{x.name}</div>
                <div style={{ ...mono, fontSize: 11, color: 'var(--text-muted)' }}>{x.date}</div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

function CronCard({ crons }: { crons: CronJob[] }) {
  return (
    <div style={{ ...cardStyle, gridColumn: '1 / -1' }}>
      <div style={cardHeaderStyle}>
        <span style={cardTitleStyle}>Automation Health</span>
      </div>
      <div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Job', 'Status', 'Last Run', 'Next Run'].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: 'left',
                    padding: '10px 12px',
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {crons.map((c, i) => (
              <tr key={i}>
                <td style={{ ...mono, padding: '10px 12px', fontSize: 12, color: 'var(--text-primary)', borderBottom: '1px solid var(--border)' }}>
                  {c.name}
                </td>
                <td style={{ ...mono, padding: '10px 12px', fontSize: 12, borderBottom: '1px solid var(--border)' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '2px 10px',
                      borderRadius: 10,
                      fontSize: 11,
                      fontWeight: 600,
                      background: c.status === 'OK' ? 'var(--green-dim)' : 'var(--red-dim)',
                      color: c.status === 'OK' ? 'var(--green)' : 'var(--red)',
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: c.status === 'OK' ? 'var(--green)' : 'var(--red)',
                      }}
                    />
                    {c.status}
                  </span>
                </td>
                <td style={{ ...mono, padding: '10px 12px', fontSize: 12, color: 'var(--text-secondary)', borderBottom: '1px solid var(--border)' }}>
                  {c.lastRun}
                </td>
                <td style={{ ...mono, padding: '10px 12px', fontSize: 12, color: 'var(--text-secondary)', borderBottom: '1px solid var(--border)' }}>
                  {c.nextRun}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function EdgesCard({ edges }: { edges?: EdgeItem[] }) {
  return (
    <div style={cardStyle}>
      <div style={cardHeaderStyle}>
        <span style={cardTitleStyle}>Edge Finder</span>
        <span style={cardBadgeStyle}>opportunities</span>
      </div>
      <div style={{ padding: '16px 20px' }}>
        {!edges?.length ? (
          <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)', fontSize: 13 }}>
            Scanning...
          </div>
        ) : (
          edges.map((e, i) => (
            <div
              key={i}
              style={{
                padding: 14,
                background: 'var(--bg-elevated)',
                borderRadius: 8,
                marginBottom: 8,
                borderLeft: '3px solid var(--amber)',
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
                {e.title}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 6 }}>
                {e.description}
              </div>
              {e.urgency && (
                <div style={{ ...mono, fontSize: 11, color: 'var(--amber)' }}>{e.urgency}</div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function TweetsCard({ tweets }: { tweets?: Tweet[] }) {
  return (
    <div style={{ ...cardStyle, gridColumn: 'span 2' }}>
      <div style={cardHeaderStyle}>
        <span style={cardTitleStyle}>Twitter Pulse</span>
      </div>
      <div style={{ padding: '16px 20px' }}>
        {!tweets?.length ? (
          <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)', fontSize: 13 }}>
            Next scan loading...
          </div>
        ) : (
          tweets.map((t, i) => (
            <div
              key={i}
              style={{
                padding: 14,
                background: 'var(--bg-elevated)',
                borderRadius: 8,
                marginBottom: 8,
                borderLeft: '3px solid var(--accent)',
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
                @{t.author}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 6 }}>
                {t.text}
              </div>
              <div style={{ display: 'flex', gap: 12, ...mono, fontSize: 11, color: 'var(--text-muted)' }}>
                <span>♥ {(t.likes ?? 0).toLocaleString()}</span>
                <span>↻ {(t.retweets ?? 0).toLocaleString()}</span>
                {t.url && (
                  <a href={t.url} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
                    open →
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function SystemCard({ system }: { system: SystemInfo }) {
  const items = [
    { value: system.uptime, label: 'Uptime' },
    { value: system.diskUsage, label: 'Disk' },
    { value: system.memoryUsage, label: 'Memory' },
    { value: system.openclawVersion, label: 'OpenClaw' },
  ]
  return (
    <div style={{ ...cardStyle, gridColumn: '1 / -1' }}>
      <div style={cardHeaderStyle}>
        <span style={cardTitleStyle}>System</span>
      </div>
      <div style={{ padding: '16px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {items.map((item) => (
            <div
              key={item.label}
              style={{ textAlign: 'center', padding: 16, background: 'var(--bg-elevated)', borderRadius: 8 }}
            >
              <div style={{ ...mono, fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
                {item.value}
              </div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [checkState, setCheckState] = useState<Record<string, boolean>>({})

  // Load checklist from localStorage (persisted per day)
  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem('donna_checks') || '{}')
      if (s.d === new Date().toDateString()) {
        setCheckState(s.v || {})
      }
    } catch {
      // ignore
    }
  }, [])

  const saveChecks = useCallback((state: Record<string, boolean>) => {
    localStorage.setItem('donna_checks', JSON.stringify({ d: new Date().toDateString(), v: state }))
  }, [])

  const handleToggle = useCallback(
    (id: string) => {
      setCheckState((prev) => {
        const next = { ...prev, [id]: !prev[id] }
        saveChecks(next)
        return next
      })
    },
    [saveChecks]
  )

  // Load dashboard data
  const loadData = useCallback(async () => {
    try {
      const r = await fetch('/data.json?' + Date.now())
      const d: DashboardData = await r.json()
      setData(d)
    } catch (e) {
      console.error('Failed to load dashboard data', e)
    }
  }, [])

  useEffect(() => {
    loadData()
    const id = setInterval(loadData, 60000)
    return () => clearInterval(id)
  }, [loadData])

  if (!data) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '80vh',
          color: 'var(--text-muted)',
          ...mono,
        }}
      >
        Loading...
      </div>
    )
  }

  return (
    <>
      {/* Subtle grid background */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(56, 189, 248, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, padding: '24px 32px' }}>
        {/* Metrics Row */}
        <MetricsRow data={data} checkState={checkState} />

        {/* Main Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 340px',
            gap: 16,
          }}
        >
          <GoalsCard goals={data.goals} />
          <AccountabilityCard items={data.accountability} checkState={checkState} onToggle={handleToggle} />
          <PortfolioCard portfolio={data.portfolio} />
          <PeopleCard people={data.people} />
          <CronCard crons={data.cronHealth} />
          <EdgesCard edges={data.edgeFinder} />
          <TweetsCard tweets={data.twitterPulse} />
          <SystemCard system={data.system} />
        </div>
      </div>
    </>
  )
}
