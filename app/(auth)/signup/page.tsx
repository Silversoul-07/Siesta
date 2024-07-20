'use client';
import { AuthForm } from "@/components/Auth"
import { signUp } from "@/lib/auth"
import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: 'Sign up'
// }


export default async function signup() {

    const handleSignUp = async () => {
        const form = document.querySelector('form');
        if (!form) return;
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
        const rePassword = formData.get('re-password');

        if (!name || !email || !password) {
            alert('All fields are required');
            return;
        }

        if (password !== rePassword) {
            alert('Passwords do not match');
            return;
        }

        const result = await signUp(name, email, password);
        if (result) {
            alert('User registered successful. Redirecting to login page');
            window.location.href = '/login';
        } else {
            alert('Registration failed');
        }
    };
    return (
        <AuthForm formType={"signup"}>
            <form>
                <div className="mb-4 relative">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-8 absolute inset-y-0 left-0 flex items-center pl-2 pt-3">   <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /> </svg>                    <input
                        className="text-sm appearance-none rounded-full w-full py-2 pl-10 pr-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline focus:bg-white h-10"
                        name="name"
                        type="text"
                        placeholder='name'
                    />
                </div>
                <div className="mb-4 relative">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-8 absolute inset-y-0 left-0 flex items-center pl-2 pt-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
                    </svg>

                    <input
                        className="text-sm appearance-none rounded-full w-full py-2 pl-10 pr-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline focus:bg-white h-10"
                        name="email" type="email" required placeholder='Email'
                    />
                </div>
                <div className="mb-4 relative">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="size-8 absolute inset-y-0 left-0 flex items-center pl-2 pt-3" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg >
                    <input
                        className="text-sm appearance-none rounded-full w-full py-2 pl-10 pr-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline focus:bg-white h-10"
                        name="password" type="password" required placeholder='Password'
                    />
                </div>
                <div className="mb-4 relative">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="size-8 absolute inset-y-0 left-0 flex items-center pl-2 pt-3" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg >                    <input
                        className="text-sm appearance-none rounded-full w-full py-2 pl-10 pr-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline focus:bg-white h-10"
                        name="re-password" type="password" required placeholder='Confirm Password'
                    />
                </div>
                <div className="flex w-full mt-8">
                    <button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 font-semibold rounded-full focus:outline-none focus:shadow-outline h-10 transition duration-300"
                        type="button"
                        onClick={handleSignUp}
                        >
                        Create Account
                    </button>
                </div>
            </form>
        </AuthForm>
    )
}