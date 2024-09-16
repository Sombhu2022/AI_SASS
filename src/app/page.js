"use client"
import { useUser } from '@clerk/nextjs';
import React from 'react'


 function page() {
  
  const { user , isLoaded , isSignedIn} = useUser()
 
  const handleUser = async()=>{
    await user.update({
      firstName:" pritam " , 
      lastName:" paul"
     })
  }
   
  console.log("all user data",user);
  
  
  return (
    <div>home page
     {isSignedIn? <p>{user.fullName}</p>:"not signed in"}
              <button onClick={handleUser}> click to change user info</button>
    </div>
  )
}

export default page