
import htmlToPdfmake from "html-to-pdfmake";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import axios from "axios";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
export const createPdfAndDownload =(editorContentHTML)=>{
    try {
        
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
   export   const createPdfAndUpload =async (editorContentHTML , fileName ='download.pdf') => {
   
   // Convert HTML to a format suitable for PDFMake
      const pdfContent = htmlToPdfmake(editorContentHTML);

      // Define PDFMake document structure
      const docDefinition = {
        content: pdfContent,
        pageSize: "A4",
        pageMargins: [40, 60, 40, 60], // [left, top, right, bottom]
      };

      // Generate PDF in a Blob format
      pdfMake.createPdf(docDefinition).getBlob(async (blob) => {
        // Convert the blob to FormData to send it to Cloudinary
       console.log('blod' , blob);
       
       const data = new FormData();

         data.append('file' , blob , fileName)

        try {
          const res = await axios.post('/api/pdf/create' , data,{
            headers:{
             "Content-Type": "multipart/form-data",
            }
          } )

          console.log("Cloudinary Upload Response:", res);
        } catch (error) {
          console.error("Error uploading to Cloudinary:", error);
        }
      });
    };
