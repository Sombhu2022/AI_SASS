"use client"
import React from 'react'
import Link from "next/link";
// import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

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
import { useRouter } from 'next/navigation';




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
      link: "/ai/convertion",
    },
    {
      name: "Image generation",
      icon: <FaImage />,
      iconColor: "text-amber-600",
      iconbg: "bg-amber-600/10",
      link: "/ai/image",
    },
    {
      name: "Code Generation",
      icon: <FaCode />,
      iconColor: "text-green-600",
      iconbg: "bg-green-600/10",
      link: "/ai/code",
    },
    {
      name: "Video Generation",
      icon: <FaVideo />,
      iconColor: "text-pink-500",
      iconbg: "bg-pink-600/10",
      link: "/ai/video",
    },
    {
      name: "Setting",
      icon: <IoSettingsSharp />,
      iconColor: "text-gray-200",
      iconbg: "bg-gray-200/10",
      link: "/profile",
    },
  ];
  
  const [isOpen, setIsOpen] = useState(false);
  const route = useRouter()

  return (
    <header className="header ">

      <div className='flex justify-between w-full'>

      <h1 className="flex gap-3 items-center ">
      <RiRobot3Line className="text-pink-600 text-3xl rounded-md" /> 
      <span> ThinkCraft.ai </span>
    </h1>

     <div className='flex justify-between gap-5' >

     {/* Mobile Authentication Section */}
    <div className="md:hidden flex items-center gap-2">
      
       {/* profile section */}


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
        isOpen ? "block " : "hidden"
      } `}
    >
      <div className={`flex flex-col gap-5 ${isOpen? 'popup-container justify-center items-start':''}`}>
       {
        isOpen&&(
         <button
         onClick={()=>setIsOpen(false)}
         className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
         >
         <span className="text-3xl text-white mt-3">&times;</span>
       </button>
        )
       }
      
      {links.map((ele, index) => (
        <Link
          href={ele.link}
          key={index}
          className="flex gap-2 items-center p-2 text-gray-400 hover:bg-slate-500/10 hover:text-white"
          onClick={()=>setIsOpen(false)}
        >
          <b className={`${ele.iconbg} ${ele.iconColor} p-2 rounded-md`}> {ele.icon} </b>
          <span > {ele.name} </span>
        </Link>
      ))}
      </div>
    </nav>
  </header>
  )
}

export default Header