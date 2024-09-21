"use client"

import { useAuth } from '@clerk/nextjs';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export const aiContentGenaretor = async(prompt)=>{
    try {
        const {userId} = useAuth()
        if (!userId) return { message:"user not Authenticate" , status:400 }
        if (!prompt) return { message:"please enter valid prompt " , status:500 }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

        const result = await model.generateContent(prompt);
        // console.log(result);
        return { message: "Message generated successfully" , data: result.response.candidates[0].content.parts[0].text  , status:200}
 
    } catch (error) {
        return { message:"Internal network error" , status:400 , data:error}
    }

}

// ["Genarate a documentation for this project idea and add more information and flowchar as a editor formate not use image of flowchar or diagram " ,prompt]