"use client"

import React, { useState } from 'react'
import axios from "axios";
import MarkDownTextFormater from '@/components/MarkDownTextFormater';
import SpinnerLoader from '@/components/SpinnerLoader';




function page() {
    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState([]); // Initial empty array
    const [loading , setLoading] = useState(false)
    const [isSave , setIsSave] = useState(false)
    const [fileName , setFileName] = useState('')
  
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


    const handleClick =async(e)=>{
      e.preventDefault();
      try {
        if (true) {
          // setLoading(true)
          const { data } = await axios.post("/api/storage", {markdownData:messages , fileName });

          // Update messages directly
          // console.log("ai response",data);
          
         const markdata =await axios.get(data.data.storage.files[11].url)
         console.log("markdata",markdata);
          
         
        }
      } catch (error) {
        console.error(error);
      }finally{
        // setLoading(false)
      }
    }

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
          {/* save button , if we wand to save data  */}
          {/* <button onClick={()=>setIsSave(true)}>save</button> */}
        </form>
      </div>


      {/* message save popup box */}
      {
        isSave&& (<div className="popup-container">
          <div className=" bg-white rounded-lg shadow-lg pt-3 pb-8 p-5 max-w-md text-center">
            {/* Close button */}
            <div className="flex justify-end ">
              <button
                onClick={()=>setIsSave(false)}
                className=""
              >
                <span className="text-3xl text-black mt-3">&times;</span>
              </button>
            </div>
    
            <img
              src="https://res.cloudinary.com/dab0ekhmy/image/upload/v1727896191/thik-ai/m4edgpbovwz7efpt9xxp.png"
              alt="Success"
              className="w-24 mx-auto mb-6"
            />
            <h2 className='text-black p-5'>Please enter file Name </h2>
           <form action="" className='p-5'>
            <input type="text" className='custom-input  text-black' placeholder='File Name ' onChange={(e)=>setFileName(e.target.value)} name="fileName" required/>
            <button
              onClick={handleClick}
              className={`custom-button mt-7 `}
            >
             Save
            </button>
            </form> 
           
          </div>
        </div>)
      }
    </section>
  )
}

export default page
