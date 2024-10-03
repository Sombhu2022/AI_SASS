"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function TwoStepVerification({twoStepVerify , id } ) {
    const [isTwoStepAuth , setIsTwoStepAuth] = useState(false)

    useEffect(()=>{
        setIsTwoStepAuth(twoStepVerify)
    },[])
      // Handle Two-Step Verification Toggle
  const handleTwoStepToggle =async() => {
    try {
        const data = await axios.patch(`/api/auth/profile/${id}` , {isTwoStepAuth})
        // Make a call to update the status in the backend if needed
        console.log(data);
        
    } catch (error) {
        console.log(error);
        
    } 
  };

  useEffect(()=>{
     handleTwoStepToggle()
  }, [isTwoStepAuth])

  return (
    <div className="flex justify-between items-start mb-6">
    <span className="text-gray-500 font-medium">Two-Step Verification</span>
    <div className='flex flex-col gap-3 justify-center items-center'>
    <button
      className={`w-12 h-6 relative rounded-full transition-all ${
        isTwoStepAuth ? "bg-green-500" : "bg-gray-400"
      }`}
      onClick={()=>setIsTwoStepAuth(!isTwoStepAuth)}
    >
      <span
        className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full transition-transform ${
          isTwoStepAuth ? "translate-x-[3px]" : "translate-x-[-18px]"
        }`}
      ></span>
    </button>
    <span className="ml-3 text-sm font-medium text-gray-600">
      {isTwoStepAuth ? "Enabled" : "Disabled"}
    </span>
    </div>
  </div>
  )
}

export default TwoStepVerification