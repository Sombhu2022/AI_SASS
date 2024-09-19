import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

export const POST = async(req, res)=> {
  if (req.method === "POST") {
    const { prompt, imagePath } = req.body;

    try {
      const mediaPath = path.resolve(process.cwd(), "public", "images"); // Adjust the path
      const imagePart = fileToGenerativePart(`${mediaPath}/${imagePath}`, "image/jpeg");

      const result = await model.generateContent([prompt, imagePart]);

      return new NextResponse.json({ data: result.response.text() , status:200 });
    } catch (error) {
      console.error(error);
     return  new NextResponse.json({status:500, message: "Image generation failed", error });
    }
  } else {
    return new NextResponse.json({ message: "Method not allowed" , status:500 });
  }
}
