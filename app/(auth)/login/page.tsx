import type { Metadata } from "next";
import { AuthForm } from "@/components/Auth";
import { signIn } from "@/lib/auth";

export const metadata: Metadata = {
    title: "Login",
};

const LoginPage = () => {
    return (
        <AuthForm formType={"login"}>
            <form action={
                async (formdata) => {
                    "use server"
                    await signIn('credentials', {
                        email: formdata.get('email'),
                        password: formdata.get('password'),
                        redirectTo: '/home',
                    })
                }}>
                <div className="mb-4 relative">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 absolute inset-y-0 left-0 flex items-center pl-2 pt-3">   <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /> </svg>
                    <input
                        className="text-sm appearance-none rounded-full w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:bg-white h-10"
                        name="email" type="text" placeholder='Username or Email' />
                </div>
                <div className="mb-2 relative">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke- width="1.5" stroke="currentColor" className="size-8 absolute inset-y-0 left-0 flex items-center pl-2 pt-3" >
                        <path strokeLinecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg >
                    <input
                        className="text-sm appearance-none rounded-full w-full py-2 pl-10 pr-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline focus:bg-white h-10"
                        name="password" type="password" placeholder='Password' />
                    <a className="inline-block align-baseline text-sm text-gray-700 hover:text-gray-800 mt-2" href="#">
                        Forgot Password?
                    </a>
                </div>
                <div className="flex w-full mt-8">
                    <button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 font-semibold rounded-full focus:outline-none focus:shadow-outline h-10 transition duration-300"
                        type="submit">
                        Log In
                    </button>
                </div>
            </form>
        </AuthForm>
    );
}

export default LoginPage;