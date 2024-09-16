import { SignUp } from '@clerk/nextjs'
import React from 'react'

function page() {
  return (
    <div className='flex justify-center items-center h-[100vh]'>
      <SignUp/>
    </div>
  )
}

export default page