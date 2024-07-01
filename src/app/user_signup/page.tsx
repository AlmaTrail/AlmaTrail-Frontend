'use client';
import Link from "next/link";
import { useState } from "react";
import Navbar from '@/components/navbar';

function SignUp() {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    return (
        <main>
            <div className="h-screen bg-[#3b0764] flex justify-center relative">
                <Navbar />
                <div className="w-1/3 flex flex-col justify-center px-6 py-12">
                    <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-white">
                        Sign up because you deserve
                    </h2>
                    <div className="mt-8">
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setemail(e.target.value)}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                        Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setpassword(e.target.value)}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                        Confirm Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setpassword(e.target.value)}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign up
                                </button>
                            </div>
                            <p className="text-white text-sm">Already signed up? <Link className="text-purple-400" href={'/user_signup'}>Login here</Link></p>
                        </form>

                    </div>
                </div>
            </div>
        </main>
    )
}

export default SignUp;