"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import PopupMessageBox from "@/components/PopupMessageBox";

function VerifyEmail() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // To navigate after success

  const { verifyToken } = useParams();

  const handleTokenVerification = async () => {
    try {
      setLoading(true);
      await axios.post(`/api/auth/profile/email-verify/${verifyToken}`);
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (verifyToken) {
      handleTokenVerification();
    }
  }, [verifyToken]);

  return (
    <>
      {loading ? (
        // Loading animation
        <Loader message="Verify your Email ..." />
      ) : isSuccess ? (
        // Success message
        <PopupMessageBox
          message={
            "Your email has been verified. You can now continue using your account."
          }
          type={'success'}
          topic={'Email Verified Successfully!'}
          buttonName={'continue'} 
        />
      ) : (
        // Error message
        <PopupMessageBox
          message={
            "Sorry, we couldn't verify your email. Please try again later or contact support."
          }
          type={'error'}
          topic={' Verification Failed!'}
          buttonName={'Go to Home'}

        />
        
      )}
    </>
  );
}

export default VerifyEmail;
