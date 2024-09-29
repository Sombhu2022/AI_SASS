import { NextResponse } from "next/server";
import ReactPDF, { Document, Page, Text, View } from "@react-pdf/renderer";
import fs from "fs";
import path from "path";



// Create Document Component
const MyDocument = ({content}) => (
<Document>
 <Page size="A4" style={{ flexDirection: 'row', backgroundColor: '#E4E4E4' }}>
   
   <View style={{ margin: 10, padding: 10, flexGrow: 1 }}>
     <Text>
      {content}
     </Text>
   </View>
 </Page>
</Document>
);


export const POST = async (req) => {
  try {

    const { content} = await req.json()

  


    // Create a unique filename for the PDF
    const fileName = `example.pdf`;
    const filePath = path.join(process.cwd(), "public", "pdfs", fileName);

    // Ensure the directory exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Render the PDF and save it to the filesystem
    await ReactPDF.render(<MyDocument content={content} />, filePath);

    // Return the file URL for client-side access
    const fileUrl = `/pdfs/${fileName}`;
    return NextResponse.json({
      message: "PDF created successfully",
      fileUrl,
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json({
      message: "PDF creation failed",
      status: 400,
      error: error.message,
    });
  }
};
