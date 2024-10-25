
import { dbConnect } from '@/db/dbConnection';
import { getUserDetails } from '@/helpers/getUserDetails';
import { Users } from '@/model/user.model';
import { ApiError, ApiResponse } from '@/utils/customResponse';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
// import OpenAI from "openai";

// const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY}, );

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export const POST = async (req) => {
  const { prompt } = await req.json();


  try {

    await dbConnect();

    const userId = getUserDetails();

    const user =await Users.findById(userId)

    if (!user){
       return ApiError.send('user not authenticate ')
    }

    if(user.totalGenarate.pdf < 1){
      return ApiError.send('Sorry Free limit are used ! get Prime Version')
    }

    if (!prompt) return ApiError.send('please input valid prompt')

    // const image = await openai.images.generate({ model:"dall-e-2", prompt: "A cute baby sea otter" });

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    // console.log(result);
   
    user.totalGenarate.pdf -= 1

    await user.save()

    // Return the completion as JSON
    return ApiResponse.send('Prompt Genarate Success', { data: result.response.candidates[0].content.parts[0].text || '' , totalGenarate:user.totalGenarate})
    // return NextResponse.json({ message: "Message generated successfully", data: result.response.candidates[0].content.parts[0].text }, { status: 200 });
  } catch (error) {
    console.error(error);

    return ApiError.send()
  }
};
