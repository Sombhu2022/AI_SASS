// "use client"
// import React, { useState } from 'react';
// import axios from 'axios';
// import { FaImage } from 'react-icons/fa'; // Font Awesome image icon
// import { genarateAiResponse } from '@/controller/convertion.controller';

// function ImageRecognition() {
//   const [prompt, setPrompt] = useState(''); // User prompt
//   const [selectedImage, setSelectedImage] = useState(null); // Image file
//   const [base64, setBase64] = useState(''); // Base64 of image
//   const [response, setResponse] = useState(''); // AI response
//   const [loading, setLoading] = useState(false); // Loading state
//   const [error, setError] = useState(''); // Error handling

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setSelectedImage(file);
//         setBase64(reader.result.split(',')[1]); // Remove the prefix 'data:image/...;base64,' for the Base64 content
//         setError('');
//       };
//       reader.onerror = () => {
//         setError('Failed to read image. Please try again.');
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!base64 || !prompt) {
//       setError('Please provide a prompt and upload an image.');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     setResponse('');

//     // Prepare the `inlineData` object
//     const imageType = selectedImage.type.split('/')[1]; // Get the image type (e.g., 'jpeg' or 'png')
//     const inlineData = {
//       data: base64,
//       mimeType: `image/${imageType}`,
//     };

//     try {
//       // Example API call (replace with your backend endpoint)
//       const { data , error} = await genarateAiResponse({prompt , type:"chat" , inlineData })

//       console.log("data" , data);
      
      
//       setResponse( data || 'No description provided.');
//     } catch (err) {
//       setError('Failed to process the request. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
//       <div className="max-w-xl w-full bg-white shadow-xl rounded-2xl p-6">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
//           Image Recognition System
//         </h1>
//         <p className="text-gray-500 text-sm text-center mb-6">
//           Upload an image and provide a prompt to get AI-generated insights.
//         </p>

//         {/* Prompt Input */}
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Enter your prompt (e.g., Describe this image)"
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none shadow-sm text-gray-700"
//           />
//         </div>

//         {/* Image Upload Field */}
//         <div className="flex items-center justify-center mb-6">
//           <label
//             htmlFor="imageInput"
//             className="cursor-pointer flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 text-blue-600 hover:text-blue-800"
//           >
//             <FaImage className="text-xl" />
//             <span>Upload Image</span>
//           </label>
//           <input
//             id="imageInput"
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//             className="hidden"
//           />
//         </div>

//         {/* Image Preview */}
//         {selectedImage && (
//           <div className="mb-4 flex justify-center">
//             <img
//               src={`data:image/${selectedImage.type.split('/')[1]};base64,${base64}`}
//               alt="Uploaded Preview"
//               className="w-40 h-40 object-cover rounded-lg shadow-md"
//             />
//           </div>
//         )}

//         {/* Submit Button */}
//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-400"
//         >
//           {loading ? 'Processing...' : 'Analyze Image'}
//         </button>

//         {/* Response Box */}
//         {response && (
//           <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold text-gray-700 mb-2">AI Response:</h2>
//             <p className="text-gray-600">{response}</p>
//           </div>
//         )}

//         {/* Error Message */}
//         {error && (
//           <div className="text-red-500 mt-4 text-sm">
//             <p>{error}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ImageRecognition;



"use client";

import React, { useState } from "react";
import SpinnerLoader from "@/components/SpinnerLoader";

function ImageToCodePage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleGenerateCode = async () => {
    setLoading(true);

    // Simulating the API call for code generation
    setTimeout(() => {
      setGeneratedCode("<div>Your generated code will appear here!</div>");
      setLoading(false);
    }, 2000);
  };

  return (
    <section className="flex flex-col items-center p-8">
      {/* Image Upload Section */}
      <div className="w-full max-w-md bg-gray-100 p-5 rounded-lg shadow-md">
        <h2 className="text-gray-800 text-xl mb-5 text-center">
          Image to Code Generation
        </h2>

        <div className="flex flex-col items-center gap-4">
          {/* Upload Icon */}
          <label
            htmlFor="image-upload"
            className="cursor-pointer flex items-center justify-center w-24 h-24 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />

          {/* Preview Image */}
          {selectedImage && (
            <div className="w-32 h-32 border border-gray-300 rounded-md overflow-hidden">
              <img
                src={selectedImage}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Generate Code Button */}
          <button
            onClick={handleGenerateCode}
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
            disabled={!selectedImage}
          >
            {loading ? (
              <div className="flex justify-center items-center gap-3">
                <SpinnerLoader />
              </div>
            ) : (
              "Generate Code"
            )}
          </button>
        </div>
      </div>

      {/* Generated Code Section */}
      {generatedCode && (
        <div className="w-full max-w-md mt-8 bg-gray-800 text-white p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Generated Code:</h3>
          <pre className="overflow-x-auto">{generatedCode}</pre>
        </div>
      )}
    </section>
  );
}

export default ImageToCodePage;
