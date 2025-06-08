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
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
        className="aspect-square rounded-sm object-contain"
      />
      <motion.div
        variants={profileImageVariants}
        initial="hidden"
        animate={controls}
        className="absolute h-full w-full bg-(--foreground)"
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
        <span className="text-(--primary)">Jenson Caparida</span>
      </motion.div>
      <div className="space-y-4 text-justify">
        <motion.div variants={profileContentChildVariants}>
          🌟 A software developer with a strong passion for learning, designing,
          problem solving and developing seamlessly interactive, scalable, and
          efficient applications, focusing on web technologies and user
          experience.
        </motion.div>
        <motion.div variants={profileContentChildVariants}>
          🎓 I am graduating student at Technological University of the
          Philippines in Cavite, Philippines with a Bachelor of Engineering
          Technology degree with a major in Computer Engineering Technology.
        </motion.div>
        <motion.div variants={profileContentChildVariants}>
          💻Currently, I am focusing and expanding my expertise on software
          development using modern technologies. I&apos;m looking forward to
          learning more about other technologies. I am also interested in
          learning about artificial intelligence, and IoT in the future.
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
            'Performed functional testing on the companys web application.',
            'Participated in daily stand-ups, sprint planning, grooming, retrospective as part of an Agile Scrum team.',
            'Updated existing automation scripts using pytest and selenium.',
            'Explored AI tools for use by the QA team to enhance efficiency and documented the findings',
          ]}
        />
        <Timeline
          role="Work Immersion Trainee"
          from="Jul 2019"
          to="10 days"
          company="Creotec Philippines Inc. (Dasmariñas, Cavite)"
          experiences={[
            'Assembled semiconductor components according to technical guidelines.',
            'Tested and inspected components to ensure functionality and quality of each component.',
            'Followed safety protocols and cleanroom procedures during assembly and testing processes.',
          ]}
        />
      </div>
    </div>
  )
}

export default About
