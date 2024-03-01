'use client'

import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import { DocumentArrowDownIcon } from '@heroicons/react/24/solid'

import Button from '@/components/ui/button'
import { socials } from '@/components/navigation/social'

const Hero = () => {
  const firstName = ['J', 'e', 'n', 's', 'o', 'n']
  const lastName = ['C', 'a', 'p', 'a', 'r', 'i', 'd', 'a']

  const heroVariants: Variants = {
    initial: {
      x: 0.1,
    },
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
    initial: {
      x: -30,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  const letterVariants: Variants = {
    initial: {
      y: 40,
    },
    animate: {
      y: 0,
      transition: {
        duration: 1,
        staggerChildren: 0.2,
      },
    },
  }

  const letterChildVariants: Variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  const socialChildVariants: Variants = {
    initial: {
      x: 30,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      variants={heroVariants}
      initial="initial"
      animate="animate"
      className="static flex h-[90vh] w-full flex-col justify-center space-y-6 pb-[10vh]"
    >
      {/* HERO HEADING */}
      <motion.div
        variants={letterVariants}
        initial="initial"
        animate="animate"
        className="flex space-x-4"
      >
        <h1 className="text-4xl font-bold  sm:text-5xl md:text-7xl">
          {firstName.map((letter, index) => (
            <motion.span
              variants={letterChildVariants}
              key={index}
              className="cursor-default transition-colors duration-500 ease-out hover:text-[var(--primary-200)]"
            >
              {letter}
            </motion.span>
          ))}
        </h1>
        <h1 className="text-4xl font-bold  sm:text-5xl md:text-7xl">
          {lastName.map((letter, index) => (
            <motion.span
              variants={letterChildVariants}
              key={index}
              className="cursor-default transition-colors duration-500 ease-out hover:text-[var(--primary-200)]"
            >
              {letter}
            </motion.span>
          ))}
        </h1>
      </motion.div>
      {/* HERO SUBHEADING */}
      <motion.h2
        variants={heroChildVariants}
        className="cursor-default font-serif text-sm font-semibold uppercase italic text-[var(--accent-200)] sm:text-base"
      >
        Full Stack Developer{' '}
        <span className="text-[var(--primary-200)]">|</span> UX Designer
      </motion.h2>
      {/* HERO BUTTONS */}
      <motion.div variants={heroChildVariants}>
        <Button>
          <DocumentArrowDownIcon className="mr-2 size-4" />
          <Link href={'/JensonCaparida_Resume.pdf'} target="_blank">
            Resume
          </Link>
        </Button>
      </motion.div>
      {/* SOCIAL BAR */}
      <motion.div
        variants={socialChildVariants}
        className="absolute right-8 hidden flex-col space-y-4 sm:flex 2xl:space-y-6"
      >
        {socials.map((social) => (
          <span key={social.name} className="social">
            <Link href={social.href}>{social.icon}</Link>
          </span>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default Hero
