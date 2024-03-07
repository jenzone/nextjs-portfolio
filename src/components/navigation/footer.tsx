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
    <footer className="flex h-[300px] flex-col items-center justify-center space-y-8 border-t border-[var(--text-100)] py-20">
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
          <span
            key={social.name}
            className="cursor-pointer font-bold text-neutral-400 transition-colors duration-300 ease-out hover:text-[var(--accent-200)]"
          >
            <Link href={social.href}>{social.name}</Link>
          </span>
        ))}
      </div>
      <div>
        <p className="text-medium text-neutral-400">
          © {currentYear} • Jenson Caparida • All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
