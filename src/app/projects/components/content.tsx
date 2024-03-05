'use client'

import { useEffect, useRef } from 'react'
import { motion, Variants, useAnimation, useInView } from 'framer-motion'

import { Heading } from '@/components/ui/heading'
import { ProjectCard } from '@/components/ui/project-card'

import projects from '@/data/projects.json'

const ProjectContent = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const controls = useAnimation()

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
      <Heading heading="Projects" />
      <motion.div
        variants={projectChildVariants}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
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
    </motion.div>
  )
}

export default ProjectContent
