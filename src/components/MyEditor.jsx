// "use client";

// import "@toast-ui/editor/dist/toastui-editor.css";
// import { Editor } from "@toast-ui/react-editor";
// import React, { useEffect, useRef, useState } from "react";
// import {  createPdfAndDownload } from "@/utils/managePdf";
// import { copyText } from "@/utils/copyText";


// function MyEditor({ content, handleContextChange }) {
//   const editorRef = useRef(null);
//   const [isEditing, setIsEditing] = useState(false);


//   useEffect(() => {
//     const editor = editorRef.current.getInstance();
//     editor.setMarkdown(content);
//   }, [content]);

 
//   const handleSave = () => {
//     const editor = editorRef.current.getInstance();
//     const makrdownContext = editor.getMarkdown();
//     handleContextChange(makrdownContext);
//   };


//   const handleCopy = () => {
//     const editor = editorRef.current.getInstance();
//     const inerHtml = editor.getHTML();
//     copyText(inerHtml)
//   };



//   const handleDownloadPdf = () => {
//     // Get HTML content from the Editor
//     const editorInstance = editorRef.current.getInstance();
//     const editorContentHTML = editorInstance.getHTML();
//     const pdf = createPdfAndDownload(editorContentHTML)
    
//   };

 
//   return (
//     <div className=" text-white p-4">
//       <div className="mb-4 flex justify-end gap-3">
//         { isEditing&&(<button
//           onClick={handleSave}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 "
//         >
//           save
//         </button>)}
//         <button
//           onClick={handleCopy}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           copy
//         </button>
//         <button
//           onClick={handleDownloadPdf}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Download PDF
//         </button>
//       </div>

//       <Editor
//         ref={editorRef} // Reference to the editor instance
//         initialValue={content || "Hello, React editor world!"}
//         height="600px"
//         initialEditType="wysiwyg"
//         useCommandShortcut={true}
//         onChange={() => {
//           if (!isEditing && content) setIsEditing(true);
//         }}
//       />
//     </div>
//   );
// }

// export default MyEditor;
