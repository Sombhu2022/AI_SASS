// pages/editor.js
import React, { useRef, useState, useEffect } from 'react';
import { marked } from 'marked';
import { FaHeading, FaBold, FaItalic, FaListUl, FaListOl, FaPalette } from 'react-icons/fa'; // Import necessary icons

const CustomTextEditor = ({content="this is text editor" , handleContextChange}) => {
  const editorRef = useRef(null);
  

  const [markdown, setMarkdown] = useState('');

  useEffect(()=>{
 
      setMarkdown(content)
    
  },[content])


  const applyFormat = (command) => {
    const selection = window.getSelection();
  
    if (!selection.rangeCount) return;
  
    const range = selection.getRangeAt(0);
    
    if (command === 'bold') {
      document.execCommand('bold');
    } else if (command === 'italic') {
      document.execCommand('italic');
    } else if (command === 'h1') {
      const h1 = document.createElement('h1');
      h1.appendChild(range.extractContents());
      range.insertNode(h1);
    } else if (command === 'h2') {
      const h2 = document.createElement('h2');
      h2.appendChild(range.extractContents());
      range.insertNode(h2);
    }
    
    updateMarkdown(); // Update markdown content
  };
  
  const updateMarkdown = () => {
    const content = editorRef.current.innerHTML;
    const markdown = htmlToMarkdown(content);
    setMarkdown(markdown);
    handleContextChange(markdown)
  };

  const htmlToMarkdown = (html) => {
    return html
      .replace(/<h1>(.*?)<\/h1>/g, '# $1\n')
      .replace(/<h2>(.*?)<\/h2>/g, '## $1\n')
      .replace(/<b>(.*?)<\/b>/g, '**$1**')
      .replace(/<i>(.*?)<\/i>/g, '*$1*')
      .replace(/<ul>(.*?)<\/ul>/g, (match, items) =>
        items.replace(/<li>(.*?)<\/li>/g, '- $1\n')
      )
      .replace(/<p>(.*?)<\/p>/g, '$1\n\n')
      .replace(/<br>/g, '\n')
      .replace(/<table>(.*?)<\/table>/g, (match, tableContent) =>
        tableContent.replace(/<tr>(.*?)<\/tr>/g, (match, rowContent) =>
          `<tr>${rowContent.replace(/<td>(.*?)<\/td>/g, '<td>$1</td>')}</tr>`
        )
      );
  };

  const handleLinkClick = (event) => {
    const target = event.target;
    if (target.tagName === 'A') {
      event.preventDefault(); // Prevent default anchor behavior
      window.open(target.href, '_blank'); // Open link in a new tab
    }
  };

  const markdownToHtml = (markdown) => {
    // Convert Markdown to HTML
    const html = marked(markdown);

    // Add borders to tables
    return html.replace(/<table>/g, '<table style="border-collapse: collapse; width: 100%;">')
      .replace(/<tr>/g, '<tr style="border: 1px solid black;">')
      .replace(/<td>/g, '<td style="border: 1px solid black; padding: 8px;">')
      .replace(/<th>/g, '<th style="border: 1px solid black; padding: 8px; background: gray; color:white;">')
      .replace(/<a href="(.*?)">(.*?)<\/a>/g, '<a href="$1" style="cursor: pointer; color:blue; ">$2</a>')
      .replace(/<strong>/g, '<strong style="margin-top:20px;">')
      .replace(/<li>/g , '<li style="margin-left:20px;" >')
  };

  useEffect(() => {
    // Ensure this only runs on the client
    if (typeof window !== 'undefined' && editorRef.current) {
      // Render the markdown as HTML when markdown changes
      editorRef.current.innerHTML = markdownToHtml(markdown);
    }
  }, [markdown ]);

  return (
    <div className='max-w-[600px] mx-0 my-auto p-7 bg-white text-black rounded-sm'>
      <div className="controls flex flex-wrap gap-1 mb-4">
        <button onClick={() => applyFormat('formatBlock', 'h1')} style={buttonStyle}>
          <FaHeading /> 
        </button>
        <button onClick={() => applyFormat('formatBlock', 'h2')} style={buttonStyle}>
          <FaHeading /> 
        </button>
        <button onClick={() => applyFormat('bold')} style={buttonStyle}>
          <FaBold /> 
        </button>
        <button onClick={() => applyFormat('italic')} style={buttonStyle}>
          <FaItalic />
        </button>
        <button onClick={() => applyFormat('fontColor', 'red')} style={buttonStyle}>
          <FaPalette />
        </button>
        <button onClick={() => applyFormat('foreColor', 'blue')} style={buttonStyle}>
          <FaPalette /> 
        </button>
        <button onClick={() => applyFormat('insertUnorderedList')} style={buttonStyle}>
          <FaListUl /> 
        </button>
        <button onClick={() => applyFormat('insertOrderedList')} style={buttonStyle}>
          <FaListOl /> 
        </button>
        <button onClick={updateMarkdown} className='px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-800 text-white self-end'>Save</button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning={true}
        className="editor outline-none p-1 min-h-[200px] max-h-[100vh] mt-3 flex flex-col justify-start items-start text-black bg-slate-50 overflow-y-auto rounded-sm"
        onClick={handleLinkClick} // Handle link clicks
        // onInput={updateMarkdown}
    
      ></div>
      {/* <h3>Markdown Output:</h3>
      <pre className='text-black'>{markdown}</pre> */}
    </div>
  );
};

const buttonStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  backgroundColor: 'white',
  cursor: 'pointer',
  color:"black",
  transition: 'background-color 0.2s',
};

export default CustomTextEditor;
