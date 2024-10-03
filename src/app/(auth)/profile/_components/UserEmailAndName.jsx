"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdModeEditOutline } from 'react-icons/md';

function UserEmailAndName({userName , email , id}) {
    const [editEmail, setEditEmail] = useState(false);
    const [editUsername, setEditUsername] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [newUsername, setNewUsername] = useState('');

    console.log(userName , email);
    

    useEffect(()=>{
        setNewEmail(email)
        setNewUsername(userName)
    },[email , userName])
    
  // Save email changes
  const handleSaveEmail = async () => {
    try {
        const data = await axios.patch(`/api/auth/profile/${id}` , {email:newEmail})
        console.log(data);

      setEditEmail(false);
    } catch (error) {
      console.error("Error updating email:", error);
    }
  };

  // Save username changes
  const handleSaveUsername = async () => {
    try {
        const data = await axios.patch(`/api/auth/profile/${id}` , {userName:newUsername})
        console.log(data);
      setEditUsername(false);
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

  return (
    <div>
              {/* Editable Username */}
              <div className="text-center mb-4">
          {editUsername ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={newUsername}
                placeholder={userName}
                onChange={(e) => setNewUsername(e.target.value)}
                className="custom-input"
              />
              <button
                onClick={()=>handleSaveUsername('userName' , newUsername)}
                className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          ) : (
            <p className="text-gray-500 mb-4 cursor-pointer" onClick={() => setEditUsername(true)}>
              @{newUsername} <MdModeEditOutline className="inline-block text-gray-600" />
            </p>
          )}
        </div>

        {/* Editable Email */}
        <div className="text-center mb-6">
          {editEmail ? (
            <div className="flex gap-2">
              <input
                type="email"
                value={newEmail}
                placeholder={email}
                onChange={(e) => setNewEmail(e.target.value)}
                className="custom-input"
              />
              <button
                onClick={()=>handleSaveEmail('email' , newEmail)}
                className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          ) : (
            <p className="cursor-pointer" onClick={() => setEditEmail(true)}>
              Email: <span className="font-medium">{newEmail}</span> <MdModeEditOutline className="inline-block text-gray-600" />
            </p>
          )}
        </div>

    </div>
  )
}

export default UserEmailAndName