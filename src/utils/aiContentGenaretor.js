
import { GoogleGenerativeAI } from '@google/generative-ai';


export const aiContentGenaretor = async(prompt , userId)=>{
    const key = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI( key)
    console.log(key);
    
    try {
       
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