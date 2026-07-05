'use client'

import Link from 'next/link'
import { motion, type Variants, useAnimation } from 'framer-motion'
import { DocumentArrowDownIcon } from '@heroicons/react/24/solid'
import { useEffect, useRef, memo } from 'react'

import { Button } from '@/components/ui/button'
import { socials } from '@/components/navigation/social'
import { Link as ScrollLink } from 'react-scroll'
import { FlipWords } from '@/components/flip-words'
import { useTerminal } from '@/context/terminal-context'
import { useLog } from '@/hooks/use-log'
import ThemeFloatingSelector from '@/components/theme-selector/theme-floating-selector'

// ─── Random scatter positions ──────────────────────────────────────────────────

function getScatterPos(index: number, total: number) {
  const angle = (index / total) * Math.PI * 2 + Math.random() * 0.5
  const radius = 180 + Math.random() * 220
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
    rotate: Math.random() * 360 - 180,
    scale: 0.6 + Math.random() * 0.8,
    opacity: 0.3 + Math.random() * 0.6,
  }
}

// ─── Animated Letter ───────────────────────────────────────────────────────────

const AnimatedLetter = ({
  letter,
  index,
  total,
  heroMode,
}: {
  letter: string
  index: number
  total: number
  heroMode: string
}) => {
  const controls = useAnimation()
  const floatRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const scatter = getScatterPos(index, total)

    if (heroMode === 'scatter') {
      if (floatRef.current) clearInterval(floatRef.current)
      controls.start({
        x: scatter.x,
        y: scatter.y,
        rotate: scatter.rotate,
        scale: scatter.scale,
        opacity: scatter.opacity,
        transition: {
          type: 'spring',
          stiffness: 60,
          damping: 10,
          delay: index * 0.04,
        },
      })
    } else if (heroMode === 'float') {
      if (floatRef.current) clearInterval(floatRef.current)
      controls.start({
        x: Math.sin(index * 1.2) * 30,
        y: Math.cos(index * 1.1) * 20 - 10,
        rotate: Math.sin(index) * 8,
        scale: 1,
        opacity: 1,
        transition: { delay: index * 0.05, duration: 1.2, ease: 'easeOut' },
      })
      let t = 0
      floatRef.current = setInterval(() => {
        t += 0.05
        controls.start({
          x: Math.sin(t + index * 1.2) * 28,
          y: Math.cos(t * 0.8 + index * 1.1) * 18,
          rotate: Math.sin(t * 0.6 + index) * 6,
          scale: 1 + Math.sin(t + index) * 0.06,
          opacity: 1,
          transition: { duration: 0.6, ease: 'easeInOut' },
        })
      }, 700)
    } else if (heroMode === 'reassemble' || heroMode === 'idle') {
      if (floatRef.current) clearInterval(floatRef.current)
      controls.start({
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 200,
          damping: 18,
          delay: index * 0.03,
        },
      })
    }

    return () => {
      if (floatRef.current) clearInterval(floatRef.current)
    }
  }, [heroMode, index, total, controls])

  return (
    <motion.span
      animate={controls}
      whileHover={{
        scale: 1.15,
        y: -5,
        textShadow: '0 0 15px var(--primary-light)',
        transition: { duration: 0.15, ease: 'easeOut' }
      }}
      initial={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
      className="inline-block hover:text-(--primary-light) cursor-default transition-colors duration-300 ease-out font-extrabold tracking-tight"
      style={{ display: 'inline-block' }}
    >
      {letter}
    </motion.span>
  )
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

const Hero = () => {
  const firstName = ['J', 'e', 'n', 's', 'o', 'n']
  const lastName  = ['C', 'a', 'p', 'a', 'r', 'i', 'd', 'a']
  const allLetters = [...firstName, ...lastName]
  const { heroMode } = useTerminal()
  const log = useLog()

  useEffect(() => {
    log('👁 Viewed Hero section')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const heroVariants: Variants = {
    initial: { x: 0 },
    animate: {
      x: 0,
      transition: {
        delay: 0.4,
        staggerChildren: 0.25,
        staggerDirection: 1,
        when: 'beforeChildren',
      },
    },
  }

  const heroChildVariants: Variants = {
    initial: { x: -30, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const letterVariants: Variants = {
    initial: { y: 40 },
    animate: {
      y: 0,
      transition: { duration: 1, staggerChildren: 0.2 },
    },
  }

  const socialChildVariants: Variants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  }

  return (
    <motion.div
      variants={heroVariants}
      initial="initial"
      animate="animate"
      className="flex h-[90vh] w-full items-center justify-between gap-12 xl:gap-16"
    >
      {/* ── LEFT: Hero Content ─────────────────────────────────── */}
      <div className="flex flex-col items-start space-y-4 md:space-y-6 flex-1 min-w-0">

        {/* Name */}
        <motion.div
          variants={letterVariants}
          initial="initial"
          animate="animate"
          className="flex flex-wrap lg:flex-nowrap gap-x-4 gap-y-2 text-5xl font-extrabold sm:text-6xl md:text-7xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold select-none leading-none"
        >
          <span className="whitespace-nowrap">
            {firstName.map((letter, index) => (
              <AnimatedLetter
                key={index}
                letter={letter}
                index={index}
                total={allLetters.length}
                heroMode={heroMode}
              />
            ))}
          </span>
          <span className="whitespace-nowrap text-(--foreground)">
            {lastName.map((letter, index) => (
              <AnimatedLetter
                key={index}
                letter={letter}
                index={firstName.length + index}
                total={allLetters.length}
                heroMode={heroMode}
              />
            ))}
          </span>
        </motion.div>

        {/* Subheading */}
        <motion.div variants={heroChildVariants} className="relative h-[28px] pl-1">
          <FlipWords
            className="absolute m-0 whitespace-nowrap p-0 font-serif text-lg md:text-xl uppercase italic tracking-wider opacity-85"
            words={['Software Engineer', 'UX/UI Designer', 'Automation Tester']}
            duration={3000}
          />
        </motion.div>

        {/* CTA Buttons */}
        <div className="flex flex-row space-x-4 pt-4 pl-1">
          <motion.div variants={heroChildVariants}>
            <ScrollLink to="contact" smooth={true} duration={500} delay={200}>
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => log('🧭 Clicked: Connect with me')}
              >
                <DocumentArrowDownIcon className="mr-2 size-4" />
                Connect with me
              </Button>
            </ScrollLink>
          </motion.div>
          <motion.div variants={heroChildVariants}>
            <Link
              href={'/jensoncaparida-resume.pdf'}
              target="_blank"
              onClick={() => log('📄 Opened Resume PDF')}
            >
              <Button className="cursor-pointer">
                <DocumentArrowDownIcon className="mr-2 size-4" />
                Resume
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Socials – horizontal row below buttons */}
        <motion.div
          variants={heroChildVariants}
          className="flex flex-row items-center gap-6 pt-3 pl-2"
        >
          {socials.map((social) => (
            <motion.span
              key={social.name}
              variants={socialChildVariants}
              whileHover={{ scale: 1.25, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="social hover:text-(--accent) transition-colors duration-150"
            >
              <Link href={social.href}>{social.icon}</Link>
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* ── RIGHT: Theme Floating Selector ────────────────────── */}
      <ThemeFloatingSelector />
    </motion.div>
  )
}

export default Hero
