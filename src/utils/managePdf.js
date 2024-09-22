import htmlToPdfmake from "html-to-pdfmake";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

export const createPdfAndDownload =(editorContentHTML)=>{
    try {
        
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        const pdfContent = htmlToPdfmake(editorContentHTML);
    
        // Define PDFMake document structure
        const docDefinition = {
          content: pdfContent,
          pageSize: "A4",
          pageMargins: [40, 60, 40, 60], // [left, top, right, bottom]
        };
    
        // Generate the PDF and trigger download
        pdfMake.createPdf(docDefinition).download("document.pdf")
        console.log("ok");
        
        return {message:"ok"}
    } catch (error) {
        return error
    }
}


 //    // Function to save PDF to Cloudinary
  //    const handleSavePdf = () => {
  //     // Get HTML content from the Editor
  //     const editorInstance = editorRef.current.getInstance();
  //     const editorContentHTML = editorInstance.getHTML();

  //     // Convert HTML to a format suitable for PDFMake
  //     const pdfContent = htmlToPdfmake(editorContentHTML);

  //     // Define PDFMake document structure
  //     const docDefinition = {
  //       content: pdfContent,
  //       pageSize: "A4",
  //       pageMargins: [40, 60, 40, 60], // [left, top, right, bottom]
  //     };

  //     // Generate PDF in a Blob format
  //     pdfMake.createPdf(docDefinition).getBlob(async (blob) => {
  //       // Convert the blob to FormData to send it to Cloudinary
  //       const formData = new FormData();
  //       formData.append("file", blob, "document.pdf");
  //       formData.append("upload_preset", "your_upload_preset"); // Add your Cloudinary upload preset
  //       formData.append("cloud_name", "your_cloud_name"); // Add your Cloudinary cloud name

  //       try {
  //         // Upload to Cloudinary
  //         const response = await axios.post(
  //           "https://api.cloudinary.com/v1_1/your_cloud_name/auto/upload",
  //           formData
  //         );

  //         console.log("Cloudinary Upload Response:", response.data);

  //         // The URL of the uploaded file
  //         const uploadedUrl = response.data.secure_url;

  //         // Optionally store this URL somewhere for future use (e.g., in your database)
  //         console.log("Uploaded PDF URL:", uploadedUrl);
  //       } catch (error) {
  //         console.error("Error uploading to Cloudinary:", error);
  //       }
  //     });
  //   };
