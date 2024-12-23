'use client'

import { useEffect, useState } from 'react'

import Loading from './loading'
import { motion } from 'framer-motion'

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {loading ? <Loading /> : children}
    </motion.div>
  )
}
