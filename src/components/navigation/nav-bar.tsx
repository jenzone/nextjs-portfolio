'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, Variants } from 'framer-motion'
import { Link as ScrollLink } from 'react-scroll'

import SideBar from './side-bar'

import links from '@/data/links.json'
import { usePathname } from 'next/navigation'

const NavBar = () => {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

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
      <motion.div variants={navBarChildVariants}>
        <Link href="/" className="h-auto w-auto">
          <Image src="/logo-light.svg" alt="logo" width={32} height={32} />
        </Link>
      </motion.div>
      {/* LINKS */}
      <motion.div className="hidden flex-row space-x-6 sm:flex">
        {links.map((item) => (
          <motion.div
            key={item.id}
            variants={navBarChildVariants}
            className="cursor-pointer text-lg font-bold text-neutral-400 transition-colors duration-300 ease-out hover:text-[var(--accent)]"
          >
            {isHomePage ? (
              item.id === 'resources' ? (
                <Link href={item.link} target="_blank">
                  {item.label}
                </Link>
              ) : (
                <ScrollLink
                  to={item.link}
                  smooth={true}
                  duration={500}
                  delay={200}
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
      {/* TOGGLE SIDEBAR*/}
      <motion.div className="block sm:hidden">
        <SideBar />
      </motion.div>
    </motion.div>
  )
}

export default NavBar
