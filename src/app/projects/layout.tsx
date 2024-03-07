import Footer from '@/components/navigation/footer'

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
