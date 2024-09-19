import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export const POST = async (req) => {
  try {
    const { content } = await req.json();

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 1400]);

    // Embed font and set text properties
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 18;
    const margin = 50;
    const maxWidth = page.getWidth() - margin * 2;

    // Split and wrap text
    const lines = wrapText(content, font, fontSize, maxWidth);

    // Draw the wrapped text line by line
    let yPosition = page.getHeight() - margin;
    lines.forEach(line => {
      if (line !== "") {  // Skip empty lines added as paragraph breaks
        page.drawText(line, {
          x: margin,
          y: yPosition,
          size: fontSize,
          font: font,
          color: rgb(0, 0, 0),
        });
      }
      yPosition -= fontSize + 5; // Adjust line spacing
    });

    // Save the PDF to a file
    const pdfBytes = await pdfDoc.save();
    const fileName = `${uuidv4()}.pdf`;
    const filePath = path.join(process.cwd(), "public", "pdfs", fileName);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, pdfBytes);

    // Return the URL of the PDF file
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

// Text wrapping logic
function wrapText(text, font, fontSize, maxWidth) {
  const paragraphs = text.split("\n"); // Handle newlines
  const lines = [];

  paragraphs.forEach(paragraph => {
    const words = paragraph.split(" ");
    let currentLine = "";

    words.forEach(word => {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = font.widthOfTextAtSize(testLine, fontSize);

      if (testWidth <= maxWidth) {
        currentLine = testLine;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    });

    if (currentLine) {
      lines.push(currentLine); // Push last line of the paragraph
    }

    lines.push(""); // Empty line for paragraph spacing
  });

  return lines;
}
