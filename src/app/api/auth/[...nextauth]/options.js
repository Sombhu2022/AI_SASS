import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import { Users } from "@/model/user.model";
import { dbConnect } from "@/db/dbConnection";

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "@/lib/db";
import { generateOTP } from "@/utils/otpGenarater";


export const options = {
  adapter: MongoDBAdapter(client),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      type: "credentials",
      credentials: {
        authId: {
          label: "authId",
          type: "type",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {

        const { authId, password } = credentials;
        const user = await Users.findOne({
            $or:[  {email:authId } , {userName:authId} ]
        })

        if (!user) {
          return null;
        }

        // Compare the plain-text password with the hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        
        if (isPasswordMatch) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],


  callbacks:{
    async signIn({ user, account, profile }) {
      // connect database first 
      try {
        await dbConnect()
        // Log credentials provided by the providers
        console.log('User:', user);
        console.log('Account:', account);
        console.log('Profile:', profile);
        console.log("ok");
        
        if (!profile || !account) {
          console.error("Profile object is missing.");
          return false; // Stop sign-in if there's an issue with the profile
        }
      
        if (account.provider === 'google' || account.provider === 'github') {
          // Find or create a user in the database
          console.log("provider");
          
          const existingUser = await Users.findOne({ email: user.email });
          if (!existingUser) {
            console.log(existingUser);
            
            // Create a new user with a username and other details
            const tempImage = { url:user.image , public_id:null }
            const userName = profile.given_name + generateOTP()
            
            const newUser = new Users({
              userName:userName,
              email: user.email,
              fullName: user.name, // You can get this from the profile object if the user signed up with Google or GitHub
              profile_pic: tempImage,
              createWith:account.provider
            });
            await newUser.save({ validateBeforeSave: false });
            console.log(newUser);
            
          }
        }
        console.log("all ok");
        
        return true;
        
      } catch (error) {
        return false;
      }
    },
    
    async session({ session, user }) {
      // Add the user ID to the session
      console.log(session , user);
      
      session.user.id = user.id;
      session.user.email = user.email;
      return session;
    },
      
  },



  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
    signUp: "/sign-up",
    
  },
};