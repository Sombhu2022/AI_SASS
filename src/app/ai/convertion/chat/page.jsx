// "use client"

// import React, { useState } from 'react'
// import axios from "axios";
// import MarkDownTextFormater from '@/components/MarkDownTextFormater';
// import SpinnerLoader from '@/components/SpinnerLoader';
// import { genarateAiResponse } from '@/controller/convertion.controller';

// function page() {
//     const [prompt, setPrompt] = useState("");
//     const [messages, setMessages] = useState([]); // Initial empty array
//     const [loading , setLoading] = useState(false)
//     const [isSave , setIsSave] = useState(false)
//     const [fileName , setFileName] = useState('')

//     const handleSubmit = async (e) => {
//       e.preventDefault();
//         if (prompt) {
//           setLoading(true)
//           const { data , error} = await genarateAiResponse({prompt , type:"chat"})

//           if(data){
//             const newMessage = { you: prompt, Ai: data?.data.data };
//             setMessages([...messages, newMessage]);
//           } else if(error){
//             console.error(error)
//           }
//           // Clear prompt after submission
//           setPrompt("");
//           setLoading(false)
//         }
//     };

//     const handleClick =async(e)=>{
//       e.preventDefault();
//       try {
//         if (true) {
//           // setLoading(true)
//           const { data } = await axios.post("/api/storage", {markdownData:messages , fileName });

//           // Update messages directly
//           // console.log("ai response",data);

//          const markdata =await axios.get(data.data.storage.files[11].url)
//          console.log("markdata",markdata);

//         }
//       } catch (error) {
//         console.error(error);
//       }finally{
//         // setLoading(false)
//       }
//     }

//   return (
//     <section className='flex justify-center items-center'>
//          {/* Message Section */}
//       <div className="res-msg-sec border">
//         <h2 className="text-gray-500 text-xl mb-5">Conversation Section</h2>

//         {/* Show Messages Section */}
//         <div className="p-4 rounded-md mb-6 h-[50vh]  overflow-y-auto">
//           {messages.length > 0 ? (
//             messages.map((msg, index) => (
//               <div key={index} className="mb-4 flex flex-col gap-3">
//                 <div className="self-start  p-3 bg-gray-300/10 rounded-xl rounded-tl-none text-gray-300">
//                   <strong className="text-gray-600">You:</strong>
//                   <br /> {msg?.you}
//                 </div>

//                 <div className="self-end max-w-[100%] p-3 bg-gray-400/10  rounded-xl rounded-tr-none text-gray-300">
//                   <strong className="text-gray-600">AI:</strong>

//                   <br />
//                   <MarkDownTextFormater content={msg?.Ai} />

//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">
//               No messages yet. Start the conversation!
//             </p>
//           )}
//         </div>

//         {/* Message Input Section */}
//         <form
//           className="flex flex-col md:flex-row items-start md:items-end"
//           onSubmit={handleSubmit}
//         >
//           <textarea
//             className="w-full md:flex-1 px-5 py-2 outline-none rounded-md border border-gray-700 bg-gray-500/10  resize-none"
//             placeholder="Enter something..."
//             rows="3"
//             value={prompt} // Bind the value to the state
//             onChange={(e) => setPrompt(e.target.value)}
//           />
//           <button
//             type="submit"
//             className="mt-3 md:mt-0 md:ml-5 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
//           >
//                  {loading?(<div className='flex justify-center items-center gap-3'><SpinnerLoader/></div>):'Ask'}
//           </button>
//           {/* save button , if we wand to save data  */}
//           {/* <button onClick={()=>setIsSave(true)}>save</button> */}
//         </form>
//       </div>

//       {/* message save popup box */}
//       {
//         isSave&& (<div className="popup-container">
//           <div className=" bg-white rounded-lg shadow-lg pt-3 pb-8 p-5 max-w-md text-center">
//             {/* Close button */}
//             <div className="flex justify-end ">
//               <button
//                 onClick={()=>setIsSave(false)}
//                 className=""
//               >
//                 <span className="text-3xl text-black mt-3">&times;</span>
//               </button>
//             </div>

//             <img
//               src="https://res.cloudinary.com/dab0ekhmy/image/upload/v1727896191/thik-ai/m4edgpbovwz7efpt9xxp.png"
//               alt="Success"
//               className="w-24 mx-auto mb-6"
//             />
//             <h2 className='text-black p-5'>Please enter file Name </h2>
//            <form action="" className='p-5'>
//             <input type="text" className='custom-input  text-black' placeholder='File Name ' onChange={(e)=>setFileName(e.target.value)} name="fileName" required/>
//             <button
//               onClick={handleClick}
//               className={`custom-button mt-7 `}
//             >
//              Save
//             </button>
//             </form>

//           </div>
//         </div>)
//       }
//     </section>
//   )
// }

// export default page

"use client";

import React, { useState } from "react";
import axios from "axios";
import MarkDownTextFormater from "@/components/MarkDownTextFormater";
import SpinnerLoader from "@/components/SpinnerLoader";
import { genarateAiResponse } from "@/controller/convertion.controller";
import { BiImageAdd } from "react-icons/bi";

function page() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]); // Initial empty array
  const [loading, setLoading] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [fileName, setFileName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // Image file
  const [base64, setBase64] = useState(""); // Base64 of image
  const [error, setError] = useState(''); // Error handling

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res;

    if (prompt) {
      setLoading(true);
      if (base64) {
        //     // Prepare the `inlineData` object
        const imageType = selectedImage.type.split("/")[1]; // Get the image type (e.g., 'jpeg' or 'png')
        const inlineData = {
          data: base64,
          mimeType: `image/${imageType}`,
        };

        res = await genarateAiResponse({ prompt, type: "chat" , inlineData });
      } else {
        res = await genarateAiResponse({ prompt, type: "chat" });
      }
      const { data, error } = res;
      if (data) {
        const newMessage = { you: prompt, Ai: data?.data.data };
        setMessages([...messages, newMessage]);
      } else if (error) {
        console.error(error);
      }
      // Clear prompt after submission
      setPrompt("");
      setSelectedImage(null)
      setBase64("")
      setLoading(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(file);
        setBase64(reader.result.split(",")[1]); // Remove the prefix 'data:image/...;base64,' for the Base64 content
        setError("");
      };
      reader.onerror = () => {
        setError("Failed to read image. Please try again.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (true) {
        const { data } = await axios.post("/api/storage", {
          markdownData: messages,
          fileName,
        });

        const markdata = await axios.get(data.data.storage.files[11].url);
        console.log("markdata", markdata);
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(selectedImage);
  

  return (
    <section className="flex justify-center items-center">
      {/* Message Section */}
      <div className="res-msg-sec border">
        <h2 className="text-gray-500 text-xl mb-5">Conversation Section</h2>

        {/* Show Messages Section */}
        <div className="p-4 rounded-md mb-6 min-h-[50vh] ">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div key={index} className="mb-4 flex flex-col gap-3">
                <div className="self-start p-3 bg-gray-300/10 rounded-xl rounded-tl-none text-gray-300">
                  <strong className="text-gray-600">You:</strong>
                  <br /> {msg?.you}
                </div>

                <div className="self-end max-w-[100%] p-3 bg-gray-400/10 rounded-xl rounded-tr-none text-gray-300">
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
          <div className="flex justify-center items-end gap-3 w-full  md:flex-1 p-2  outline-none rounded-md border border-gray-700 bg-gray-500/10 resize-none">
            <textarea
              className="w-full md:flex-1 p-2 outline-none rounded-md bg-transparent resize-none"
              placeholder="Enter something..."
              rows="3"
              value={prompt} // Bind the value to the state
              onChange={(e) => setPrompt(e.target.value)}
            />

            {/* Image Upload Section */}
            <div className="mt-3 flex gap-3 items-end justify-end">
              {selectedImage && (
                <div className="mt-3">
                  <img
                    src={`data:image/${selectedImage.type.split('/')[1]};base64,${base64}`}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                </div>
              )}

              <label
                className="text-gray-500  text-3xl  cursor-pointer"
                htmlFor="file"
              >
                {" "}
                <BiImageAdd />{" "}
              </label>
              <input
                id="file"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-3 md:mt-0 md:ml-5 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
          >
            {loading ? (
              <div className="flex justify-center items-center gap-3">
                <SpinnerLoader />
              </div>
            ) : (
              "Ask"
            )}
          </button>
        </form>

        {/* Save Button Section */}
        {isSave && (
          <div className="popup-container">
            <div className="bg-white rounded-lg shadow-lg pt-3 pb-8 p-5 max-w-md text-center">
              {/* Close button */}
              <div className="flex justify-end">
                <button onClick={() => setIsSave(false)} className="">
                  <span className="text-3xl text-black mt-3">&times;</span>
                </button>
              </div>

              <img
                src="https://res.cloudinary.com/dab0ekhmy/image/upload/v1727896191/thik-ai/m4edgpbovwz7efpt9xxp.png"
                alt="Success"
                className="w-24 mx-auto mb-6"
              />
              <h2 className="text-black p-5">Please enter file Name </h2>
              <form action="" className="p-5">
                <input
                  type="text"
                  className="custom-input text-black"
                  placeholder="File Name "
                  onChange={(e) => setFileName(e.target.value)}
                  name="fileName"
                  required
                />
                <button onClick={handleClick} className={`custom-button mt-7 `}>
                  Save
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default page;
