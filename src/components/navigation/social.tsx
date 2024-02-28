import {
  SiInstagram,
  SiGithub,
  SiLinkedin,
} from '@icons-pack/react-simple-icons'

export const socials = [
  {
    name: 'Instagram',
    icon: (
      <SiInstagram className="size-8 text-[var(--text-200)] transition-colors duration-300 ease-out hover:text-[var(--accent-200)] 2xl:size-14 " />
    ),
    href: 'https://www.instagram.com/jenzoone',
  },
  {
    name: 'GitHub',
    icon: (
      <SiGithub className="size-8 text-[var(--text-200)] transition-colors duration-300 ease-out hover:text-[var(--accent-200)] 2xl:size-14 " />
    ),
    href: 'https://github.com/jensoncaparida',
  },
  {
    name: 'LinkedIn',
    icon: (
      <SiLinkedin className="size-8 text-[var(--text-200)] transition-colors duration-300 ease-out hover:text-[var(--accent-200)] 2xl:size-14 " />
    ),
    href: 'https://www.linkedin.com/in/jenson-c-367463251',
  },
]
