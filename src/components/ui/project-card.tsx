'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { motion, Variants, useAnimation, useInView } from 'framer-motion'

interface ProjectCardProps {
  id: string
  name: string
  description: string
  img: string
  techstack: string[]
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  name,
  description,
  img,
  techstack,
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const projectCardVariants: Variants = {
    hidden: {
      y: 0,
    },
    visible: {
      y: 0,
      transition: {
        delay: 0.4,
        staggerChildren: 0.25,
        staggerDirection: 1,
        when: 'beforeChildren',
      },
    },
  }

  const projectCardChildVariants: Variants = {
    hidden: { y: -30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  const projectCardImageVariants: Variants = {
    hidden: { width: '100%' },
    visible: {
      width: '0%',
      transition: {
        ease: 'circOut',
        duration: 1.6,
      },
    },
  }

  return (
    <>
      <Link href={`/projects/${id}`}>
        <motion.div
          ref={ref}
          variants={projectCardVariants}
          initial="hidden"
          animate={controls}
          className="group cursor-pointer space-y-4 rounded-lg border-2 border-[var(--foreground-muted)] p-4 shadow-lg transition duration-500 ease-out hover:border-[var(--primary)]"
        >
          <motion.div className="relative aspect-video h-auto w-auto rounded bg-[var(--foreground-muted)]">
            <Image
              src={`/projects/${img}`}
              alt={`${name} image`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw"
              className="aspect-video object-contain"
            />
            <motion.div
              variants={projectCardImageVariants}
              className="absolute h-full w-full bg-[var(--foreground)]"
            />
          </motion.div>
          <motion.div className="space-y-4">
            <motion.div
              variants={projectCardChildVariants}
              className="flex items-center justify-between"
            >
              <div className="whitespace-nowrap text-xl font-bold">
                {name.length > 20 ? name.slice(0, 20) + '...' : name}
              </div>
              <span className="arrow">
                <ArrowRightIcon className="social size-6 transform duration-300 ease-out will-change-transform group-hover:-rotate-45 group-hover:scale-90 group-hover:text-[var(--foreground)]" />
              </span>
            </motion.div>
            <motion.div variants={projectCardChildVariants}>
              {description.length > 70
                ? `${description.slice(0, 70)}...`
                : description}
            </motion.div>
            <motion.ul
              variants={projectCardChildVariants}
              className="scrollbar flex space-x-2 overflow-x-auto"
            >
              {techstack.map((tech) => (
                <li
                  key={tech}
                  className="mb-4 whitespace-nowrap rounded-md border border-[var(--primary)] px-2 py-1 text-xs text-[var(--primary)]"
                >
                  {tech}
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>
      </Link>
    </>
  )
}
