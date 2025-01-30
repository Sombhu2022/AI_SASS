import axios from "axios";


export const genarateAiResponse = async({prompt , type , inlineData = ""})=>{
    try {
        
        const { data } = await axios.post("/api/ai/convertion", { prompt , type , inlineData });
        return { data , error:null}
    } catch (error) {
        console.error(error)
        return {data:null , error}
    }
}

