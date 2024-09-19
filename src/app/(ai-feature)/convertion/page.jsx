"use client";
import MarkDownTextFormater from "@/components/MarkDownTextFormater";
import axios from "axios";
import React, { useState } from "react";
import { LuMessageSquare } from "react-icons/lu";

function Page() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]); // Initial empty array


  const handleGeneratePDF = async (aiResponse) => {
    try {
      // Make an API call to create the PDF
      const  data  = await axios.post("/api/pdf/react-pdf", { content: aiResponse });
  
      console.log("log data",data);
      
      // Redirect to the new page for PDF download/edit
      window.location.href = `pdf/edit-pdf?file=${data.data.fileUrl}`;
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (prompt) {
        const { data } = await axios.post("/api/ai/convertion", { prompt });

        // Update messages directly
        const newMessage = { you: prompt, Ai: data?.data };
        setMessages([...messages, newMessage]);

        // Clear prompt after submission
        setPrompt("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className=" conversion-section">
      {/* AI Assistant Section */}
      <div className=" heading-section ">
        <LuMessageSquare className="text-blue-600 bg-blue-600/15 rounded-lg p-5 text-7xl" />
        <div className="flex flex-col gap-3 text-center md:text-left">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-200">
            Discuss Your Idea with AI
          </h1>
          <p className="text-gray-600">
            This is your AI assistant to help you improve your project ideas...
          </p>
        </div>
      </div>

      {/* Message Section */}
      <div className="res-msg-sec border">
        <h2 className="text-gray-500 text-xl mb-5">Conversation Section</h2>

        {/* Show Messages Section */}
        <div className="p-4 rounded-md mb-6 max-h-[70vh] overflow-y-auto">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div key={index} className="mb-4 flex flex-col gap-3">
                <div className="self-start  p-3 bg-gray-300/10 rounded-xl rounded-tl-none text-gray-300">
                  <strong className="text-gray-600">You:</strong>
                  <br /> {msg?.you}
                </div>

                <div className="self-end max-w-[100%] p-3 bg-gray-400/10  rounded-xl rounded-tr-none text-gray-300">
                  <strong className="text-gray-600">AI:</strong>

                  {/* Add PDF button */}
                  <button
                    className="mt-2 px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-all"
                    onClick={() => handleGeneratePDF(msg?.Ai)} // Call the function to generate the PDF
                  >
                    Convert to PDF
                  </button>

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
            Ask
          </button>
        </form>
      </div>
    </section>
  );
}

export default Page;
