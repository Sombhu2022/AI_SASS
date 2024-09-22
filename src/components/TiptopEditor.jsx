"use client";

import React, { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { createPdfAndDownload } from "@/utils/managePdf";
import { copyText } from "@/utils/copyText";

function TiptopEditor({ content, handleContextChange }) {
  const [isEditing, setIsEditing] = useState(false);

  // Initialize the editor with TipTap
  const editor = useEditor({
    extensions: [StarterKit],
    content: content || "<p>Hello, React editor world!</p>", // Set default content
    onUpdate: ({ editor }) => {
      if (!isEditing && content) setIsEditing(true);
    },
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  // Save the content
  const handleSave = () => {
    const markdownContent = editor.getHTML(); // Get HTML from editor
    handleContextChange(markdownContent);
  };

  // Copy content to clipboard
  const handleCopy = () => {
    const innerHtml = editor.getHTML();
    copyText(innerHtml);
  };

  // Generate PDF and download
  const handleDownloadPdf = () => {
    const editorContentHTML = editor.getHTML();
    createPdfAndDownload(editorContentHTML);
  };

  return (
    <div className="text-white p-4">
      <div className="mb-4 flex justify-end gap-3">
        {isEditing && (
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        )}
        <button
          onClick={handleCopy}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Copy
        </button>
        <button
          onClick={handleDownloadPdf}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>

      {/* Editor Component from TipTap */}
      <EditorContent editor={editor} className="bg-white p-4 rounded-md" />
    </div>
  );
}

export default TiptopEditor;
