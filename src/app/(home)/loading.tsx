'use client'

import { ThreeDots } from 'react-loader-spinner'

export default function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <ThreeDots
        visible={true}
        height="100"
        width="100"
        color="#ff7e3d"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  )
}
