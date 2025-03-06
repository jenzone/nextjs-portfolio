'use client'

import { useEffect, useMemo, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from '@tsparticles/engine'
// import { loadAll } from "@tsparticles/all"; // if `loadAll`, install the "@tsparticles/all" package too.
import { loadFull } from 'tsparticles' // if `loadFull`, install the "tsparticles" package too.
// import { loadSlim } from "@tsparticles/slim"; // if`loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if `loadBasic`, install the "@tsparticles/basic" package too.
import particlesConfig from '@/config/particles-nasa.json' // change type of particles on @/config directory

const BackgroundParticles = () => {
  const [init, setInit] = useState(false)

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 it can add only the features you need reducing the bundle size
      //await loadAll(engine);
      await loadFull(engine)
      // await loadSlim(engine)
      //await loadBasic(engine);
    }).then(() => {
      setInit(true)
    })
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
