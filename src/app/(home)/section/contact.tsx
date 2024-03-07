'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { motion, Variants, useAnimation, useInView } from 'framer-motion'

import ContactForm from '@/components/contact-form'
import { Heading } from '@/components/ui/heading'
import Room from '@/libs/room'

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const contactVariants: Variants = {
    hidden: { x: 40, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={contactVariants}
      initial="hidden"
      animate={controls}
      className="items-center justify-between space-x-8 py-16 md:flex"
    >
      {/* <div className="hidden w-full items-center justify-center md:flex">
        <div className="relative aspect-square h-full max-h-[400px] w-full max-w-[400px]">
          <Image
            src="/contact-logo.png"
            alt="contact-logo"
            width={320}
            height={320}
            className="relative left-8 top-8 z-10 aspect-square object-contain"
          />
          <Image
            src="/bg-contact-left.png"
            alt="bg-contact-left"
            fill
            sizes="(min-width: 640px) 320px, 100vw"
            className="aspect-square object-contain"
          />
        </div>
      </div> */}
      <Room />
      <div className="flex w-full flex-col justify-center space-y-12">
        <Heading heading="Contact Me" />
        <motion.div variants={contactVariants}>
          <ContactForm />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Contact
