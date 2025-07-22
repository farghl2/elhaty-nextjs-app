import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href={'/'} className="text-xl font-bold text-muted">
          <span>SpeedOrders



          </span>
          <span className="text-2xl inline-block  animate-wiggle">X</span>
        </Link>
  )
}

export default Logo