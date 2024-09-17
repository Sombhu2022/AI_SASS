"use client"
import React from 'react'
import Link from "next/link";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import { MdSpaceDashboard } from "react-icons/md";
import { LuMessageSquare } from "react-icons/lu";
import { FaImage } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";
import { FaCode } from "react-icons/fa6";
import { RiRobot3Line } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";

import { useState } from "react";


function Header() {

  const links = [
    {
      name: "Dashboard",
      icon: <MdSpaceDashboard />,
      iconColor: "text-purple-600",
      iconbg: "bg-purple-600/10",
      link: "/dashboard",
    },
    {
      name: "Convertion",
      icon: <LuMessageSquare />,
      iconColor: "text-blue-600",
      iconbg: "bg-blue-600/10",
      link: "/convertion",
    },
    {
      name: "Image generation",
      icon: <FaImage />,
      iconColor: "text-amber-600",
      iconbg: "bg-amber-600/10",
      link: "/image",
    },
    {
      name: "Code Generation",
      icon: <FaCode />,
      iconColor: "text-green-600",
      iconbg: "bg-green-600/10",
      link: "/code",
    },
    {
      name: "Video Generation",
      icon: <FaVideo />,
      iconColor: "text-pink-500",
      iconbg: "bg-pink-600/10",
      link: "/video",
    },
    {
      name: "Setting",
      icon: <IoSettingsSharp />,
      iconColor: "text-gray-200",
      iconbg: "bg-gray-200/10",
      link: "/setting",
    },
  ];
  
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">

      <div className='flex justify-between w-full'>

      <h1 className="flex gap-3 items-center ">
      <RiRobot3Line className="text-pink-600 text-3xl rounded-md" /> 
      <span> AI_SAAS </span>
    </h1>

     <div className='flex justify-between gap-5' >

     {/* Mobile Authentication Section */}
    <div className="md:hidden flex items-center gap-2">
      <SignedOut>
        <SignInButton className="py-1 px-3 border rounded-lg text-gray-800 bg-gray-200" />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      </div>

    {/* Hamburger Menu */}
    <div className="md:hidden flex ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white focus:outline-none"
      >
        {
          isOpen? <IoMdClose/>:<RxHamburgerMenu/>
        }
        
        
      </button>
    </div>

     </div>

  
      
      </div>
    

    {/* Sidebar for larger screens */}
    <nav
      className={`${
        isOpen ? "block" : "hidden"
      } `}
    >
      {links.map((ele, index) => (
        <Link
          href={ele.link}
          key={index}
          className="flex gap-2 items-center p-2 text-gray-400 hover:bg-slate-500/10 hover:text-white"
        
        >
          <b className={`${ele.iconbg} ${ele.iconColor} p-2 rounded-md`}> {ele.icon} </b>
          <span > {ele.name} </span>
        </Link>
      ))}
    </nav>
  </header>
  )
}

export default Header