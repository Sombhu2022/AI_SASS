"use client";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import EmailVerifiCationPopup from "./EmailVerifiCationPopup";
import Notify from "@/utils/NotificationManager";

function TwoStepVerification({ twoStepVerify, id, isVerify }) {
  const [isTwoStepAuth, setIsTwoStepAuth] = useState(twoStepVerify);
  const [isShowTwoStepAuth, setIsShowTwoStepAuth] = useState(twoStepVerify); 
  const [isEmailVerifyShow, setIsEmailVerifyShow] = useState(false);
  const [isShowResend, setIsShowResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false); 

  // Update the states on component mount or if the props change
  useEffect(() => {
    setIsTwoStepAuth(twoStepVerify);
    setIsShowTwoStepAuth(twoStepVerify);
  }, [twoStepVerify]);

  // Function to handle the API call to update the two-step authentication status
  const handleTwoStepToggle = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.patch(`/api/auth/profile/${id}`, {
        isTwoStepAuth,
      });
      console.log(data)
      Notify.success(
        data?.data.isTwoStepAuth
          ? "Two-Step Verification is ON, providing extra security."
          : "Two-Step Verification is OFF."
      );
      setIsShowTwoStepAuth(data.data.isTwoStepAuth); // Set the updated value
    } catch (error) {
      setError("Failed to update your two-step verification status." , error.response.data.message);
      const message = "Something went wrong! , please try again";
      Notify.error(message);
      console.error("Error updating Two-Step Authentication:", error);
    } finally {
      setLoading(false);
    }
  }, [isTwoStepAuth, id]);

  // Toggle the two-step authentication on button click
  const toggleTwoStepAuth = () => {
    if (!isVerify) {
      setIsEmailVerifyShow(true); // Show email verification popup if user is not verified
    } else {
      setIsTwoStepAuth((prev) => !prev); // Toggle the state locally
      setHasInteracted(true)
    }
  };

  // Trigger the API call when the state changes and it differs from the original `twoStepVerify` value
  useEffect(() => {
    if (isVerify && hasInteracted) {
      handleTwoStepToggle(); // Call the API only when the user makes changes
    }
  }, [isTwoStepAuth, twoStepVerify, isVerify, handleTwoStepToggle]);

  return (
    <div className="flex justify-evenly items-center mb-6">
      <span className="text-gray-500 font-medium">Two-Step Verification</span>

      <div className="flex flex-col gap-3 items-end">
        {/* Toggle Button */}
        <button
          className={`w-12 h-6 relative rounded-full transition-all ${
            isShowTwoStepAuth ? "bg-green-500" : "bg-gray-400"
          }`}
          onClick={toggleTwoStepAuth}
          disabled={loading} // Disable the button while loading
        >
          <span
            className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full transition-transform ${
              isShowTwoStepAuth ? "translate-x-[2px]" : "translate-x-[-18px]"
            }`}
          />
        </button>
        <span className="ml-3 text-sm font-medium text-gray-600">
          {isShowTwoStepAuth ? "Enabled" : "Disabled"}
        </span>
      </div>

      {/* Conditional Email Verification Popup */}
      <EmailVerifiCationPopup
        message={"Please verify your email to enable two-step authentication."}
        isEmailVerifyShow={isEmailVerifyShow}
        isShowResend={isShowResend}
        onChangeEmailVerificationShow={(bool) => setIsEmailVerifyShow(bool)}
        onChangeSowResend={(bool) => setIsShowResend(bool)}
      />
    </div>
  );
}

export default TwoStepVerification;
