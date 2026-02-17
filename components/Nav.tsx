'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Nav() {
  const pathname = usePathname()
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString('en-GB', {
          timeZone: 'Europe/Madrid',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      )
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const links = [
    { href: '/', label: 'Dashboard' },
    { href: '/vision', label: 'Vision Board' },
    { href: '/point-scorer', label: 'Point Scorer' },
  ]

  return (
    <header
      style={{
        padding: '20px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(12px)',
        background: 'rgba(6, 8, 13, 0.8)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{
            width: 36,
            height: 36,
            background: 'linear-gradient(135deg, var(--accent), var(--green))',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: 18,
            color: 'var(--bg-primary)',
            boxShadow: '0 0 20px var(--accent-glow)',
          }}
        >
          D
        </div>
        <div>
          <div
            style={{
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: 'var(--text-primary)',
            }}
          >
            Donna Command Center
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: 1, marginTop: 2 }}>
            Romeo Scagliarini — Life Operating System
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav
        style={{
          display: 'flex',
          gap: 4,
          background: 'var(--bg-elevated)',
          borderRadius: 8,
          padding: 3,
        }}
      >
        {links.map((link) => {
          const active = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: 12,
                fontWeight: 500,
                padding: '6px 14px',
                borderRadius: 6,
                color: active ? 'var(--accent)' : 'var(--text-muted)',
                background: active ? 'var(--accent-glow)' : 'transparent',
                textDecoration: 'none',
                transition: 'all 0.2s',
                letterSpacing: 0.5,
              }}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontSize: 20,
            fontWeight: 500,
            color: 'var(--accent)',
            letterSpacing: 2,
          }}
        >
          {time || '--:--:--'}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 14px',
            background: 'var(--green-dim)',
            border: '1px solid rgba(52, 211, 153, 0.2)',
            borderRadius: 20,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: 1,
            textTransform: 'uppercase',
            color: 'var(--green)',
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--green)',
              boxShadow: '0 0 8px var(--green)',
              animation: 'pulse 2s infinite',
            }}
          />
          Online
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px var(--green); }
          50% { opacity: 0.5; box-shadow: 0 0 4px var(--green); }
        }
      `}</style>
    </header>
  )
}
