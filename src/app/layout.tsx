import type { Metadata } from 'next'
import { Ubuntu } from 'next/font/google'
import './globals.css'

const font = Ubuntu({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
})

export const metadata: Metadata = {
  title: 'Jenson Caparida',
  description: 'Portfolio of Jenson Caparida',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
