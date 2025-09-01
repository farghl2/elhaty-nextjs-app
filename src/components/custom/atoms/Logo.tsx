import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href={'/'} className="sm:text-xl font-bold flex items-center justify-center  text-white">
          {/* <span>SpeedOrders
          </span> */}

        {/* <span className="text-2xl inline-block  animate-wiggle">X</span> */}

        <Image src={'/logo.avif'} alt='logo' width={72} height={62} />
        <span className='text-white'>الحاتي | Elhaty</span>

        </Link>
  )
}

export default Logo