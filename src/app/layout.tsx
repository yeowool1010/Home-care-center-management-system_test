import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '경덕재 체력장 프로그램',
  description: '경덕재 체력장 기록 및 보고서 작성 자동화 서비스',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="kr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
