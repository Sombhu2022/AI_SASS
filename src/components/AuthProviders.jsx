"use client"

import { signIn } from 'next-auth/react';
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { RxGithubLogo } from 'react-icons/rx'

function AuthProviders() {

    const handleSignUp = (provider) => {
        // signIn(provider, { callbackUrl: "/convertion", userName });
        alert(`login by ${provider} fetures are comming  soon !`)
      };

  return (
    <div className="flex justify-between ">

    <button
     onClick={() => handleSignUp("google")}
     className="bg-gray-600/10 text-white  p-2 px-5 rounded mb-2 flex flex-wrap justify-center items-center gap-4"
   >
   <FcGoogle className="size-6"/>
    Google
   </button>
   <button
     onClick={() => handleSignUp("github")}
     className="bg-gray-600/10 text-white p-2 px-5 rounded mb-2 flex justify-center items-center gap-4"
   >
     <RxGithubLogo className="size-6"/>
      GitHub
   </button>

    </div>

  )
}

export default AuthProviders