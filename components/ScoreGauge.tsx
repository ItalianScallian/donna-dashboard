'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface ScoreGaugeProps {
  score: number // 0-100
  size?: number
}

function getScoreColor(score: number): string {
  if (score >= 80) return '#10b981' // green
  if (score >= 60) return '#f59e0b' // amber
  return '#ef4444' // red
}

function getScoreLabel(score: number): string {
  if (score >= 90) return 'Excellent'
  if (score >= 80) return 'Great'
  if (score >= 70) return 'Good'
  if (score >= 60) return 'Fair'
  if (score >= 40) return 'Needs Work'
  return 'Poor'
}

export default function ScoreGauge({ score, size = 200 }: ScoreGaugeProps) {
  const clampedScore = Math.max(0, Math.min(100, score))
  const color = getScoreColor(clampedScore)
  const label = getScoreLabel(clampedScore)

  // SVG arc math
  const cx = size / 2
  const cy = size / 2
  const r = (size / 2) * 0.82
  const strokeWidth = size * 0.075

  // 3/4 circle arc (270° sweep, starting from bottom-left)
  const startAngle = 135 // degrees
  const totalSweep = 270
  const sweepAngle = (clampedScore / 100) * totalSweep

  function polarToCartesian(angle: number) {
    const rad = ((angle - 90) * Math.PI) / 180
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    }
  }

  function describeArc(startDeg: number, endDeg: number) {
    const start = polarToCartesian(startDeg)
    const end = polarToCartesian(endDeg)
    const sweep = endDeg - startDeg
    const largeArc = sweep > 180 ? 1 : 0
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`
  }

  const bgPath = describeArc(startAngle, startAngle + totalSweep)
  const fgPath = sweepAngle > 0
    ? describeArc(startAngle, startAngle + sweepAngle)
    : ''

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="overflow-visible">
          {/* Background track */}
          <path
            d={bgPath}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Score arc */}
          {fgPath && (
            <path
              d={fgPath}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              style={{
                filter: `drop-shadow(0 0 8px ${color}80)`,
              }}
            />
          )}
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-black tabular-nums"
            style={{ fontSize: size * 0.22, color, lineHeight: 1 }}
          >
            {Math.round(clampedScore)}
          </span>
          <span className="text-gray-400 font-medium" style={{ fontSize: size * 0.08 }}>
            {label}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between w-full px-4 -mt-2">
        <span className="text-gray-600 text-xs">0</span>
        <span className="text-gray-400 text-sm font-medium">Optimization Score</span>
        <span className="text-gray-600 text-xs">100</span>
      </div>
    </div>
  )
}
