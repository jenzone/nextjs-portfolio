'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Loading() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Count up the percentage smoothly over the 1.8 second loading period
    const duration = 1800
    const intervalTime = 30
    const step = 100 / (duration / intervalTime)

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return Math.min(prev + step, 100)
      })
    }, intervalTime)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden bg-(--background) transition-colors duration-300">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Ambient Backdrop Glowing Auroras */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
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

      {/* Center Loader Graphics */}
      <div className="z-10 flex flex-col items-center gap-8">
        
        {/* Glowing Logo & Dual-Ring Spinner */}
        <div className="relative flex items-center justify-center w-32 h-32">
          
          {/* Outer Spinning Arc (Primary Theme Color) */}
          <motion.div
            className="absolute w-28 h-28 rounded-full border-2 border-transparent"
            style={{
              borderTopColor: 'var(--primary-light)',
              borderBottomColor: 'var(--primary-light)',
              boxShadow: '0 0 15px rgba(0, 204, 191, 0.05)',
            }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
          />

          {/* Inner Counter-Spinning Arc (Accent Theme Color) */}
          <motion.div
            className="absolute w-22 h-22 rounded-full border-2 border-transparent"
            style={{
              borderLeftColor: 'var(--accent)',
              borderRightColor: 'var(--accent)',
              boxShadow: '0 0 15px rgba(255, 95, 93, 0.05)',
            }}
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 1.3, ease: 'linear' }}
          />

          {/* Core Branding Symbol */}
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/[0.02] border border-white/10 backdrop-blur-sm shadow-inner">
            <motion.span
              className="text-(--primary-light) font-mono font-bold text-lg"
              animate={{ opacity: [0.5, 1, 0.5], scale: [0.98, 1.02, 0.98] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              &lt;/&gt;
            </motion.span>
          </div>

        </div>

        {/* Brand & Loading Info */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="font-mono text-xs font-semibold tracking-[0.25em] text-white/80 uppercase">
            Jenson Caparida
          </h2>
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-white/40">
            <span>INITIALIZING ENVIRONMENT</span>
            <span>•</span>
            <span className="text-(--primary-light) font-bold w-8 text-right">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Sleek Horizontal Progress Bar with dynamic glow */}
        <div className="w-56 flex flex-col items-center">
          <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-(--primary-light) to-(--accent) rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
          {/* Subtle glow underneath the loading bar */}
          <div 
            className="h-[1px] w-2/3 opacity-30 blur-[2px] mt-[1px]"
            style={{
              background: 'linear-gradient(to right, var(--primary-light), var(--accent))',
            }}
          />
        </div>

      </div>
    </div>
  )
}
