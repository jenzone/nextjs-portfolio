'use client'

import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface HeadingProps {
  heading: string
}

export const Heading: React.FC<HeadingProps> = ({ heading }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { y: 30, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: {
            duration: 1.2,
            ease: 'easeOut',
          },
        },
      }}
      initial="hidden"
      animate={controls}
      className="relative flex items-center justify-center"
    >
      {/* heading shadow */}
      <div
        style={{
          background:
            'linear-gradient(to bottom, rgba(37,36,34,1), rgba(204,197,185,1))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
        className="text absolute -top-4 cursor-default whitespace-nowrap text-4xl font-bold opacity-40 sm:text-5xl"
      >
        {heading}
      </div>
      {/* heading */}
      <div className="heading flex cursor-default items-center justify-center text-3xl font-bold sm:text-4xl">
        {heading}
      </div>
    </motion.div>
  )
}
