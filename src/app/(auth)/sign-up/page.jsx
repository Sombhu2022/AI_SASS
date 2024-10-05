"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaImage } from "react-icons/fa";
import { RiRobot3Line } from "react-icons/ri";
import Image from "next/image";
import AuthProviders from "@/components/AuthProviders";
import SpinnerLoader from "@/components/SpinnerLoader";



export default function SignUp() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [loading , setLoading] = useState(false)

  const fileHandle = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !userName) {
      setError("All fields are required");
      return;
    }

    const data = {
      userName,
      fullName,
      email,
      password,
    };

    try {
      setError("")
      setLoading(true)
      const response = await axios.post(
        "/api/auth/signup",
        JSON.stringify(data)
      );
      console.log(response);

      if (response.data.success) {
        router.push("/ai/convertion");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      console.log(err);
    }finally{
      setLoading(false)
    }

  };


  // Close the modal and navigate back to the previous page
  const handleClose = () => {
    router.back(); // This will take you to the previous page
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
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

        {/* sign-up form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="userName"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="custom-input"
            />
          </div>
          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="custom-input"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <button type="submit" className="w-full custom-button mt-10">
            {loading?(<div className="flex gap-2 justify-center items-center">Loading... <SpinnerLoader/></div>):("Register")}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/sign-in" className="text-indigo-600 hover:underline">
            Login
          </a>
        </p>
        <br />

         {/* OAuth Providers */}
         <AuthProviders/>
     
      </div>
    </div>
  );
}
