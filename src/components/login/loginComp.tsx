"use client";

import React, {useState} from "react";
import {FaLock, FaUser, FaEye, FaEyeSlash, FaCheck, FaTimes} from "react-icons/fa";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function LoginComp() {
    const [data, setData] = useState({email: "", password: ""});
    const [passwordVisible, setPasswordVisible] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (data.email === "" || data.password === "") {
            toast.error("Please fill in all fields");
            return;
        }


        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", // Important otherwise the backend won't be able to identify the user
            body: JSON.stringify(data),
        });
        if (res.status === 200) {
            toast.success("Logged in successfully");
        } else if (res.status === 400) {
            const resData = await res.json();
            toast.error(resData.message);
        } else if (res.status === 500) {
            toast.error("An error occurred");
        }
    }
        const handlePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="flex items-center justify-center bg-slate-200 py-8 px-2 min-h-screen animate-gradient-x">
            <div className="bg-white text-white p-5 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl text-black font-bold mr-2">Login</h1>
                <hr className="h-px border-0 mb-6 mt-2 bg-gray-400"/>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="mb-1 flex items-center">
                        <FaUser className="mr-3 text-gray-400"/>
                        <input
                            type="text"
                            name="fqe"
                            onChange={(e) => setData({...data, email: e.target.value})}
                            className="bg-cyan-50 text-black w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
                            placeholder="Email"
                            value={data.email.toLowerCase()}
                        />
                    </div>
                    <div className="mb-4 mt-4">
                        <div className="relative flex items-center">
                            <FaLock className="mr-3 text-gray-400"/>
                            <input
                                type={passwordVisible ? "text" : "password"}
                                name="password"
                                onChange={(e) => setData({...data, password: e.target.value})}
                                value={data.password}
                                className="bg-cyan-50 text-black w-full p-2 pr-8 rounded focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
                                placeholder="Password"
                            />
                            {data.password.length > 0 && (
                                <div
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-300 cursor-pointer hover:text-blue-500"
                                    onClick={handlePasswordVisibility}
                                >
                                    {passwordVisible ? <FaEyeSlash/> : <FaEye/>}
                                </div>
                            )}

                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold w-full py-3 rounded transition duration-200 flex justify-center items-center"
                    >
                        Login
                    </button>
                </form>
                <hr className="h-px border-0 mb-6 mt-5 bg-gray-400"/>
                <div className="text-center text-gray-500">
                    Don't have an account yet?{" "}
                    <a onClick={() => router.push('/register')} className="text-blue-600 hover:underline cursor-pointer">
                        Create one
                    </a>
                    <p className="text-gray-500 mt-2">
                    </p>
                </div>
            </div>
        </div>
    );
}