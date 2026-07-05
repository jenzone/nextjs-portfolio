'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTerminal, type Theme } from '@/context/terminal-context'

interface ThemeItem {
  value: Theme
  label: string
  icon: string
  color: string
}

const THEME_CYCLE: ThemeItem[] = [
  { value: 'default',   label: 'Ocean',     icon: '🌊', color: '#00ccbf' },
  { value: 'midnight',  label: 'Midnight',  icon: '🌌', color: '#38bdf8' },
  { value: 'obsidian',  label: 'Obsidian',  icon: '🌑', color: '#fbbf24' },
  { value: 'sunset',    label: 'Sunset',    icon: '🌅', color: '#ff5f5d' },
  { value: 'forest',    label: 'Forest',    icon: '🌿', color: '#90a955' },
  { value: 'hacker',    label: 'Hacker',    icon: '📟', color: '#00ff66' },
]

interface Slot {
  x: number
  y: number
  themeValue: Theme
}

interface Spark {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  size: number
  alpha: number
  decay: number
}

export default function ThemeFloatingSelector() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme, setTheme, addLog } = useTerminal()
  
  const sparksRef = useRef<Spark[]>([])
  const prevThemeRef = useRef<Theme>(theme)
  
  // Slots state tracking position coordinates and currently assigned theme
  const [slots, setSlots] = useState<Slot[]>([])

  // Initialize the 5 slots once on mount with pre-calculated, non-overlapping organic positions
  useEffect(() => {
    const initialAlternativeThemes = THEME_CYCLE.filter((t) => t.value !== theme)

    // Pre-defined coordinates within the 310x290 box that are guaranteed to look natural and never overlap
    const PRESET_COORDS = [
      { x: 15,  y: 35 },  // Slot 1: Top Left
      { x: 180, y: 15 },  // Slot 2: Top Right
      { x: 195, y: 145 }, // Slot 3: Bottom Right
      { x: 15,  y: 165 }, // Slot 4: Bottom Left
      { x: 105, y: 95 },  // Slot 5: Center-ish Offset
    ]

    const initialSlots = initialAlternativeThemes.map((themeItem, index) => {
      const coord = PRESET_COORDS[index] || { x: 50, y: 50 }
      return {
        x: coord.x,
        y: coord.y,
        themeValue: themeItem.value
      }
    })

    setSlots(initialSlots)
    prevThemeRef.current = theme
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Sync theme changes (both click events & external terminal commands) to swap values in slots
  useEffect(() => {
    const oldActive = prevThemeRef.current
    if (oldActive === theme) return
    prevThemeRef.current = theme

    setSlots((prev) => {
      const targetIdx = prev.findIndex((s) => s.themeValue === theme)
      if (targetIdx !== -1) {
        return prev.map((s, idx) => {
          if (idx === targetIdx) {
            return { ...s, themeValue: oldActive }
          }
          return s
        })
      }
      return prev
    })
  }, [theme])

  // Floating animations configuration
  const floatConfigs: Record<Theme, { y: number[]; duration: number; delay: number }> = {
    default: { y: [-6, 6, -6], duration: 4.2, delay: 0.1 },
    midnight: { y: [-8, 8, -8], duration: 3.6, delay: 0.3 },
    obsidian: { y: [-5, 5, -5], duration: 4.8, delay: 0.2 },
    sunset: { y: [-7, 7, -7], duration: 4.0, delay: 0.4 },
    forest: { y: [-9, 9, -9], duration: 4.4, delay: 0.0 },
    hacker: { y: [-5, 5, -5], duration: 3.8, delay: 0.5 }
  }

  // Trigger canvas spark explosion
  const createExplosion = (x: number, y: number, color: string) => {
    const count = 18
    const sparks = sparksRef.current
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4
      const speed = 1.4 + Math.random() * 2.4
      sparks.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        size: Math.random() * 2.5 + 1.0,
        alpha: 1.0,
        decay: 0.02 + Math.random() * 0.015,
      })
    }
  }

  const handlePop = (e: React.MouseEvent<HTMLButtonElement>, slotIndex: number, item: ThemeItem) => {
    if (containerRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const parentRect = containerRef.current.getBoundingClientRect()
      const clickX = rect.left - parentRect.left + rect.width / 2
      const clickY = rect.top - parentRect.top + rect.height / 2
      createExplosion(clickX, clickY, item.color)
    }

    setTheme(item.value)
    addLog(`💥 Popped theme bubble! Switched to: ${item.label}`)
  }

  // Canvas render frame loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const sparks = sparksRef.current

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        s.x += s.vx
        s.y += s.vy
        s.vx *= 0.96
        s.vy *= 0.96
        s.alpha -= s.decay

        if (s.alpha <= 0) {
          sparks.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fillStyle = s.color
        ctx.globalAlpha = s.alpha
        ctx.shadowBlur = 8
        ctx.shadowColor = s.color
        ctx.fill()
        ctx.restore()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  // Mapping theme value to gorgeous, theme-specific linear background gradients
  const themeGradients: Record<Theme, string> = {
    default: 'linear-gradient(135deg, rgba(8, 28, 36, 0.96), rgba(0, 150, 136, 0.75))',
    midnight: 'linear-gradient(135deg, rgba(3, 7, 18, 0.96), rgba(56, 189, 248, 0.75))',
    obsidian: 'linear-gradient(135deg, rgba(9, 9, 11, 0.96), rgba(251, 191, 36, 0.75))',
    sunset: 'linear-gradient(135deg, rgba(42, 6, 6, 0.96), rgba(217, 119, 6, 0.75))',
    forest: 'linear-gradient(135deg, rgba(10, 26, 12, 0.96), rgba(101, 163, 13, 0.75))',
    hacker: 'linear-gradient(135deg, rgba(7, 10, 8, 0.96), rgba(0, 255, 102, 0.75))',
  }

  return (
    <div
      ref={containerRef}
      className="hidden lg:flex items-center justify-center w-[310px] xl:w-[330px] h-[310px] shrink-0 relative select-none"
    >
      {/* Canvas overlay for particle pop explosions */}
      <canvas
        ref={canvasRef}
        width={330}
        height={310}
        className="absolute inset-0 z-10 pointer-events-none w-full h-full"
      />

      {/* Floating Interactive Themes Cloud */}
      {slots.map((slot, idx) => {
        const item = THEME_CYCLE.find((t) => t.value === slot.themeValue)
        if (!item) return null

        const config = floatConfigs[item.value] || { y: [-6, 6, -6], duration: 4.0, delay: 0 }
        const grad = themeGradients[item.value] || 'rgba(8, 14, 22, 0.76)'

        return (
          <div
            key={idx}
            style={{
              position: 'absolute',
              left: `${slot.x}px`,
              top: `${slot.y}px`,
            }}
            className="z-20 w-[78px] h-[78px] xl:w-[82px] xl:h-[82px]"
          >
            <AnimatePresence mode="wait">
              <motion.button
                key={item.value}
                onClick={(e) => handlePop(e, idx, item)}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: config.y
                }}
                exit={{ scale: 0, opacity: 0, transition: { duration: 0.15 } }}
                transition={{
                  scale: { type: 'spring', stiffness: 200, damping: 15 },
                  opacity: { duration: 0.2 },
                  y: { duration: config.duration, repeat: Infinity, ease: 'easeInOut', delay: config.delay }
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.94 }}
                style={{
                  background: grad,
                  boxShadow: `0 0 16px ${item.color}35, inset 0 0 10px rgba(255, 255, 255, 0.1)`,
                  border: 'none',
                  width: '100%',
                  height: '100%',
                }}
                title={`Switch to ${item.label}`}
                className="rounded-full flex flex-col items-center justify-center gap-0.5 cursor-pointer backdrop-blur-md transition-shadow duration-300"
              >
                {/* EMOJI */}
                <span className="text-xl xl:text-2xl select-none">{item.icon}</span>

                {/* LABEL */}
                <span className="font-mono text-[8px] xl:text-[9px] font-bold uppercase tracking-wider text-white select-none">
                  {item.label}
                </span>

                {/* Inner glass highlight */}
                <div className="absolute inset-0.5 rounded-full border border-white/5 pointer-events-none" />
              </motion.button>
            </AnimatePresence>
          </div>
        )
      })}

      {/* Floating helper text */}
      <span className="absolute bottom-0 font-mono text-[8px] opacity-25 tracking-widest uppercase pointer-events-none">
        💥 pop a bubble to apply theme
      </span>
    </div>
  )
}
