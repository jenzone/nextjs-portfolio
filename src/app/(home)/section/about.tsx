'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { motion, Variants, useAnimation, useInView } from 'framer-motion'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'

import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Timeline } from '@/components/timeline'

const About = () => {
  return (
    <motion.div className="space-y-16 py-16">
      <Heading heading="About Me" />
      <div className="grid h-full w-full grid-cols-1 gap-8 sm:gap-12 md:grid-cols-2">
        <ProfileImage />
        <ProfileContent />
      </div>
      <Experience />
    </motion.div>
  )
}

const ProfileImage = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const profileImageVariants: Variants = {
    hidden: { width: '100%' },
    visible: {
      width: '0%',
      transition: {
        ease: 'circOut',
        duration: 1.2,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className="relative aspect-square h-full w-full md:max-h-[450px] md:max-w-[450px]"
    >
      <Image
        src="https://avatars.githubusercontent.com/u/113231287?s=400&u=d5756361d7ca19e86b44b75069ddca06283a1e05&v=4"
        alt={'profile picture'}
        fill
        priority
        sizes="100vw"
        className="aspect-square rounded object-contain"
      />
      <motion.div
        variants={profileImageVariants}
        initial="hidden"
        animate={controls}
        className="absolute h-full w-full bg-[var(--foreground)]"
      />
    </motion.div>
  )
}

const ProfileContent = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const profileContentVariants: Variants = {
    hidden: {
      x: 0.1,
    },
    visible: {
      x: 0,
      transition: {
        delay: 0.4,
        staggerChildren: 0.25,
        staggerDirection: 1,
        when: 'beforeChildren',
      },
    },
  }

  const profileContentChildVariants: Variants = {
    hidden: { x: 30, opacity: 0 },
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
      variants={profileContentVariants}
      initial="hidden"
      animate={controls}
      className="flex flex-col items-start space-y-4"
    >
      <motion.div
        variants={profileContentChildVariants}
        className="text-2xl font-semibold"
      >
        Hi, I&apos;m{' '}
        <span className="text-[var(--primary)]">Jenson Caparida</span>
      </motion.div>
      <div className="space-y-4 text-justify">
        <motion.div variants={profileContentChildVariants}>
          🌟 An aspiring software developer from the Philippines with a strong
          passion for learning and creating seamlessly interactive applications.
        </motion.div>
        <motion.div variants={profileContentChildVariants}>
          🎓 I graduated at Technological University of the Philippines in
          Cavite, Philippines with a Bachelor of Engineering Technology degree
          with a major in Computer Engineering Technology.
        </motion.div>
        <motion.div variants={profileContentChildVariants}>
          💻I am concentrating and expanding my expertise on software
          development using modern framework technologies. I&apos;m looking
          forward to learning more about other technologies. I am interested in
          learning about machine learning, generative artificial intelligence,
          and IoT in the future.
        </motion.div>
      </div>
      <motion.div variants={profileContentChildVariants}>
        <Link
          href="https://www.linkedin.com/in/jensoncaparida/details/certifications/"
          target="_blank"
        >
          <Button>
            Certicates
            <ArrowTopRightOnSquareIcon className="ml-2 size-4" />
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  )
}

const Experience = () => {
  return (
    <div className="w-full max-w-[800px] space-y-8">
      <div className="text-xl font-semibold uppercase">Experience</div>
      {/* timeline */}
      <div className="px-1">
        <Timeline
          role="QA SDET Intern"
          from="Jul"
          to="Nov 2024"
          company="E-Science Corporation (Alabang, Muntinlupa City, Metro Manila)"
          experiences={[
            'Conducted functional testing for web applications of the company.',
            'Collaborated with the team in daily stand-ups, sprint planning, grooming, retrospective as part of an Agile Scrum team.',
            'Updated existing automation scripts using pytest and selenium.',
            'Explored AI tools for use by the QA team to enhance efficiency and documented the findings',
          ]}
        />
      </div>
    </div>
  )
}

export default About
