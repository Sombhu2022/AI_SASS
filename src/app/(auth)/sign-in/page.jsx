"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { RiRobot3Line } from "react-icons/ri";
import AuthProviders from "@/components/AuthProviders";
import OtpVerificationSection from "./_components/OtpVerificationSection";
import SpinnerLoader from "@/components/SpinnerLoader";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "@/store/user/userController";
import Notify from "@/utils/NotificationManager";
import { resetState } from "@/store/user/userSlice";

export default function Page() {
  const router = useRouter();
  const [emailOrUserName, setEmailOrUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [authId, setAuthId] = useState(""); // For storing authId after login
  const [remainingTime, setRemainingTime] = useState(300); // Default 5 minutes in seconds

  const dispatch = useDispatch();
  const { user, loading, message, status, isTwoStepAuth } = useSelector(
    (state) => state.user
  );

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!emailOrUserName || !password) {
      setError("Email or Username and password are required");
      return;
    }

    dispatch(LoginUser({ authId: emailOrUserName, password }));
  };

  useEffect(() => {
    if (status.loginUser === "success" && isTwoStepAuth) {
      setAuthId(emailOrUserName); // Store the authId for OTP submission

      const expireTime = user.otpExpireTime || Date.now() + 5 * 60 * 1000; // 5 minutes from now
      setRemainingTime(Math.floor((expireTime - Date.now()) / 1000)); // Convert to seconds
    } else if (status.loginUser === "success") {
      console.log("success");

      router.push("/dashboard");
    } else if (status.loginUser === "rejected") {
      Notify.error(message);
      setError(message);

      router.push("/");
    }

    return () => {
      dispatch(resetState());
    };
  }, [status, user]);

  useEffect(() => {}, []);

  const handleClose = () => {
    router.back();
  };

  return (
    <div className="popup-container">
      <div className="relative shadow-lg rounded-lg p-8 max-w-md w-full border border-gray-600 bg-gray-600/10">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <span className="text-3xl text-white mt-3">&times;</span>
        </button>

        <h1 className="flex justify-center items-center gap-3 p-5 mb-3">
          <RiRobot3Line className="text-pink-600 text-3xl rounded-md" />
          <span>Thinkcraft.AI</span>
        </h1>

        {!isTwoStepAuth ? (
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <input
                type="text"
                name="emailOrUserName"
                placeholder="Email Or UserName"
                value={emailOrUserName}
                onChange={(e) => setEmailOrUserName(e.target.value)}
                required
                className="custom-input"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="custom-input"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button type="submit" className="w-full custom-button">
              {loading.loginLoading ? (
                <div className="flex gap-3 justify-center items-center">
                  Loading...
                  <SpinnerLoader />
                </div>
              ) : (
                "Login"
              )}
            </button>
            <p className="mt-4 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <a href="/sign-up" className="text-indigo-600 hover:underline">
                Sign up
              </a>
            </p>

            <br />

            {/* Oauth providers */}
            <AuthProviders />
          </form>
        ) : (
          // otp verification section
          <OtpVerificationSection timer={remainingTime} authId={authId} />
        )}
      </div>
    </div>
  );
}
