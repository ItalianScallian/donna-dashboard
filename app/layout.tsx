import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Point Scorer — Credit Card Rewards Optimizer',
  description: 'Find out how much money you left on the table by using the wrong credit card.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-gray-950 text-gray-100">
        {children}
      </body>
    </html>
  )
}
