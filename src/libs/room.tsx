'use client'

import React, { Suspense } from 'react'

const Spline = React.lazy(() => import('@splinetool/react-spline'))

export default function Room() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Spline
        scene="https://prod.spline.design/IUEOp-DSdVldAZPy/scene.splinecode"
        className="hidden aspect-square md:flex"
      />
    </Suspense>
  )
}
