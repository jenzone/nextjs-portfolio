'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef } from 'react'
import { ArrowLongRightIcon } from '@heroicons/react/24/solid'
import { motion, Variants, useAnimation, useInView } from 'framer-motion'

import { Heading } from '@/components/ui/heading'
import { ProjectCard } from '@/components/ui/project-card'
import { Button } from '@/components/ui/button'

import projects from '@/data/projects.json'

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20%' })

  const controls = useAnimation()

  const projectsFiltered = useMemo(
    () => projects.filter((project) => project.featured === true),
    [],
  )

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const projectVariants: Variants = {
    hidden: {
      y: -0.1,
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

  const projectChildVariants: Variants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
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
      ref={ref}
      variants={projectVariants}
      initial="hidden"
      animate={controls}
      className="flex flex-col items-center justify-center space-y-16 py-16"
    >
      <Heading heading="Featured Projects" />
      <motion.div
        variants={projectChildVariants}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {projectsFiltered.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            name={project.name}
            description={project.description}
            img={project.img}
            techstack={project.techstack}
          />
        ))}
      </motion.div>
      <motion.div variants={projectChildVariants}>
        <Link href="/projects">
          <Button className="cursor-pointer">
            View All Projects
            <ArrowLongRightIcon className="ml-2 size-6" />
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  )
}

export default Projects
