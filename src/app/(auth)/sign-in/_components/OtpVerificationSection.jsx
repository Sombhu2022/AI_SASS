"use client"
import SpinnerLoader from '@/components/SpinnerLoader';
import { verifyTwoStepAuthOTP } from '@/store/user/userController';
import axios from 'axios';
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function OtpVerificationSection({timer , authId }) {

  const [otp, setOtp] = useState(""); // For OTP verification
  const [remainingTime, setRemainingTime] = useState(timer); // Default 5 minutes in seconds
  const [error, setError] = useState("");
  

  
  const router = useRouter()
  const dispatch = useDispatch()
  const { user , loading , message , status } = useSelector((state)=> state.user)
    
    const handleResendOtp = async () => {
        try {
          setError("")
          const response = await axios.post("/api/auth/send-otp", {
            authId,
          });
    
          if (response.data.success) {
            const newExpireTime = Date.now() + 5 * 60 * 1000; // Set new expiration time (5 minutes from now)
            const newTimer = Math.floor((newExpireTime - Date.now()) / 1000); // Convert to seconds
            setRemainingTime(newTimer)
            
            setError("")
          } else {
           
            setError( "OPT not send successfully ! ")
          }
        } catch (err) {
         
          setError("Somthing Error 1 Please try again .")
          console.log(err);
        }
      };

      const handleOtpVerification = async (e) => {
        e.preventDefault();
    
        if (!otp) {
          setError("OTP is required");
          return;
        }
    
       dispatch(verifyTwoStepAuthOTP({authId , otp}))
          
      };

      useEffect(()=>{
          if(status.verifyOTP === 'success') router.back()
          if(status.verifyOTP === 'rejected') setError(message)
      },[status])


       // Timer effect for OTP
  useEffect(() => {
    
    const timer = setInterval(() => {
      setRemainingTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount or when time expires
  }, [remainingTime]);


  return (
    <form onSubmit={handleOtpVerification} className="space-y-4">
    <p className="text-sm text-gray-500">
      A two-step verification OTP has been sent to your email. Please
      enter the OTP below.
    </p>
    <div>
      <input
        type="number"
        name="otp"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
        className="custom-input"
      />
    </div>

    {error && <p className="text-red-500 text-sm">{error}</p>}

    {/* Timer Display */}
    <div className="text-sm text-gray-500">
      {remainingTime > 0 ? (
        <p>
          Time remaining: {Math.floor(remainingTime / 60)}:
          {(remainingTime % 60).toString().padStart(2, "0")}
        </p>
      ) : (
        <div className="flex justify-between">
          <p className="text-red-500">OTP expired!</p>
          <p
            onClick={handleResendOtp}
            className=" text-blue-600 bg-none cursor-pointer"
          >
            {" "}
            Resend OTP{" "}
          </p>
        </div>
      )}
    </div>

    <button
      type="submit"
      className="w-full custom-button"
      disabled={remainingTime <= 0}
    >
      {loading.verifyOTPLoading?(<div className='flex justify-center items-center gap-3'>Loading...<SpinnerLoader/></div>):'Verify OTP'}
    </button>
  </form>
  )
}

export default OtpVerificationSection