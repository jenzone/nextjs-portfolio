'use client'

import React, { Suspense } from 'react'

const Spline = React.lazy(() => import('@splinetool/react-spline'))

export default function Particles() {
  return (
    <div>
      <Suspense fallback={<div></div>}>
        <Spline
          scene="https://prod.spline.design/nkwtlSRPG1soDv6w/scene.splinecode"
          className="absolute left-0 top-0 z-0"
        />
      </Suspense>
    </div>
  )
}
