import axios from "axios";


export const FetchUserProfile = async()=>{
    try {
       const {data } = await axios.get("/api/auth/profile");
       return { data , error:null}
    } catch (error) {
        return {data:null , error}
    }
}