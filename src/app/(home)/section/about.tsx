'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { motion, Variants, useAnimation, useInView } from 'framer-motion'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'

import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'

const About = () => {
  return (
    <motion.div className="space-y-16 py-16">
      <Heading heading="About Me" />
      <div className="grid h-full w-full grid-cols-1 gap-8 sm:gap-12 md:grid-cols-2">
        <ProfileImage />
        <ProfileContent />
      </div>
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
      className="relative aspect-square h-full w-full md:max-h-[400px] md:max-w-[400px]"
    >
      <Image
        src="https://avatars.githubusercontent.com/u/113231287?s=400&u=d5756361d7ca19e86b44b75069ddca06283a1e05&v=4"
        alt={'profile picture'}
        fill
        className="aspect-square rounded object-contain"
      />
      <motion.div
        variants={profileImageVariants}
        initial="hidden"
        animate={controls}
        className="absolute h-full w-full bg-[var(--text-100)]"
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
      className="space-y-8"
    >
      <motion.h2
        variants={profileContentChildVariants}
        className="text-2xl font-semibold"
      >
        Hi, I&apos;m{' '}
        <span className="text-[var(--primary-200)]">Jenson Caparida</span>
      </motion.h2>
      <div className="space-y-4 text-justify text-lg">
        <motion.p variants={profileContentChildVariants}>
          🌟 I&apos;m a Full-Stack Developer based on Philippines with a strong
          passion for creating creative, responsive, and well-designed web apps
          for great user experiences.
        </motion.p>
        <motion.p variants={profileContentChildVariants}>
          🎓 I currently enrolled at Technological University of the Philippines
          in Cavite Philippines with a Bachelor of Engineering Technology degree
          with a major in Computer Engineering Technology.
        </motion.p>
        <motion.p variants={profileContentChildVariants}>
          💻 I am concentrating and expanding my expertise on web development
          using modern web framework technolgies such as ReactJS, NextJS and
          ExpressJS. I'm looking forward to learning more about other
          technologies and frameworks.
        </motion.p>
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

export default About
