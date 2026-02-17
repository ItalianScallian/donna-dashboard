import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DONNA — Command Center',
  description: 'Romeo Scagliarini — Life Operating System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  )
}
