// pages/editor.js
import React, { useRef, useState, useEffect } from "react";
import { marked } from "marked";
import {
  FaHeading,
  FaBold,
  FaItalic,
  FaListUl,
  FaListOl,
  FaPalette,
} from "react-icons/fa"; // Import necessary icons
import { BsFillCloudDownloadFill } from "react-icons/bs";
import { MdDownloadDone } from "react-icons/md";
import { CiBookmarkCheck } from "react-icons/ci";
import { IoCloudUpload } from "react-icons/io5";

import { createPdfAndDownload, createPdfAndUpload } from "@/utils/managePdf";
import axios from "axios";
import Notify from "@/utils/NotificationManager";
import SpinnerLoader from "./SpinnerLoader";

const CustomTextEditor = ({
  content = "this is text editor",
  handleContextChange,
  isEdit = false,
  documentName = 'Document',
  onRefresh = false,
  fileId = ''
}) => {
  const editorRef = useRef(null);

  const [markdown, setMarkdown] = useState("");
  const [isSave, setIsSave] = useState(false);
  const [fileName, setFileName] = useState("");
  const [loading , setLoading] = useState(false)



  useEffect(() => {
    setMarkdown(content);
  }, [content]);

  useEffect(()=>{
    setFileName(documentName)
  }, [documentName])

  const applyFormat = (command, value = null) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    if (command === "bold" || command === "italic" || command === "underline") {
      document.execCommand(command); // Directly execute the command
    } else if (command === "h1") {
      document.execCommand("formatBlock", false, "h1");
    } else if (command === "h2") {
      document.execCommand("formatBlock", false, "h2");
    } else if (command === "foreColor") {
      document.execCommand("foreColor", false, value);
    } else if (
      command === "insertUnorderedList" ||
      command === "insertOrderedList"
    ) {
      document.execCommand(command);
    } else if (command === "undo" || command === "redo") {
      document.execCommand(command); // Undo and Redo
    }

    updateMarkdown(); // Update markdown content
  };



  const updateMarkdown = () => {
    const content = editorRef.current.innerHTML;
    const markdown = htmlToMarkdown(content);
    setMarkdown(markdown);
    handleContextChange(markdown);
  };




  const htmlToMarkdown = (html) => {
    return html
      .replace(/<h1>(.*?)<\/h1>/g, "# $1\n")
      .replace(/<h2>(.*?)<\/h2>/g, "## $1\n")
      .replace(/<b>(.*?)<\/b>/g, "**$1**")
      .replace(/<i>(.*?)<\/i>/g, "*$1*")
      .replace(/<ul>(.*?)<\/ul>/g, (match, items) =>
        items.replace(/<li>(.*?)<\/li>/g, "- $1\n")
      )
      .replace(/<p>(.*?)<\/p>/g, "$1\n\n")
      .replace(/<br>/g, "\n")
      .replace(/<table>(.*?)<\/table>/g, (match, tableContent) =>
        tableContent.replace(
          /<tr>(.*?)<\/tr>/g,
          (match, rowContent) =>
            `<tr>${rowContent.replace(/<td>(.*?)<\/td>/g, "<td>$1</td>")}</tr>`
        )
      );
  };



  const handleLinkClick = (event) => {
    const target = event.target;
    if (target.tagName === "A") {
      event.preventDefault(); // Prevent default anchor behavior
      window.open(target.href, "_blank"); // Open link in a new tab
    }
  };



  const markdownToHtml = (markdown) => {
    // Convert Markdown to HTML
    const html = marked(markdown);
    return html;
    // Add borders to tables
    //   return html.replace(/<table>/g, '<table style="border-collapse: collapse; width: 100%;">')
    //     .replace(/<tr>/g, '<tr style="border: 1px solid black;">')
    //     .replace(/<td>/g, '<td style="border: 1px solid black; padding: 8px;">')
    //     .replace(/<th>/g, '<th style="border: 1px solid black; padding: 8px; background: gray; color:white;">')
    //     .replace(/<a href="(.*?)">(.*?)<\/a>/g, '<a href="$1" style="cursor: pointer; color:blue; ">$2</a>')
    //     .replace(/<strong>/g, '<strong style="margin-top:20px;">')
    //     .replace(/<li>/g , '<li style="margin-left:20px;" >')
  };



  const handleDownloadPdf = async () => {
    const editorContentHTML = editorRef.current.innerHTML;
    const pdf = createPdfAndDownload(editorContentHTML);
  };



  const handleUploadPdf = async(e) => {
    e.preventDefault();
    console.info("handle pdf uploader run");
    try {
      const editorContentHTML = editorRef.current.innerHTML;
      if (editorContentHTML && fileName) {
        setLoading(true)
        const { data } = await axios.post("/api/storage", {markdownData:editorContentHTML , fileName });
        Notify.success(data.message || 'file upload success , please check your deshboard !')
        // Update messages directly
        // console.log("ai response",data);
        
      //  const markdata =await axios.get(data.data.storage.files[data.data.storage.files.length - 1].url)
      //  console.log("markdata",markdata);
        
       
      }
    } catch (error) {
      console.error(error);
      Notify.error(error.response.data.message || 'somthing error file not uploaded')
    }finally{
      setLoading(false)
      setIsSave(false)
    }
      
  };
  

  const handleUpdate =async(e)=>{
    e.preventDefault()
    console.log('update file function run');
    try {
      const editorContentHTML = editorRef.current.innerHTML;
      if (editorContentHTML && fileName) {
        setLoading(true)
        const { data } = await axios.patch(`/api/storage/${fileId}`, {markdownData:editorContentHTML , fileName });
        Notify.success(data.message || 'file update success , please check your deshboard !')
        if(onRefresh){
          onRefresh()
        }
      }
    } catch (error) {
      console.error(error);
      Notify.error(error.response.data.message || 'somthing error file not uploaded')
    }finally{
      setLoading(false)
      setIsSave(false)
    }
    
    
  }



  useEffect(() => {
    // Ensure this only runs on the client
    if (typeof window !== "undefined" && editorRef.current) {
      // Render the markdown as HTML when markdown changes
      editorRef.current.innerHTML = markdownToHtml(markdown);
    }
  }, [markdown]);

  // console.log(marked(markdown));

  return (
    <div className="max-w-[700px] mx-0 my-auto p-7 bg-white text-black rounded-sm">

      <div className="flex flex-wrap gap-3 justify-between items-center border-b pb-3 border-b-gray-300">
      <p className="font-bold text-gray-700">{documentName}</p>
      <div className="flex gap-4">
        <div className="relative group">
          <button
            onClick={updateMarkdown}
            className="bg-blue-600/10 text-blue-700 px-4 py-2 rounded hover:bg-blue-700 hover:text-white flex gap-2 items-center"
          >
            <CiBookmarkCheck /> Save Text
          </button>
          {/* Tooltip */}
          <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2">
            Save file data
          </span>
        </div>

        <div className="relative group">
          <button
            onClick={handleDownloadPdf}
            className="bg-blue-600/10 text-blue-700 px-4 py-2 rounded hover:bg-blue-700 hover:text-white flex gap-2 items-center"
          >
            <BsFillCloudDownloadFill /> Download
          </button>
          {/* Tooltip */}
          <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2">
            Download as PDF
          </span>
        </div>

        <div className="relative group">
          <button
            onClick={()=>setIsSave(true)}
            className="bg-blue-600/10 text-blue-700 px-4 py-2 rounded hover:bg-blue-700 hover:text-white flex gap-2 items-center"
          >
            <IoCloudUpload /> {isEdit?"Update":"Upload"}
          </button>
          {/* Tooltip */}
          <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2">
            {isEdit?'Update Your Existing Document':'Upload as PDF'}
          </span>
        </div>
      </div>
      </div>


      <div className="controls flex flex-wrap gap-1 mb-4">
        {/* <button onClick={() => applyFormat("h1")} style={buttonStyle}>
          <FaHeading /> H1
        </button> */}
        <button onClick={() => applyFormat("h2")} style={buttonStyle}>
          <FaHeading />
        </button>
        <button onClick={() => applyFormat("bold")} style={buttonStyle}>
          <FaBold />
        </button>
        <button onClick={() => applyFormat("italic")} style={buttonStyle}>
          <FaItalic />
        </button>
        <button onClick={() => applyFormat("underline")} style={buttonStyle}>
          <u>U</u>
        </button>
        <button
          onClick={() => applyFormat("foreColor", "red")}
          style={buttonStyle}
        >
          <FaPalette className="text-red-600" />
        </button>
        <button
          onClick={() => applyFormat("foreColor", "blue")}
          style={buttonStyle}
        >
          <FaPalette className="text-blue-600" />
        </button>
        <button
          onClick={() => applyFormat("insertUnorderedList")}
          style={buttonStyle}
        >
          <FaListUl />
        </button>
        <button
          onClick={() => applyFormat("insertOrderedList")}
          style={buttonStyle}
        >
          <FaListOl />
        </button>
        {/* <button onClick={() => applyFormat("undo")} style={buttonStyle}>
          Undo
        </button>
        <button onClick={() => applyFormat("redo")} style={buttonStyle}>
          Redo
        </button> */}
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning={true}
        className="editor"
        onClick={handleLinkClick} // Handle link clicks
        // onInput={updateMarkdown}
      ></div>
      {/* <h3>Markdown Output:</h3>
      <pre className='text-black'>{markdown}</pre> */}



     {/* for upload pdf popup box */}
      {isSave && (
        <div className="popup-container">
          <div className=" bg-white rounded-lg shadow-lg pt-3 pb-8 p-5 max-w-md text-center">
            {/* Close button */}
            <div className="flex justify-end ">
              <button onClick={() => setIsSave(false)} className="">
                <span className="text-3xl text-black mt-3">&times;</span>
              </button>
            </div>

            <img
              src="https://res.cloudinary.com/dab0ekhmy/image/upload/v1727896191/thik-ai/m4edgpbovwz7efpt9xxp.png"
              alt="Success"
              className="w-24 mx-auto mb-6"
            />
            <h2 className="text-black p-5">Please enter topic Name </h2>
            <form action="" className="p-5">
              <input
                type="text"
                className="custom-input  text-black"
                placeholder="Topic Name "
                onChange={(e) => setFileName(e.target.value)}
                name="fileName"
                required
                value={fileName}
              />
              <button
                onClick={isEdit? handleUpdate : handleUploadPdf}
                className={`custom-button mt-7 `}
              >
                {loading?(<SpinnerLoader/>):isEdit?"update":'Save'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const buttonStyle = {
  display: "flex",
  alignItems: "center",
  padding: "10px",
  backgroundColor: "white",
  cursor: "pointer",
  color: "black",
  transition: "background-color 0.2s",
};

export default CustomTextEditor;
