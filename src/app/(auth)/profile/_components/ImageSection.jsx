"use client"
import React, { useEffect, useState } from 'react'
import { MdModeEditOutline } from 'react-icons/md'

function ImageSection({image_url , fullName , id}) {
    const [image , setImage] = useState('')
 
    
     useEffect(()=>{
       setImage(image_url)
     },[image_url])

     // Handle Image Change
    const handleImageChange = async () => {
    try {
      alert("Image change!");
    } catch (error) {
      console.error("Error updating image:", error);
    }
  };


  return (
    <div className="flex justify-center mb-6">
          <img
            className="rounded-full w-32 h-32 object-cover border border-purple-600/10 border-spacing-5"
            src={image}
            alt={`${fullName} profile`}
          />
          <MdModeEditOutline
            onClick={handleImageChange}
            className="place-self-end mb-6 ml-[-20px] border border-gray-800  p-2 rounded-full bg-slate-600 text-[30px]"
          />
        </div>
  )
}

export default ImageSection