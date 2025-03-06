'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  Variants,
  AnimatePresence,
  LayoutGroup,
  useInView,
  useAnimation,
} from 'framer-motion'

import { Heading } from '@/components/ui/heading'

import { skills } from '@/data/skills-sets'

interface ISkillSets {
  name: string
  category: string
  icon?: React.ComponentType<any> | null
}

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const controls = useAnimation()

  const [selectedTab, setSelectedTab] = useState('All')

  const filteredSkills =
    selectedTab === 'All'
      ? skills
      : skills.filter((skill) => skill.category.includes(selectedTab))

  const tab = [
    'All',
    'languages',
    'frontend',
    'backend',
    'databases',
    'testing',
    'other',
  ]

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const skillVariants: Variants = {
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

  const skillChildVariants: Variants = {
    hidden: { y: -30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={skillVariants}
      initial="hidden"
      animate={controls}
      className="space-y-16 py-16"
    >
      <Heading heading="Skills & Technologies" />
      {/* TABS */}
      <div className="flex flex-wrap justify-center gap-4">
        {tab.map((item) => (
          <motion.button
            key={item}
            variants={skillChildVariants}
            onClick={() => setSelectedTab(item)}
            className={`${selectedTab === item ? 'tab text-[var(--primary)]' : ''} hover:text-primary-200 cursor-pointer font-medium capitalize outline-none transition-colors duration-300`}
          >
            {item}
          </motion.button>
        ))}
      </div>
      {/* SKILLS CONTENT */}
      <LayoutGroup>
        <motion.div
          layout
          variants={skillChildVariants}
          className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
        >
          <AnimatePresence>
            {filteredSkills.map((skill, index) => (
              <SkillSets key={index} skill={skill} />
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </motion.div>
  )
}

const SkillSets = ({ skill }: { skill: ISkillSets }) => {
  const skillSetsVariants: Variants = {
    initial: {
      opacity: 0,
      scale: 0,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
    exit: {
      opacity: 0,
      scale: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <motion.div
      layout
      variants={skillSetsVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-50 h-50 flex h-full w-full flex-col items-center justify-center space-y-2 whitespace-nowrap rounded-lg p-4 text-sm"
    >
      <div className="relative z-10">{skill.icon && <skill.icon />}</div>
      <div className="relative z-10">{skill.name}</div>
    </motion.div>
  )
}

export default Skills
