"use client"
import axios from 'axios';
import React, { useState } from 'react';
import { LuMessageSquare } from "react-icons/lu";

function Page() {
  const [message , setMessage] = useState("")
  const [messages, setMessages] = useState([]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if (message) {
     
      const data = await axios.post('/api/ai/convertion',{message} ,{
      
      })
    console.log(data);
    
      setMessages([...messages, message]);
      e.target.reset();
    }
  };

  return (
    <section className="p-6 md:p-10 min-h-screen flex flex-col items-center">
      {/* AI Assistant Section */}
      <div className="border border-gray-500 shadow-md rounded-md flex flex-col md:flex-row items-center gap-3 p-5 mb-8 w-full max-w-4xl ">
        <LuMessageSquare className="text-blue-600 bg-blue-600/15 rounded-lg p-5 text-7xl" />
        <div className="flex flex-col gap-3 text-center md:text-left">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-200">Discuss Your Idea with AI</h1>
          <p className="text-gray-600">This is your AI assistant to help you improve your project ideas...</p>
        </div>
      </div>


        {/* Message Section */}
        <div className="border border-gray-500 p-5 w-full max-w-4xl  rounded-md shadow-md mb-8">
        <h2 className="text-gray-500 text-xl mb-5">Conversation Section</h2>

        {/* Show Messages Section */}
        <div className=" p-4 rounded-md mb-6 max-h-60 overflow-y-auto">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <p key={index} className="mb-2  p-3 rounded-md text-gray-700">{msg}</p>
            ))
          ) : (
            <p className="text-gray-500">No messages yet. Start the conversation!</p>
          )}
        </div>
        

      {/* Message Section */}
      
        <form className="flex flex-col md:flex-row items-start md:items-end">
          <textarea
            className="w-full md:flex-1 px-5 py-2 outline-none rounded-md border border-gray-700 bg-gray-500/10  resize-none"
            placeholder="Enter something..."
            rows="4"
            onChange={(e)=>setMessage(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            type="submit"
            className="mt-3 md:mt-0 md:ml-5 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
          >
            Ask
          </button>
        </form>
      </div>
      
    </section>
  );
}

export default Page;
