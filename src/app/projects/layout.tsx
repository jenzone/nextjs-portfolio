import type { Metadata } from 'next'

import Footer from '@/components/navigation/footer'

export const metadata: Metadata = {
  title: 'Projects',
}

export default function ProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  )
}
