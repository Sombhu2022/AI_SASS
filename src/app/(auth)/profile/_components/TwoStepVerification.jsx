"use client";
import axios from "axios";
import { log } from "pdfmake/build/pdfmake";
import React, { useEffect, useState, useCallback } from "react";
import EmailVerifiCationPopup from "./EmailVerifiCationPopup";

function TwoStepVerification({ twoStepVerify, id, isVerify }) {
  const [isTwoStepAuth, setIsTwoStepAuth] = useState(false);
  const [isEmailVerifyShow, setIsEmailVerifyShow] = useState(false);
  const [isShowResend, setIsShowResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  

  useEffect(()=>{
    setIsTwoStepAuth(twoStepVerify)
  } , [twoStepVerify])

  // Function to handle two-step verification toggle
  const handleTwoStepToggle = useCallback(async () => {
    // If the user is not verified, show the email verification popup
    if (!isVerify) {
      setIsEmailVerifyShow(true);
    } else {
      setLoading(true);
      try {
        // Patch request to update the two-step authentication status if the user is verified
        const { data } = await axios.patch(`/api/auth/profile/${id}`, {
          isTwoStepAuth,
        });
        console.log("Two-Step Authentication Updated:", data);
      } catch (error) {
        setError("not update your two step verification status");
        console.error("Error updating Two-Step Authentication:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [isVerify, isTwoStepAuth, id]);

  // Toggle two-step authentication state
  const toggleTwoStepAuth = () => {
    // Trigger the popup or API request based on the verification status
    if (isVerify) {
      setIsTwoStepAuth((prev) => !prev);
    } else {
      setIsEmailVerifyShow(true); // Show the popup if the user is not verified
    }
  };

  // Trigger the two-step toggle effect on state change if user is verified
  useEffect(() => {
    if (isVerify && isTwoStepAuth !== twoStepVerify) {
      handleTwoStepToggle();
    }
  }, [isTwoStepAuth, handleTwoStepToggle, isVerify, twoStepVerify]);

  return (
    <div className="flex justify-evenly items-center mb-6 ">
      <span className="text-gray-500 font-medium">Two-Step Verification</span>

      <div className="flex flex-col gap-3  items-end">
        {/* Toggle Button */}
        <button
          className={`w-12 h-6 relative rounded-full transition-all ${
            isTwoStepAuth ? "bg-green-500" : "bg-gray-400"
          }`}
          onClick={toggleTwoStepAuth}
        >
          <span
            className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full transition-transform ${
              isTwoStepAuth ? "translate-x-[3px]" : "translate-x-[-18px]"
            }`}
          />
        </button>
        <span className="ml-3 text-sm font-medium text-gray-600">
          {isTwoStepAuth ? "Enabled" : "Disabled"}
        </span>
      </div>

      {/* Conditional Email Verification Popup */}

      <EmailVerifiCationPopup
        message={'Please verify your email to enable two-step authentication.'}
        isEmailVerifyShow={isEmailVerifyShow}
        isShowResend={isShowResend}
        onChangeEmailVerificationShow={(bool)=>setIsEmailVerifyShow(bool)}
        onChangeSowResend={(bool)=>setIsShowResend(bool)}
      />
    </div>
  );
}

export default TwoStepVerification;
