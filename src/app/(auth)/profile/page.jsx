"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import ImageSection from "./_components/ImageSection";
import UserEmailAndName from "./_components/UserEmailAndName";
import TwoStepVerification from "./_components/TwoStepVerification";
import Loader from "@/components/Loader";



const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [loading , setLoading] = useState(true)
  

  const router = useRouter();

  // Function to fetch the user profile
  const fetchUserProfile = async () => {
    setLoading(true)
    try {
      const res = await axios.get("/api/auth/profile");
      console.log(res);
      setUser(res.data.data.user);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
    finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleLogOut = async () => {
    try {
      
      const data = await axios.get("/api/auth/logout");
      console.log(data);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  if(loading){
    return(<Loader message="Fetch User ..."/> )
  }

  const handleCustom = (value) => {
    alert(value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className=" rounded-lg shadow-lg p-8 w-full max-w-lg">
        {/* Profile Picture */}
        <ImageSection image_url={user?.profile_pic?.url} id={user?._id} />

        {/* User Information */}
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
          {user?.fullName}
        </h2>

        {/* user and email section */}
        <UserEmailAndName
          userName={user?.userName}
          email={user?.email}
          id={user?._id}
          isVerify={user?.isVerify}
        />

        {/* Membership Status */}
        <p className="text-center text-gray-700 mb-6">
          Membership:{" "}
          <span
            className={`font-medium ${
              user?.isPrimeMember ? "text-green-500" : "text-yellow-500"
            }`}
          >
            {user?.isPrimeMember ? "Prime Member" : "Free Member"}
          </span>
        </p>

       

        {/* Two-Step Verification Toggle */}
        <TwoStepVerification
          twoStepVerify={user?.isTwoStepAuth}
          id={user?._id}
          isVerify={user?.isVerify}
        />


        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button className="custom-button">
            Update Profile
          </button>
          <button
            onClick={handleLogOut}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
