'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Link as ScrollLink } from 'react-scroll'
import { motion, Variants } from 'framer-motion'

import Toggle from './toggle'
import { socials } from './social'

import links from '@/data/links.json'

const SideBar = () => {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto'
  }, [open])

  const beforeSideBarOpen: Variants = {
    closed: {
      clipPath: 'inset(0% 100% 0% 0%)',
      transition: {
        type: 'spring',
        stiffness: 120,
        delay: 0.4,
        damping: 16,
      },
    },
    open: {
      clipPath: 'inset(0% 0% 0% 0%)',
      transition: {
        type: 'spring',
        stiffness: 120,
        delay: 0.3,
        damping: 16,
      },
    },
  }

  const sideBar: Variants = {
    closed: {
      clipPath: 'inset(0% 100% 0% 0%)',
      transition: {
        type: 'spring',
        stiffness: 120,
        delay: 0.3,
        damping: 16,
      },
    },
    open: {
      clipPath: 'inset(0% 0% 0% 0%)',
      transition: {
        type: 'spring',
        stiffness: 120,
        delay: 0.4,
        damping: 16,
      },
    },
  }

  const linksVariants: Variants = {
    closed: {
      x: 0.1,
    },
    open: {
      x: 0,
      transition: {
        delay: 0.4,
        staggerChildren: 0.25,
        staggerDirection: 1,
        when: 'beforeChildren',
      },
    },
  }

  const linksChildVariants: Variants = {
    closed: { x: 20, opacity: 0 },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  const socialVariants: Variants = {
    closed: {
      x: 0.1,
    },
    open: {
      x: 0,
      transition: {
        delay: 0.4,
        staggerChildren: 0.25,
        staggerDirection: -1,
        when: 'beforeChildren',
      },
    },
  }

  const socialChildVariants: Variants = {
    closed: { y: 20, opacity: 0 },
    open: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div initial="closed" animate={open ? 'open' : 'closed'}>
      <motion.div
        className="absolute bottom-0 left-0 top-0 z-50 w-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent)]"
        variants={beforeSideBarOpen}
      />
      <motion.div
        className="absolute bottom-0 left-0 top-0 z-50 flex w-full flex-col justify-center space-y-28 bg-gradient-to-r from-[var(--background)] to-[var(--primary)] px-12"
        variants={sideBar}
      >
        {/* LINKS */}
        <motion.div
          variants={linksVariants}
          initial="closed"
          animate={open ? 'open' : 'closed'}
          className="flex flex-col space-y-4"
        >
          {links.map((item) => (
            <motion.div
              key={item.id}
              variants={linksChildVariants}
              className="cursor-pointer text-5xl font-medium transition-colors duration-300 ease-out hover:text-[var(--accent)]"
            >
              {isHomePage ? (
                item.id === 'resources' ? (
                  <Link href={item.link} target="_blank">
                    {item.label}
                  </Link>
                ) : (
                  <ScrollLink
                    to={item.id}
                    smooth={true}
                    duration={500}
                    delay={1000}
                    onClick={() => setOpen && setOpen(false)}
                  >
                    {item.label}
                  </ScrollLink>
                )
              ) : (
                <Link href="/">{item.label}</Link>
              )}
            </motion.div>
          ))}
        </motion.div>
        {/* SOCIALS */}
        <motion.div
          variants={socialVariants}
          initial="closed"
          animate={open ? 'open' : 'closed'}
          className="flex space-x-4 pl-1"
        >
          {socials.map((social) => (
            <motion.span key={social.name} variants={socialChildVariants}>
              <Link href={social.href}>{social.icon}</Link>
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
      {/* TOGGLE */}
      <motion.div
        initial={{
          y: -20,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            delay: 1,
            duration: 0.8,
            ease: 'easeOut',
          },
        }}
      >
        <Toggle setOpen={setOpen} />
      </motion.div>
    </motion.div>
  )
}

export default SideBar
