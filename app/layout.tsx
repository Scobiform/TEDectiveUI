import './globals.css'
import React from 'react';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TEDectiveUI',
  description: 'TEDective makes European public procurement data explorable for non-experts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
          {children}
      </body>
    </html>
  )
}
