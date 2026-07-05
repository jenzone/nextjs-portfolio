'use client'

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  useTerminal,
  type Theme,
  type HeroMode,
  THEMES,
} from '@/context/terminal-context'

// ─── Command processor ────────────────────────────────────────────────────────

function processCommand(
  raw: string,
  ctx: {
    setTheme: (t: Theme) => void
    setHeroMode: (m: HeroMode) => void
    clearLog: () => void
    clearConsole: () => void
    addLog: (m: string) => void
  },
): string[] {
  const parts = raw.trim().toLowerCase().split(/\s+/)
  const cmd = parts[0]
  const sub = parts[1]
  const arg = parts[2]

  switch (cmd) {
    case 'help':
      return [
        '┌──────────────────────────────────────────────────┐',
        '│             AVAILABLE COMMANDS                   │',
        '├──────────────────────────────────────────────────┤',
        '│  help                — show this help menu       │',
        '│  whoami              — display info about me     │',
        '│  theme list          — list available themes     │',
        '│  theme set <name>    — apply a theme             │',
        '│  hero scatter        — scatter name letters      │',
        '│  hero float          — float name letters        │',
        '│  hero reset          — snap letters back         │',
        '│  log                 — view activity log         │',
        '│  clear               — clear console output      │',
        '│  clearlog            — clear activity log        │',
        '└──────────────────────────────────────────────────┘',
      ]

    case 'whoami':
      return [
        '',
        '  ██╗███████╗███╗   ██╗███████╗ ██████╗ ███╗   ██╗',
        '  ██║██╔════╝████╗  ██║██╔════╝██╔═══██╗████╗  ██║',
        '  ██║█████╗  ██╔██╗ ██║███████╗██║   ██║██╔██╗ ██║',
        '  ██║██╔══╝  ██║╚██╗██║╚════██║██║   ██║██║╚██╗██║',
        '  ██║███████╗██║ ╚████║███████║╚██████╔╝██║ ╚████║',
        '  ╚═╝╚══════╝╚═╝  ╚═══╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝',
        '',
        '  > Name     : Jenson Caparida',
        '  > Role     : Software Engineer · UX/UI Designer',
        '  > Location : Philippines 🇵🇭',
        '  > Stack    : TypeScript · React · Next.js · Python',
        '  > Status   : Open to opportunities ✅',
        '',
      ]

    case 'theme':
      if (sub === 'list') {
        const themeNames = Object.keys(THEMES) as Theme[]
        return [
          'Available themes:',
          ...themeNames.map((t) => `  • ${t}`),
          '',
          'Usage: theme set <name>',
        ]
      }
      if (sub === 'set' && arg) {
        const valid = Object.keys(THEMES) as Theme[]
        if (valid.includes(arg as Theme)) {
          ctx.setTheme(arg as Theme)
          ctx.addLog(`🎨 Theme changed to: ${arg}`)
          return [`✔ Theme applied: ${arg}`]
        }
        return [
          `✘ Unknown theme: "${arg}"`,
          'Run "theme list" to see available themes.',
        ]
      }
      return ['Usage: theme list  |  theme set <name>']

    case 'hero':
      if (sub === 'scatter') {
        ctx.setHeroMode('scatter')
        ctx.addLog('💥 Hero scatter triggered')
        return ['✔ Hero letters scattered — scroll up to see the effect!']
      }
      if (sub === 'float') {
        ctx.setHeroMode('float')
        ctx.addLog('🌊 Hero float triggered')
        return ['✔ Hero letters floating — scroll up to see the effect!']
      }
      if (sub === 'reset' || sub === 'reassemble') {
        ctx.setHeroMode('reassemble')
        ctx.addLog('🔁 Hero letters reassembled')
        setTimeout(() => ctx.setHeroMode('idle'), 1200)
        return ['✔ Hero letters snapping back into place!']
      }
      return ['Usage: hero scatter  |  hero float  |  hero reset']

    case 'clear':
      ctx.clearConsole()
      return []

    case 'clearlog':
      ctx.clearLog()
      return ['✔ Activity log cleared.']

    case 'log':
      return ['Switch to the [ACTIVITY LOG] tab to view the live log.']

    case '':
      return []

    default:
      return [
        `✘ Command not found: "${raw}"`,
        '  Type "help" to see available commands.',
      ]
  }
}

// ─── Terminal Component ────────────────────────────────────────────────────────

export default function Terminal() {
  const {
    isOpen,
    setIsOpen,
    toggleTerminal,
    theme,
    setTheme,
    setHeroMode,
    activityLog,
    addLog,
    clearLog,
    consoleOutput,
    pushConsole,
    clearConsole,
  } = useTerminal()

  const [tab, setTab] = useState<'console' | 'log'>('console')
  const [inputValue, setInputValue] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [booted, setBooted] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const consoleEndRef = useRef<HTMLDivElement>(null)
  const logEndRef = useRef<HTMLDivElement>(null)

  // Draggable state
  const [pos, setPos] = useState({ x: -1, y: -1 }) // -1 = not yet initialized
  const dragging = useRef(false)
  const dragOffset = useRef({ x: 0, y: 0 })
  const panelRef = useRef<HTMLDivElement>(null)

  // Initialize position to center of screen on first open
  useEffect(() => {
    if (isOpen && pos.x === -1) {
      const w = window.innerWidth
      const h = window.innerHeight
      const panelW = Math.min(640, w - 32)
      const panelH = Math.min(460, h - 32)
      setPos({
        x: Math.round((w - panelW) / 2),
        y: Math.round((h - panelH) / 2),
      })
    }
  }, [isOpen, pos.x])

  // Boot sequence
  useEffect(() => {
    if (isOpen && !booted) {
      const lines = [
        '┌─────────────────────────────────────────────────┐',
        '│         Jenson Caparida — Portfolio Terminal    │',
        '│                  v1.0.0 🚀                      │',
        '└─────────────────────────────────────────────────┘',
        '',
        '  Initializing session...',
        '  [OK] Theme engine loaded',
        '  [OK] Activity logger connected',
        '  [OK] Hero animation controller ready',
        '',
        '  Type "help" to see available commands.',
        '',
      ]
      let i = 0
      const interval = setInterval(() => {
        if (i < lines.length) {
          pushConsole(lines[i])
          i++
        } else {
          clearInterval(interval)
          setBooted(true)
        }
      }, 60)
      return () => clearInterval(interval)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  // Keyboard shortcut: Ctrl+` or Ctrl+~
  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault()
        toggleTerminal()
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, setIsOpen])

  // Auto-scroll console
  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [consoleOutput])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Dragging
  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      dragging.current = true
      dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y }
    },
    [pos],
  )

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return
      setPos({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      })
    }
    const onUp = () => {
      dragging.current = false
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  // Submit command
  const handleSubmit = useCallback(() => {
    const raw = inputValue.trim()
    setInputValue('')
    setHistoryIndex(-1)

    if (raw) {
      setHistory((prev) => [raw, ...prev].slice(0, 50))
      pushConsole(`$ ${raw}`)
    }

    const output = processCommand(raw, {
      setTheme,
      setHeroMode,
      clearLog,
      clearConsole,
      addLog,
    })
    output.forEach((line) => pushConsole(line))
  }, [inputValue, addLog, clearConsole, clearLog, pushConsole, setTheme, setHeroMode])

  // Key handling for input
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSubmit()
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        const next = Math.min(historyIndex + 1, history.length - 1)
        setHistoryIndex(next)
        setInputValue(history[next] ?? '')
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        const next = Math.max(historyIndex - 1, -1)
        setHistoryIndex(next)
        setInputValue(next === -1 ? '' : (history[next] ?? ''))
      }
    },
    [handleSubmit, history, historyIndex],
  )

  if (pos.x === -1 && isOpen) return null // wait for position init

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          key="terminal"
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            left: pos.x,
            top: pos.y,
            zIndex: 9999,
            width: 'min(640px, calc(100vw - 32px))',
            height: 'min(460px, calc(100vh - 32px))',
            userSelect: dragging.current ? 'none' : 'auto',
          }}
          className="terminal-panel flex flex-col overflow-hidden rounded-xl border border-white/10 shadow-2xl backdrop-blur-xl"
        >
          {/* ── Title Bar ── */}
          <div
            onMouseDown={onMouseDown}
            className="terminal-titlebar flex cursor-grab items-center justify-between px-4 py-2.5 active:cursor-grabbing"
          >
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-xs font-bold text-(--primary-light) animate-pulse select-none">
                &gt;_
              </span>
            </div>
            <span className="terminal-title select-none text-xs font-semibold tracking-widest uppercase opacity-70">
              portfolio — terminal
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="terminal-close-btn rounded px-1.5 py-0.5 text-xs opacity-60 transition-opacity hover:opacity-100"
              aria-label="Close terminal"
            >
              ESC
            </button>
          </div>

          {/* ── Tab Bar ── */}
          <div className="terminal-tabbar flex items-center gap-1 px-3 pb-1">
            {(['console', 'log'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`terminal-tab px-3 py-1 text-xs font-mono uppercase tracking-wider transition-all ${
                  tab === t ? 'terminal-tab-active' : 'terminal-tab-inactive'
                }`}
              >
                [{t === 'console' ? 'CONSOLE' : 'ACTIVITY LOG'}]
              </button>
            ))}
            {/* Theme badge */}
            <span className="terminal-theme-badge ml-auto rounded px-2 py-0.5 font-mono text-xs uppercase opacity-60">
              theme:{theme}
            </span>
          </div>

          {/* ── Console Tab ── */}
          {tab === 'console' && (
            <div
              onClick={() => inputRef.current?.focus()}
              className="terminal-output scrollbar flex flex-1 flex-col overflow-y-auto p-3 font-mono text-xs leading-relaxed"
            >
              {consoleOutput.map((line, i) => (
                <pre key={i} className="terminal-line whitespace-pre-wrap break-all">
                  {line}
                </pre>
              ))}
              <div ref={consoleEndRef} />
            </div>
          )}

          {/* ── Activity Log Tab ── */}
          {tab === 'log' && (
            <div className="terminal-output scrollbar flex flex-1 flex-col-reverse overflow-y-auto p-3 font-mono text-xs leading-relaxed">
              {activityLog.map((entry) => (
                <div key={entry.id} className="terminal-log-entry flex gap-3 py-0.5">
                  <span className="terminal-timestamp shrink-0 opacity-40">
                    {entry.timestamp}
                  </span>
                  <span className="terminal-log-msg">{entry.message}</span>
                </div>
              ))}
              <div ref={logEndRef} />
            </div>
          )}

          {/* ── Input ── */}
          {tab === 'console' && (
            <div className="terminal-input-row flex items-center gap-2 border-t border-white/10 px-3 py-2">
              <span className="terminal-prompt select-none font-mono text-xs">
                $
              </span>
              <input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="terminal-input flex-1 bg-transparent font-mono text-xs outline-none"
                placeholder="type a command... (help to start)"
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
