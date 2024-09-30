"use client"
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaImage } from "react-icons/fa";
import { RiRobot3Line } from "react-icons/ri";
import Image from "next/image";

export default function page() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image , setImage] = useState("")

  const [error, setError] = useState("");

 
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

    if (!image || !email || !password || !userName) {
      setError("all field are required")
    }


    const data = {
      userName ,
      fullName ,
      email ,
      password ,
      image
    }
    try {
      const response = await axios.post("/api/auth/signup", JSON.stringify(data));
      console.log(response);
      
      if (response.data.success) {
        router.push("/convertion");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      console.log(err);
      
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  text-gray-300">
      <div className=" shadow-lg rounded-lg p-8 max-w-md w-full border border-gray-600 bg-gray-600/10">
      <h1 className="flex justify-center items-center gap-3 p-5 mb-3 ">
      <RiRobot3Line className="text-pink-600 text-3xl rounded-md" /> 
      <span> Thinkcraft.AI </span>
    </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="image" className=""> 
            {
              image?(<Image src={image} width={70} height={70} className="rounded-full"/>):
              (<div className="text-[40px] p-10 g-purple-600/10 text-purple-600 rounded-md max-w-min"> <FaImage/></div> )
            }
            
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              name="image" 
              onChange={fileHandle}
              required
              className="hidden"
            />
          </div>
          <div>
            <input
              type="text"
              name="userName"
              placeholder="Username"
              value={userName}
              onChange={(e)=>setUserName(e.target.value)}
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
              onChange={(e)=>setFullName(e.target.value)}
              className="custom-input"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
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
              onChange={(e)=>setPassword(e.target.value)}
              required
              className="custom-input"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full custom-button"
          > 
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
