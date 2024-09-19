"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const fileUrl = searchParams.get("file"); // Get the 'file' query parameter

  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    if (fileUrl) {
      // If the fileUrl is a valid base64 string or external URL, set it
      setPdfUrl(fileUrl);
    }
  }, [fileUrl]);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Edit or Download Your PDF</h1>

      {pdfUrl ? (
        <div>
          {/* Provide download link */}
          <a
            href={pdfUrl}
            download="ai_response.pdf"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Download PDF
          </a>

          {/* Display the PDF in an iframe */}
          <iframe
            src={pdfUrl}
            className="mt-5 w-full h-96 border rounded"
            type="application/pdf"
           
          />
        </div>
      ) : (
        <p>No PDF available for editing.</p>
      )}
    </div>
  );
};

export default Page;
