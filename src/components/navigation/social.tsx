import { SiInstagram, SiGithub } from '@icons-pack/react-simple-icons'
import { Linkedin } from '@/lib/icons'

export const socials = [
  {
    name: 'Instagram',
    icon: (
      <SiInstagram className="size-8 text-(--foreground-muted) transition-colors duration-300 ease-out hover:text-(--accent) 2xl:size-14" />
    ),
    href: 'https://www.instagram.com/jenzoone',
  },
  {
    name: 'GitHub',
    icon: (
      <SiGithub className="size-8 text-(--foreground-muted) transition-colors duration-300 ease-out hover:text-(--accent) 2xl:size-14" />
    ),
    href: 'https://github.com/jenzone',
  },
  {
    name: 'LinkedIn',
    icon: (
      <Linkedin className="size-8 text-(--foreground-muted) transition-colors duration-300 ease-out hover:text-(--accent) 2xl:size-14" />
    ),
    href: 'https://www.linkedin.com/in/jensoncaparida',
  },
]
