import type { Metadata } from 'next'
import { Ubuntu } from 'next/font/google'
import './globals.css'

import { ToastProvider } from '@/providers/toast-provider'

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
      <head>
        <link
          rel="icon"
          href="/logo-filled.svg"
          type="image/svg+xml"
          sizes="any"
        />
      </head>
      <body className={font.className}>
        <ToastProvider />
        {children}
      </body>
    </html>
  )
}
