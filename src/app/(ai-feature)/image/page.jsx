"use client"
import { useState } from "react";

const Page = () => {
  const [pdfUrl, setPdfUrl] = useState(null);

  const generatePdf = async () => {
    try {
      const response = await fetch("/api/pdf/react-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.fileUrl) {
        // Set the URL to display or download the PDF
        setPdfUrl(data.fileUrl);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Generate and Store PDF</h1>

      <button onClick={generatePdf} className="px-4 py-2 bg-blue-600 text-white rounded">
        Generate PDF
      </button>

      {pdfUrl && (
        <div className="mt-5">
          {/* Link to download the PDF */}
          <a href={pdfUrl} download className="text-blue-600 underline">
            Download Generated PDF
          </a>

          {/* Optionally, display the PDF directly */}
          <iframe src={pdfUrl} width="600" height="400" className="mt-4"></iframe>
        </div>
      )}
    </div>
  );
};

export default Page;
