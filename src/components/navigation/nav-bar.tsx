'use client'

import Image from 'next/image'
import { motion, Variants } from 'framer-motion'
import { Link as ScrollLink } from 'react-scroll'

import SideBar from './side-bar'

import links from '@/data/links.json'

const NavBar = () => {
  const navBarVariants: Variants = {
    initial: {
      y: 0.1,
    },
    animate: {
      y: 0,
      transition: {
        delay: 0.4,
        staggerChildren: 0.25,
        when: 'beforeChildren',
      },
    },
  }

  const navBarChildVariants: Variants = {
    initial: {
      y: -25,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      variants={navBarVariants}
      initial="initial"
      animate="animate"
      className="flex h-[10vh] w-full items-center justify-between"
    >
      {/* LOGO */}
      <motion.div variants={navBarChildVariants} className="h-auto w-auto">
        <Image src="/logo-light.svg" alt="logo" width={28} height={28} />
      </motion.div>
      {/* LINKS */}
      <motion.div className="hidden flex-row space-x-6 sm:flex">
        {links.map((item) => (
          <motion.span
            key={item.id}
            variants={navBarChildVariants}
            className="cursor-pointer font-bold text-neutral-400 transition-colors duration-300 ease-out hover:text-[var(--accent-200)]"
          >
            <ScrollLink to={item.id} smooth={true} duration={500} delay={200}>
              {item.label}
            </ScrollLink>
          </motion.span>
        ))}
      </motion.div>
      {/* TOGGLE SIDEBAR*/}
      <motion.div className="block sm:hidden">
        <SideBar />
      </motion.div>
    </motion.div>
  )
}

export default NavBar
