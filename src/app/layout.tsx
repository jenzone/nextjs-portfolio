import type { Metadata } from 'next'
import { Overpass } from 'next/font/google'
import './globals.css'

import { ToastProvider } from '@/providers/toast-provider'

const font = Overpass({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | Jenson Caparida',
    default: 'Jenson Caparida',
  },
  description: 'An aspiring Software Developer from Philippines.',
  keywords: ['jenson caparida', 'jenzone', 'portfolio', 'software development'],
  metadataBase: new URL('https://jensoncaparida.me'),
  openGraph: {
    title: 'Jenson Caparida',
    description: 'An aspiring Software Developer from Philippines.',
    type: 'website',
    url: 'https://jensoncaparida.me',
    images: ['/meta-card.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jenson Caparida',
    description: 'An aspiring Software Developer from Philippines.',
    images: ['/meta-card.png'],
  },
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
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicons/site.webmanifest" />
      </head>
      <body className={font.className}>
        <ToastProvider />
        {children}
      </body>
    </html>
  )
}
