import React from 'react'
import { LuMessageSquare } from "react-icons/lu";

function HeadingSection() {
  return (
   <div className=" heading-section ">
   <LuMessageSquare className="text-blue-600 bg-blue-600/15 rounded-lg p-5 text-7xl" />
   <div className="flex flex-col gap-3 text-center md:text-left">
     <h1 className="text-xl md:text-2xl font-semibold text-gray-200">
       Discuss Your Idea with AI
     </h1>
     <p className="text-gray-600">
       This is your AI assistant to help you improve your project ideas...
     </p>
   </div>
 </div>
  )
}

export default HeadingSection