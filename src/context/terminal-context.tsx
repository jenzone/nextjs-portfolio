'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export type HeroMode = 'idle' | 'scatter' | 'float' | 'reassemble'

export type Theme = 'default' | 'midnight' | 'obsidian' | 'sunset' | 'forest' | 'hacker'

export interface LogEntry {
  id: number
  timestamp: string
  message: string
}

interface TerminalContextType {
  // Terminal open/close
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  toggleTerminal: () => void

  // Theme
  theme: Theme
  setTheme: (theme: Theme) => void

  // Hero animation
  heroMode: HeroMode
  setHeroMode: (mode: HeroMode) => void

  // Activity log
  activityLog: LogEntry[]
  addLog: (message: string) => void
  clearLog: () => void

  // Console output (terminal CONSOLE tab)
  consoleOutput: string[]
  pushConsole: (line: string) => void
  clearConsole: () => void
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

const TerminalContext = createContext<TerminalContextType | null>(null)

// ─── Theme map (CSS variables) ────────────────────────────────────────────────

export const THEMES: Record<Theme, Record<string, string>> = {
  default: {
    '--primary': '#3f7c85',
    '--primary-light': '#00ccbf',
    '--accent': '#ff5f5d',
    '--foreground': '#f7f7f7',
    '--foreground-muted': '#b2bebf',
    '--background': '#16232e',
    '--background-muted': '#747e7e',
    '--section-bg': '#f7f7f7',
    '--section-text': '#16232e',
  },
  midnight: {
    '--primary': '#1e293b',
    '--primary-light': '#38bdf8',
    '--accent': '#f43f5e',
    '--foreground': '#f8fafc',
    '--foreground-muted': '#64748b',
    '--background': '#030712',
    '--background-muted': '#1e293b',
    '--section-bg': '#080c14',
    '--section-text': '#f8fafc',
  },
  obsidian: {
    '--primary': '#27272a',
    '--primary-light': '#fbbf24',
    '--accent': '#10b981',
    '--foreground': '#f4f4f5',
    '--foreground-muted': '#a1a1aa',
    '--background': '#09090b',
    '--background-muted': '#18181b',
    '--section-bg': '#09090b',
    '--section-text': '#f4f4f5',
  },
  sunset: {
    '--primary': '#ff6b35',
    '--primary-light': '#ffa552',
    '--accent': '#ff1e6b',
    '--foreground': '#fff1e6',
    '--foreground-muted': '#c09080',
    '--background': '#1a0d0a',
    '--background-muted': '#4a2a20',
    '--section-bg': '#fffaf5',
    '--section-text': '#1a0d0a',
  },
  forest: {
    '--primary': '#4caf50',
    '--primary-light': '#81c784',
    '--accent': '#ff8f00',
    '--foreground': '#e8f5e9',
    '--foreground-muted': '#a5d6a7',
    '--background': '#0a1a0c',
    '--background-muted': '#2a4a2e',
    '--section-bg': '#f4f9f4',
    '--section-text': '#0a1a0c',
  },
  hacker: {
    '--primary': '#399c5c',
    '--primary-light': '#55d082',
    '--accent': '#e5a93b',
    '--foreground': '#55d082',
    '--foreground-muted': '#399c5c',
    '--background': '#0a0f0c',
    '--background-muted': '#121b16',
    '--section-bg': '#0a0f0c',
    '--section-text': '#55d082',
  },
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function applyTheme(theme: Theme) {
  const vars = THEMES[theme]
  const root = document.documentElement
  Object.entries(vars).forEach(([key, val]) => root.style.setProperty(key, val))
  root.setAttribute('data-theme', theme)
}

function formatTimestamp(): string {
  const now = new Date()
  const h = String(now.getHours()).padStart(2, '0')
  const m = String(now.getMinutes()).padStart(2, '0')
  const s = String(now.getSeconds()).padStart(2, '0')
  return `${h}:${m}:${s}`
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function TerminalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setThemeState] = useState<Theme>('default')
  const [heroMode, setHeroMode] = useState<HeroMode>('idle')
  const [activityLog, setActivityLog] = useState<LogEntry[]>([
    {
      id: 0,
      timestamp: formatTimestamp(),
      message: '✔ Portfolio session started',
    },
  ])
  const [consoleOutput, setConsoleOutput] = useState<string[]>([])
  const logCounter = useRef(1)

  const toggleTerminal = useCallback(() => setIsOpen((v) => !v), [])

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t)
    applyTheme(t)
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio-theme', t)
    }
  }, [])

  // Restore theme from localStorage on initial mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('portfolio-theme') as Theme | null
      if (stored && THEMES[stored]) {
        setTheme(stored)
      }
    }
  }, [setTheme])

  const addLog = useCallback((message: string) => {
    const entry: LogEntry = {
      id: logCounter.current++,
      timestamp: formatTimestamp(),
      message,
    }
    setActivityLog((prev) => [entry, ...prev].slice(0, 200))
  }, [])

  const clearLog = useCallback(() => {
    setActivityLog([])
    logCounter.current = 0
  }, [])

  const pushConsole = useCallback((line: string) => {
    setConsoleOutput((prev) => [...prev, line])
  }, [])

  const clearConsole = useCallback(() => setConsoleOutput([]), [])

  return (
    <TerminalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        toggleTerminal,
        theme,
        setTheme,
        heroMode,
        setHeroMode,
        activityLog,
        addLog,
        clearLog,
        consoleOutput,
        pushConsole,
        clearConsole,
      }}
    >
      {children}
    </TerminalContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useTerminal(): TerminalContextType {
  const ctx = useContext(TerminalContext)
  if (!ctx)
    throw new Error('useTerminal must be used inside <TerminalProvider>')
  return ctx
}
