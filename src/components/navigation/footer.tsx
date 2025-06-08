'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Link as ScrollLink } from 'react-scroll'

import { socials } from './social'

const Footer = () => {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  const currentYear = new Date().getFullYear()

  return (
    <footer className="flex h-[300px] flex-col items-center justify-center space-y-8 border-t border-(--foreground) py-20">
      <div className="cursor-pointer">
        {isHomePage ? (
          <ScrollLink to="hero" smooth={true} duration={500} delay={200}>
            <Image src="/logo-light.svg" alt="logo" width={28} height={28} />
          </ScrollLink>
        ) : (
          <Link href="/">
            <Image src="/logo-light.svg" alt="logo" width={28} height={28} />
          </Link>
        )}
      </div>
      <div className="flex flex-row space-x-6">
        {socials.map((social) => (
          <div
            key={social.name}
            className="cursor-pointer font-bold text-neutral-400 transition-colors duration-300 ease-out hover:text-(--accent)"
          >
            <Link href={social.href}>{social.name}</Link>
          </div>
        ))}
      </div>
      <div className="text-medium text-neutral-400">
        © {currentYear} • Jenson Caparida • All Rights Reserved.
      </div>
      <div className="flex space-x-2">
        <div className="h-6 w-6 rounded-full bg-(--primary) shadow-sm shadow-zinc-500" />
        <div className="h-6 w-6 rounded-full bg-(--primary-light) shadow-sm shadow-zinc-500" />
        <div className="h-6 w-6 rounded-full bg-(--accent) shadow-sm shadow-zinc-500" />
        <div className="h-6 w-6 rounded-full bg-(--foreground) shadow-sm shadow-zinc-500" />
        <div className="h-6 w-6 rounded-full bg-(--foreground-muted) shadow-sm shadow-zinc-500" />
        <div className="h-6 w-6 rounded-full bg-(--background) shadow-sm shadow-zinc-500" />
        <div className="h-6 w-6 rounded-full bg-(--background-muted) shadow-sm shadow-zinc-500" />
      </div>
    </footer>
  )
}

export default Footer
