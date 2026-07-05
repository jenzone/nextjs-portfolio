'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTerminal } from '@/context/terminal-context'

export default function TerminalTrigger() {
  const { isOpen, toggleTerminal, activityLog } = useTerminal()
  const [pulse, setPulse] = useState(false)
  const [logLen, setLogLen] = useState(0)

  // Pulse when a new log entry arrives (and terminal is closed)
  useEffect(() => {
    if (!isOpen && activityLog.length !== logLen) {
      setLogLen(activityLog.length)
      setPulse(true)
      const t = setTimeout(() => setPulse(false), 1400)
      return () => clearTimeout(t)
    }
  }, [activityLog.length, isOpen, logLen])

  return (
    <motion.button
      onClick={toggleTerminal}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.5, ease: 'easeOut' }}
      title="Open Terminal (Ctrl + `)"
      aria-label="Toggle portfolio terminal"
      className="terminal-trigger fixed bottom-6 right-6 z-[9998] flex h-12 w-12 items-center justify-center rounded-full shadow-2xl transition-transform hover:scale-110 active:scale-95 cursor-pointer"
    >
      {/* Pulse ring when new log entries */}
      <AnimatePresence>
        {pulse && (
          <motion.span
            key="pulse"
            initial={{ opacity: 0.7, scale: 1 }}
            animate={{ opacity: 0, scale: 2.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="terminal-trigger-pulse absolute inset-0 rounded-full"
          />
        )}
      </AnimatePresence>

      {/* Icon */}
      <span className="terminal-trigger-icon select-none font-mono text-sm font-bold tracking-tighter">
        {isOpen ? '✕' : '>_'}
      </span>

      {/* Log count badge */}
      {!isOpen && activityLog.length > 0 && (
        <span className="terminal-trigger-badge absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold">
          {activityLog.length > 99 ? '99+' : activityLog.length}
        </span>
      )}
    </motion.button>
  )
}
