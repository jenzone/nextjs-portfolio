'use client'

import { useCallback } from 'react'
import { useTerminal } from '@/context/terminal-context'

/**
 * Tiny hook that wraps addLog from TerminalContext.
 * Usage: const log = useLog(); log('User clicked Resume')
 */
export function useLog() {
  const { addLog } = useTerminal()
  return useCallback(
    (message: string) => {
      addLog(message)
    },
    [addLog],
  )
}
