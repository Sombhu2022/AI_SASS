"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdModeEditOutline } from 'react-icons/md';
import EmailVerifiCationPopup from './EmailVerifiCationPopup';
import Notify from '@/utils/NotificationManager';
import { useRouter } from 'next/navigation';

function UserEmailAndName({userName , email , id , isVerify}) {
    const [editEmail, setEditEmail] = useState(false);
    const [editUsername, setEditUsername] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [isEmailVerifyShow, setIsEmailVerifyShow] = useState(false);
    const [isShowResend, setIsShowResend] = useState(false);
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState('')

    console.log(userName , email);
    const router = useRouter()

    useEffect(()=>{
        setNewEmail(email)
        setNewUsername(userName)
    },[email , userName])
    
  // Save email changes
  const handleSaveEmail = async () => {
    if(newEmail !== email){
      setLoading(true)
      try {
          const data = await axios.patch(`/api/auth/profile/${id}` , {email:newEmail})
          console.log(data);
          Notify.success(data.data.message)
          setEditEmail(false);
          window.location.reload()
      } catch (error) {
        Notify.error(error.message || 'profile not update')
        console.error("Error updating email:", error);
      }
      finally{
        setLoading(false)
      }

    }else{
      setEditEmail(false)
    }
  };

  // Save username changes
  const handleSaveUsername = async () => {
   if(newUsername !== userName){
    setLoading(true)
     try {
         const res = await axios.patch(`/api/auth/profile/${id}` , {userName:newUsername})
         console.log(res);
         Notify.success(res.data.message || 'profile updated')
         setEditUsername(false);
         window.location.reload()
     } catch (error) {
      Notify.error(error.message || 'Your Profile Not Update')
       console.error("Error updating username:", error);
     }
     finally{
      setLoading(false)
     }

   }else{
    setEditUsername(false)
   }
  };

  return (
    <div>
              {/* Editable Username */}
              <div className="text-center mb-4">
          {editUsername ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={newUsername}
                placeholder={userName}
                onChange={(e) => setNewUsername(e.target.value)}
                className="custom-input"
              />
              <button
                onClick={()=>handleSaveUsername('userName' , newUsername)}
                className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
               {loading?'loading...':'save'}
              </button>
            </div>
          ) : (
            <p className="text-gray-500 mb-4 cursor-pointer" onClick={() => setEditUsername(true)}>
              @{newUsername} <MdModeEditOutline className="inline-block text-gray-600" />
            </p>
          )}
        </div>

         {/* verify email popup section , if we try to verify our email then this popup show */}
         <EmailVerifiCationPopup
          message={
            'Please click the "Verify Email" button to confirm your email address. If you need to update your email, kindly do so before verifying.'
          }

         isEmailVerifyShow={isEmailVerifyShow}
         isShowResend={isShowResend}
         onChangeEmailVerificationShow={(bool)=>setIsEmailVerifyShow(bool)}
         onChangeSowResend={(bool)=>setIsShowResend(bool)}

        />

        {/* Editable Email */}
        <div className="text-center mb-6">
          {editEmail ? (
            <div className="flex gap-2">
              <input
                type="email"
                value={newEmail}
                placeholder={email}
                onChange={(e) => setNewEmail(e.target.value)}
                className="custom-input"
              />
              <button
                onClick={()=>handleSaveEmail('email' , newEmail)}
                className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                {loading?'loading...':'save'}
              </button>
            </div>
          ) : (
            <div className='flex flex-wrap gap-3  justify-center items-center'>

            <p className="cursor-pointer" onClick={() => setEditEmail(true)}>
            <span className="font-medium">{newEmail}</span> <MdModeEditOutline className="inline-block text-gray-600" />
            </p>
            {
              !isVerify &&(<button className='custom-button' onClick={()=>setIsEmailVerifyShow(true)} > Verify</button>)
            }
            </div>
          )}
        </div>

    </div>
  )
}

export default UserEmailAndName