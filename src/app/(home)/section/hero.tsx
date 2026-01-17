'use client'

import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { DocumentArrowDownIcon } from '@heroicons/react/24/solid'

import { Button } from '@/components/ui/button'
import { socials } from '@/components/navigation/social'
import { Link as ScrollLink } from 'react-scroll'
import { FlipWords } from '@/components/flip-words'
import { memo } from 'react'

const Hero = () => {
  const firstName = ['J', 'e', 'n', 's', 'o', 'n']
  const lastName = ['C', 'a', 'p', 'a', 'r', 'i', 'd', 'a']

  const heroVariants: Variants = {
    initial: {
      x: 0,
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
        duration: 0.6,
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
        duration: 0.6,
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
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      variants={heroVariants}
      initial="initial"
      animate="animate"
      className="static flex h-[90vh] w-full flex-col items-start justify-center space-y-3 pb-[10vh] md:space-y-5"
    >
      {/* HERO HEADING */}
      <motion.div
        variants={letterVariants}
        initial="initial"
        animate="animate"
        className="flex space-x-4"
      >
        <div className="text-4xl font-bold sm:text-5xl md:text-7xl">
          {firstName.map((letter, index) => (
            <motion.span
              variants={letterChildVariants}
              key={index}
              className="cursor-default transition-colors duration-500 ease-out hover:text-(--primary)"
            >
              {letter}
            </motion.span>
          ))}
        </div>
        <div className="text-4xl font-bold sm:text-5xl md:text-7xl">
          {lastName.map((letter, index) => (
            <motion.span
              variants={letterChildVariants}
              key={index}
              className="cursor-default transition-colors duration-500 ease-out hover:text-(--primary)"
            >
              {letter}
            </motion.span>
          ))}
        </div>
      </motion.div>
      {/* HERO SUBHEADING */}
      <motion.div variants={heroChildVariants} className="relative h-[28px]">
        <FlipWords
          className="absolute m-0 p-0 font-serif text-lg whitespace-nowrap uppercase italic"
          words={['Software Developer', 'UX/UI Designer', 'Automation Tester']}
          duration={3000}
        />
      </motion.div>
      {/* HERO BUTTONS */}
      <div className="flex flex-row space-x-4 pt-2">
        <motion.div variants={heroChildVariants}>
          <ScrollLink to="contact" smooth={true} duration={500} delay={200}>
            <Button variant="outline" className="cursor-pointer">
              <DocumentArrowDownIcon className="mr-2 size-4" />
              Connect with me
            </Button>
          </ScrollLink>
        </motion.div>
        <motion.div variants={heroChildVariants}>
          <Link href={'/jensoncaparida-resume.pdf'} target="_blank">
            <Button className="cursor-pointer">
              <DocumentArrowDownIcon className="mr-2 size-4" />
              Resume
            </Button>
          </Link>
        </motion.div>
      </div>
      {/* SOCIAL BAR */}
      <SocialBar variants={socialChildVariants} />
    </motion.div>
  )
}

const SocialBar = memo(({ variants }: { variants: Variants }) => (
  <motion.div
    variants={variants}
    className="absolute right-8 hidden flex-col space-y-4 sm:flex 2xl:space-y-6"
  >
    {socials.map((social) => (
      <span key={social.name} className="social">
        <Link href={social.href}>{social.icon}</Link>
      </span>
    ))}
  </motion.div>
))

export default Hero
