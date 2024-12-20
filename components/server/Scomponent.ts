/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { mongooseConnect } from "@/lib/mongoose";
import { ClientUser } from "@/model/Clientuser.model";
import { signIn } from "next-auth/react";

export const getSignUp = async ({email, password}:{email: string; password:string}) => {
    if (!email || !password) {
      console.log("email and password are required"); 
      return;
    }
    try {      
      await mongooseConnect();
      const existingUser = await ClientUser.findOne({ email });
      console.log(existingUser);
      
      if (!existingUser){        
        const user = await ClientUser.create({ email, password, role:'user' });
        if (!user) return;
        await signIn("credentials", { email, password, callbackUrl: "/account" });
      }
    } catch (error:any) {
      throw new Error(error.message);
    }
  };