
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'


export const getUserDetails = ()=>{
 
   const cookiStorage = cookies()
     
     const token = cookiStorage.get('token').value || ''
     
     if(!token){
       return false
     }

     try {
        const decodeToken = jwt.verify(token , process.env.JWT_SECRET)
        return decodeToken.id;

     } catch (error) {
        return false
     }


}