"use client"

import React, { useState } from 'react'
import axios from "axios";
import MarkDownTextFormater from '@/components/MarkDownTextFormater';
import SpinnerLoader from '@/components/SpinnerLoader';




function page() {
    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState([]); // Initial empty array
    const [loading , setLoading] = useState(false)
 
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (prompt) {
          setLoading(true)
          const { data } = await axios.post("/api/ai/convertion", { prompt });

          // Update messages directly
          console.log("ai response",data);
          
          const newMessage = { you: prompt, Ai: data?.data.data };
          setMessages([...messages, newMessage]);
  
          // Clear prompt after submission
          setPrompt("");
        }
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false)
      }
    };

  return (
    <section className='flex justify-center items-center'>
         {/* Message Section */}
      <div className="res-msg-sec border">
        <h2 className="text-gray-500 text-xl mb-5">Conversation Section</h2>
         
        {/* Show Messages Section */}
        <div className="p-4 rounded-md mb-6 h-[50vh]  overflow-y-auto">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div key={index} className="mb-4 flex flex-col gap-3">
                <div className="self-start  p-3 bg-gray-300/10 rounded-xl rounded-tl-none text-gray-300">
                  <strong className="text-gray-600">You:</strong>
                  <br /> {msg?.you}
                </div>

                <div className="self-end max-w-[100%] p-3 bg-gray-400/10  rounded-xl rounded-tr-none text-gray-300">
                  <strong className="text-gray-600">AI:</strong>

                  <br />
                  <MarkDownTextFormater content={msg?.Ai} />
                  
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              No messages yet. Start the conversation!
            </p>
          )}
        </div>

        {/* Message Input Section */}
        <form
          className="flex flex-col md:flex-row items-start md:items-end"
          onSubmit={handleSubmit}
        >
          <textarea
            className="w-full md:flex-1 px-5 py-2 outline-none rounded-md border border-gray-700 bg-gray-500/10  resize-none"
            placeholder="Enter something..."
            rows="3"
            value={prompt} // Bind the value to the state
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            type="submit"
            className="mt-3 md:mt-0 md:ml-5 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
          >
                 {loading?(<div className='flex justify-center items-center gap-3'><SpinnerLoader/></div>):'Ask'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default page
