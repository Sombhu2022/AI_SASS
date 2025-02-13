
import Prime from '@/app/prime/page';
import { dbConnect } from '@/db/dbConnection';
import { getUserDetails } from '@/helpers/getUserDetails';
import { Primes } from '@/model/prime.model';
import { Users } from '@/model/user.model';
import { ApiError, ApiResponse } from '@/utils/customResponse';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
// // import OpenAI from "openai";

// // const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY}, );

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)


// export const responseSave = async()=>{

// }

// export const POST = async (req) => {
//   const { prompt , type , image } = await req.json();


//   try {

//     await dbConnect();

//     const userId = getUserDetails();

//     const user =await Users.findById(userId)

//     if (!user){
//        return ApiError.send('user not authenticate ')
//     }

//     const prime = await Primes.findOne({userId})
//     if (!prime){
//       return ApiError.send('your prime fetures expire !')
//     }


//     if(prime.offers?.req?.exist < 1){
//       return ApiError.send('Sorry Free limit are used ! get Prime Version', 400)
//     }
//     if (type === 'pdf'){
//       if(prime.offers?.pdf?.exist < 1){
//         return ApiError.send('Sorry Free limit are used ! get Prime Version', 400)
//       }
//     }

//     if (!prompt) return ApiError.send('please input valid prompt')

//     // const image = await openai.images.generate({ model:"dall-e-2", prompt: "A cute baby sea otter" });

//     const model = genAI.getGenerativeModel(image? { model: "gemini-pro-vision" }: { model: "gemini-1.5-flash" });
    
//     const result = await model.generateContent([prompt , image]);
//     // console.log(result);
   
//     prime.offers.req.exist -= 1

//     if(type === 'pdf'){
//       prime.offers.pdf.exist -= 1
//     }

//     await prime.save()
 


//     // Return the completion as JSON
//     return ApiResponse.send('Prompt Genarate Success', { data: result?.response.candidates[0].content.parts[0].text || '' , totalGenarate:user.totalGenarate})
//     // return NextResponse.json({ message: "Message generated successfully", data: result.response.candidates[0].content.parts[0].text }, { status: 200 });
//   } catch (error) {
//     console.error(error);

//     return ApiError.send()
//   }
// };





export const POST = async (req) => {
  const { prompt, type, inlineData } = await req.json();

  try {
    await dbConnect();

    const userId = getUserDetails();
    if (!userId) {
      return ApiError.send("User not authenticated");
    }
    const user = await Users.findById(userId);

    if (!user) {
      return ApiError.send("User not authenticated");
    }

    const prime = await Primes.findOne({ userId });
    if (!prime) {
      return ApiError.send("Your prime features have expired!");
    }

    if (prime.offers?.req?.exist < 1) {
      return ApiError.send("Sorry, free limit has been used! Get Prime Version", 400);
    }

    if (type === "pdf" && prime.offers?.pdf?.exist < 1) {
      return ApiError.send("Sorry, free PDF limit has been used! Get Prime Version", 400);
    }

    if (!prompt) return ApiError.send("Please input a valid prompt");

    // Check image validity
    let model;
    let result;
    if (inlineData) {
      if (!inlineData.data || !inlineData.mimeType) {
        return ApiError.send("Invalid image format", 400);
      }

      model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Convert image data to base64 string
      // const imageData = `data:${inlineData.mimeType};base64,${Buffer.from(inlineData.data).toString("base64")}`;
      // console.log("---------------------------------------->" , inlineData);
      

      // Send image + prompt to API
      result = await model.generateContent([
        { text: prompt },
        { inlineData: inlineData },
      ]);
    } else {
      model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
       result = await model.generateContent(prompt);
    }

    // Update prime limits
    prime.offers.req.exist -= 1;
    if (type === "pdf") {
      prime.offers.pdf.exist -= 1;
    }
    await prime.save();

    // Return the response
    return ApiResponse.send("Prompt Generated Successfully", {
      data: result?.response?.candidates[0]?.content?.parts[0]?.text || "",
      totalGenerated: user.totalGenerated,
    });
  } catch (error) {
    console.error(error);
    return ApiError.send(error.message || "An error occurred");
  }
};
