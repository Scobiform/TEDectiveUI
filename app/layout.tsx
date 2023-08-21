import './globals.css'
import React from 'react';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

// use env variables to set title and description
export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME || 'TEDectiveUI1',
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'TEDective makes European public procurement data explorable for non-experts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          {children}
      </body>
    </html>
  )
}
