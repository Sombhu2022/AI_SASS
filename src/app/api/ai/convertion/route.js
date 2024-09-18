import { auth } from '@clerk/nextjs/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
// import OpenAI from "openai";

// const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY}, );

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export const POST = async (req) => {
  const { userId } =  auth(); // Ensure auth() resolves
  const {prompt} = await req.json();
  console.log(userId, prompt);

  if (!userId) {
    return new NextResponse("User not authenticated", { status: 400 });
  }
  if(!prompt) return new NextResponse("please input valid propt " , {status:400})

  try {
    // const image = await openai.images.generate({ model:"dall-e-2", prompt: "A cute baby sea otter" });
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const result = await model.generateContent(prompt);
 console.log(result);
 
    // Return the completion as JSON
    return NextResponse.json({ message: "Message generated successfully" , data: result.response.candidates[0].content.parts[0].text });
  } catch (error) {
    console.error(error);

    // Return the error as JSON
    return NextResponse.json({ message: "Error generating message", error }, { status: 500 });
  }
};
