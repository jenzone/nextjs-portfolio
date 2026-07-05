import type { Metadata } from 'next'
import { Overpass } from 'next/font/google'
import './globals.css'

import { ToastProvider } from '@/providers/toast-provider'
import { TerminalProvider, THEMES } from '@/context/terminal-context'
import Terminal from '@/components/terminal/terminal'
import TerminalTrigger from '@/components/terminal/terminal-trigger'

const font = Overpass({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | Jenson Caparida',
    default: 'Jenson Caparida',
  },
  description: 'An experienced Software Engineer from the Philippines.',
  keywords: [
    'jenson caparida',
    'jenzone',
    'portfolio',
    'software engineer',
    'software developer',
    'software development',
  ],
  metadataBase: new URL('https://jensoncaparida.com'),
  openGraph: {
    title: 'Jenson Caparida',
    description: 'An experienced Software Engineer from the Philippines.',
    type: 'website',
    url: 'https://jensoncaparida.com',
    images: ['/meta-card.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jenson Caparida',
    description: 'An experienced Software Engineer from the Philippines.',
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('portfolio-theme') || 'default';
                  var themes = ${JSON.stringify(THEMES)};
                  var vars = themes[theme] || themes['default'];
                  var root = document.documentElement;
                  Object.entries(vars).forEach(function(entry) {
                    root.style.setProperty(entry[0], entry[1]);
                  });
                  root.setAttribute('data-theme', theme);
                } catch (e) {}
              })()
            `
          }}
        />
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
        <TerminalProvider>
          <ToastProvider />
          
          {/* Ambient Backdrop Glowing Auroras (Centers of glows placed exactly on window corners) */}
          <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            {/* Top-Left corner glow */}
            <div
              className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-[45vw] max-w-[480px] h-[45vw] max-h-[480px] rounded-full opacity-[0.14] blur-[130px]"
              style={{
                backgroundColor: 'var(--primary-light)',
                transition: 'background-color 500ms ease'
              }}
            />
            {/* Bottom-Right corner glow */}
            <div
              className="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 w-[45vw] max-w-[480px] h-[45vw] max-h-[480px] rounded-full opacity-[0.14] blur-[130px]"
              style={{
                backgroundColor: 'var(--accent)',
                transition: 'background-color 500ms ease'
              }}
            />
          </div>

          {children}
          <Terminal />
          <TerminalTrigger />
        </TerminalProvider>
      </body>
    </html>
  )
}
