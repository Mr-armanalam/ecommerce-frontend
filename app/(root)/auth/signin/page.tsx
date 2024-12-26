"use client";

import { lora } from "@/components/Header";
import { getSignUp } from "@/lib/action/getSignup.action";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = (event.target as HTMLFormElement).email.value;
    const password = (event.target as HTMLFormElement).password.value;
    if (email && password) {
      await signIn("credentials", {
      email,
      password,
      callbackUrl: "/account",
    });}
    router.push("/account");
  };

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = (event.target as HTMLFormElement).email.value;
    const password = (event.target as HTMLFormElement).password.value;
    if (email && password) {
      const result = await getSignUp({email, password});
      console.log(result);      
      if (result?.message === 'ok') {
        await signIn("credentials", { email, password, callbackUrl: "/account",});
      }else {
        console.log('something is wrong');       
      }
    }
    // router.push("/account");
  }
  
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/account" });
  };

  return (
    <div className="center h-[90vh] max-md:px-4 md:px-12 ">
      <div className="grid grid-cols-2 max-sm:grid-cols-1 w-full lg:w-[72vw] h-fit max-sm:p-10 sm:p-16 rounded-3xl bg-white">
        <div className={`${lora.className}`}>
          <h1 >{isSignUp ? "Sign Up" : "Sign In"}</h1>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="mt-2 text-gray-500 hover:text-gray-800 max-sm:hidden"
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
        <div>
          <form
            onSubmit={isSignUp ? handleSignUp : handleSignIn}
            className="flex gap-4 flex-col"
          >
            <input
              name="email"
              type="email"
              placeholder="email"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="password"
              required
            />
            <button 
              className="btn_block bg-gray-800 font-bold rounded-3xl mt-3 px-6 py-2 text-white" 
              type="submit"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
            <label className="text-center font-bold text-gray-600">OR</label>
          </form>
          <button 
            className="btn_block py-2 px-6 rounded-3xl font-bold border-2 mt-2 border-gray-400 " 
            onClick={handleGoogleSignIn}
          >
            Sign In with Google
          </button>
          {/* extra for responsive */}
          <button  
            onClick={() => setIsSignUp(!isSignUp)}
            className="mt-2 text-gray-500 hover:text-gray-800 max-sm:pl-10 sm:hidden"
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
