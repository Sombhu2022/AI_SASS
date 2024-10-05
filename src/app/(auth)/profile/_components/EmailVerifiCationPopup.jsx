"use client"

import PopupMessageBox from '@/components/PopupMessageBox'
import axios from 'axios'
import { useRouter } from 'next/navigation'



import React, { useState } from 'react'

function EmailVerifiCationPopup({ message ,isEmailVerifyShow , isShowResend , onChangeEmailVerificationShow , onChangeSowResend  }) {
    const [loading , setLoading ] = useState(false)
    const [error , setError] = useState('')

    const router = useRouter()

    const   heandleVerifyEmailRequest = async()=>{
     
        setLoading(true)
          try {
            const data = await axios.post('/api/auth/profile/verify-request')
            console.log(data);
            onChangeEmailVerificationShow(false)
            onChangeSowResend(true)
          } catch (error) {
            setError(' Faild to send verification Link')
            console.log(error);
            
          }
          finally{
            setLoading(false)
          }
      }

  return (
    <div>
        {isEmailVerifyShow ? (
        <div className="popup-container fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="border max-w-[500px] bg-gray-700/10 border-gray-700 p-6 rounded-lg shadow-lg">

            {/* Close button */}
            <div className="flex justify-end ">
            <button
              onClick={() => onChangeEmailVerificationShow(false)}
              className=""
            >
              <span className="text-3xl text-white mt-3">&times;</span>
            </button>
            </div>

            <h3 className="text-lg font-bold mb-4">Verify Your Email</h3>
            <p className="text-red-700 font-semibold mb-4">
              {message}
            </p>
            <button
              className="custom-button"
              onClick={heandleVerifyEmailRequest} 
            >
              { loading? 'loading...':'Verify Email'}
            </button>
          </div>
        </div>
      ):(
        isShowResend ?(
       
      <PopupMessageBox 
        topic='Verify Your Email'
        message=' A verification link has been sent to your email address. Please check your inbox and click the link to verify your account.'
        note={`If you didn't receive the email, you can request to resend it.`}
        buttonName={ loading? 'loading...':'Resend Verification Request'}
        onButtonClick={heandleVerifyEmailRequest}
        isButtonActive ={ false }
        onCallBackUrl = {()=>{ 
         window.location.reload() }}
      />
  
        ):("")
      )
    
    }
    </div>
  )
}

export default EmailVerifiCationPopup