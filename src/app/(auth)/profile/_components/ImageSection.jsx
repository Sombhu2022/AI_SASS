"use client";
import SpinnerLoader from "@/components/SpinnerLoader";
import Notify from "@/utils/NotificationManager";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { MdModeEditOutline } from "react-icons/md";

function ImageSection({ image_url, fullName, id }) {
  const [image, setImage] = useState(image_url);
  const [loading, setLoading] = useState(false);

  const fileHandle = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      handleImageChange(reader.result); // Pass the base64 image string directly
    };
    reader.readAsDataURL(file);
  };

  const handleImageChange = useCallback(
    async (newImage) => {
      const isConfirmed = window.confirm(
        "Are you sure you want to update your Profile Picture?"
      );
      if (!isConfirmed) return;

      try {
        setLoading(true);
        const res = await axios.post(
          `/api/auth/profile/profile-pic-change/${id}`,
          JSON.stringify({ image: newImage })
        );

        setImage(res.data.data.image); // Update the image
        Notify.success("Profile picture updated successfully!");
      } catch (error) {
        Notify.error("Error: Profile picture not updated.");
        console.error("Error updating image:", error);
      } finally {
        setLoading(false);
      }
    },
    [id]
  );

  useEffect(() => {
    setImage(image_url); // Update image URL when the prop changes
  }, [image_url]);

  return (
    <div className="flex justify-center mb-6">
      {/* Profile Image */}
      <img
        className="rounded-full w-32 h-32 object-cover border border-purple-600/10"
        src={image}
        alt={`${fullName} profile`}
      />

      {/* Edit Icon */}
      <label
        htmlFor="image"
        className="cursor-pointer place-self-end mb-6 ml-[-20px] border rounded-full border-gray-800 p-2 bg-gray-700"
      >
        {loading ? <SpinnerLoader /> : <MdModeEditOutline />}
      </label>

      {/* File Input */}
      <input
        id="image"
        type="file"
        accept="image/*"
        onChange={fileHandle}
        className="hidden"
      />
    </div>
  );
}

export default ImageSection;
