"use client";
import React, { useEffect } from "react";
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
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

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
  const route = useRouter();

  const { user, isAuthenticated, message } = useSelector((state) => state.user);

  return (
    <header className="header ">
      <div className="flex justify-between w-full">
        <h1 className="flex gap-3 items-center ">
          <RiRobot3Line className="text-pink-600 text-3xl rounded-md" />
          <span> ThinkCraft.ai </span>
        </h1>

        <div className="flex justify-between gap-5">
          {/* Mobile Authentication Section */}
          <div className="md:hidden flex items-center gap-2 text-white">
            {/* profile section */}
            {isAuthenticated ? (
              <Link href={"/profile"}>
                <img
                  src={user?.profile_pic?.url}
                  className="h-6 w-6 rounded-full"
                />
              </Link>
            ) : (
              <Link
                href={"/sign-in"}
                className="rounded-md hover:text-white hover:bg-slate-600 bg-white text-black py-2 px-5"
              >
                Login
              </Link>
            )}
          </div>

          {/* Hamburger Menu */}
          <div className="md:hidden flex ">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? <IoMdClose /> : <RxHamburgerMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar for larger screens */}
      <nav className={`${isOpen ? "block " : "hidden"} `}>
        <div
          className={`nav-inner  ${
            isOpen ? " popup-container h-[100vh] w-[100vw] " : ""
          }`}
        >
          <div
            className={`flex flex-col gap-5 ${
              isOpen
                ? " justify-center  border border-gray-600 bg-gray-900 p-5 shadow-md rounded-md "
                : ""
            }`}
          >
            {isOpen && (
              <button
                onClick={() => setIsOpen(false)}
                className="mr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <span className="text-3xl text-white mt-3">&times;</span>
              </button>
            )}

            {links.map((ele, index) => (
              <Link
                href={ele.link}
                key={index}
                className="flex gap-2 items-center p-2 text-gray-400 hover:bg-slate-500/10 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <b className={`${ele.iconbg} ${ele.iconColor} p-2 rounded-md`}>
                  {" "}
                  {ele.icon}{" "}
                </b>
                <span> {ele.name} </span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
