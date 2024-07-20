import Link from "next/link"
import bg from '@/public/bg.jpg';
import React from "react";
import Image from "next/image";

interface WrapperProps {
    formType: "login" | "signup";
    children: any;
}

interface Details {
    title: string;
    description: string;
    span: string;
    href: string;
    anchor: string;
}

interface AuthFormProps {
    formType: any;
    children: any;
}


export const AuthForm: React.FC<AuthFormProps> = async ({ formType, children }) => {
    let details: any;
    if (formType === "signup") {
        details = {
            title: "Create an Account",
            description: "Please fill in the details to sign up.",
            span: "Already have an account? ",
            href: '/login',
            anchor: "login"
        }
    } else if (formType === "login") {
        details = {
            title: "Login to your Account",
            description: "Please fill in the details to login.",
            span: "Don't have an account? ",
            href: '/signup',
            anchor: "Sign up"
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-[800px] h-[590px] mx-auto flex">
                <div className="relative hidden xl:block xl:w-1/2">
                    <Image src={bg} alt="Background" layout="fill" objectFit="cover" />
                </div>
                <div className="w-full xl:w-1/2 p-8 bg-gray-50 flex flex-col justify-center h-full">

                    <div className="mb-8 space-y-3">
                        <h1 className="text-4xl font-bold text-gray-800">{details?.title}</h1>
                        <p className="text-md text-black">{details?.description}</p>
                    </div>
                    {children}
                    <div className="mt-6 flex items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="flex-shrink mx-4 text-gray-700">OR</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                    <div className="mt-6">
                        <button className="w-full group h-10 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">

                            <div className="relative flex items-center space-x-4 justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="size-7" viewBox="0 0 48 48">
                                    <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                </svg>
                                <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                                    Continue with Google
                                </span>
                            </div>
                        </button>
                        <div className="text-center mt-2">
                            <span className="text-gray-700 text-sm">{details.span} </span>
                            <Link href={details.href} className="text-blue-600 hover:underline">{details.anchor}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}