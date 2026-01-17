'use client'

import { useEffect, useMemo, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { type ISourceOptions } from '@tsparticles/engine'

import { loadSlim } from '@tsparticles/slim'
import particlesConfig from '@/config/particles-nasa.json'

const BackgroundParticles = () => {
  const [init, setInit] = useState(false)

  useEffect(() => {
    let isMounted = true

    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      if (isMounted) {
        setInit(true)
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  // const particlesLoaded = async (container?: Container): Promise<void> => {
  //   console.log(container)
  // }

  const options = useMemo(() => particlesConfig as ISourceOptions, [])

  if (init) {
    return (
      <Particles
        id="tsparticles"
        // particlesLoaded={particlesLoaded}
        options={options}
        className="fixed z-0 h-full w-full object-contain"
      />
    )
  }

  return <></>
}

export default BackgroundParticles
