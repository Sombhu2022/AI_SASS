
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Make sure you add your API key in the .env.local file
});

const openai = new OpenAIApi(configuration);

export default POST =async(req )=> {
 
    const { userId} =  auth()
    const { message:prompt } =await req.json();
    if(!userId){
        return new NextResponse("user not authenticate" , {status:400})

    }

    try {
      const response = await openai.createCompletion({
        model: 'gpt-3.5-turbo', // You can use other models like 'gpt-3.5-turbo' based on your needs
        prompt: prompt,
        
      });

      return new NextResponse("message genarate successfull" , {status:200} , response)
    } catch (error) {
      console.error(error);
      return new NextResponse("message genarate successfull" , {status:200} , error)
    }
  
}
