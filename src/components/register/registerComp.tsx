"use client";

import React, {useState} from "react";
import {FaLock, FaUser, FaEye, FaEyeSlash, FaCheck, FaTimes} from "react-icons/fa";
import toast from "react-hot-toast";

import {useRouter} from "next/navigation";

export default function RegisterComp() {
    const [data, setData] = useState({email: "", password: ""});
    const [passwordVisible, setPasswordVisible] = useState(false);
    const router = useRouter();

    const [passwordCriteria, setPasswordCriteria] = useState({
        minLength: false,
        specialChar: false,
        lowercase: false,
        uppercase: false
    });

    const checkPasswordCriteria = (password :any) => {
        const minLength = password.length >= 8;
        const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const lowercase = /[a-z]/.test(password);
        const uppercase = /[A-Z]/.test(password);

        setPasswordCriteria({ minLength, specialChar, lowercase, uppercase });
    };

    const handlePasswordChange = (e: any) => {
        const newPassword = e.target.value;
        setData({ ...data, password: newPassword });
        checkPasswordCriteria(newPassword);
    };


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (data.email === "" || data.password === "") {
            toast.error("Please fill in all fields");
            return;
        }


        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (res.status === 200) {
            toast.success("Account created successfully");
            await router.push("/login");
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
                <h1 className="text-2xl text-black font-bold mr-2">Register</h1>
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
                                onChange={handlePasswordChange}
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
                        {data.password.length > 0 && (
                        <div className="space-y-1 ml-6 mt-2">
                            <div
                                className={`flex items-center ${passwordCriteria.minLength ? 'text-green-500' : 'text-red-500'}`}>
                                {passwordCriteria.minLength ? <FaCheck/> : <FaTimes/>}
                                <span className="ml-2">At least 8 characters</span>
                            </div>
                            <div
                                className={`flex items-center ${passwordCriteria.specialChar ? 'text-green-500' : 'text-red-500'}`}>
                                {passwordCriteria.specialChar ? <FaCheck/> : <FaTimes/>}
                                <span className="ml-2">At least 1 special character</span>
                            </div>
                            <div
                                className={`flex items-center ${passwordCriteria.lowercase ? 'text-green-500' : 'text-red-500'}`}>
                                {passwordCriteria.lowercase ? <FaCheck/> : <FaTimes/>}
                                <span className="ml-2">At least 1 lowercase letter</span>
                            </div>
                            <div
                                className={`flex items-center ${passwordCriteria.uppercase ? 'text-green-500' : 'text-red-500'}`}>
                                {passwordCriteria.uppercase ? <FaCheck/> : <FaTimes/>}
                                <span className="ml-2">At least 1 uppercase letter</span>
                            </div>
                        </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold w-full py-3 rounded transition duration-200 flex justify-center items-center"
                    >
                        Register
                    </button>
                </form>
                <hr className="h-px border-0 mb-6 mt-5 bg-gray-400"/>
                <div className="text-center">
                    <p className="text-gray-500">
                        Already have an account?{" "}
                        <a onClick={() => router.push('/login')}
                           className="text-blue-600 hover:underline cursor-pointer">
                            Login
                        </a>
                    </p>
                    <p className="text-gray-500 mt-2">
                        By creating an account you agree to our{" "}
                        <a onClick={() => router.push('/tos')}
                           className="text-blue-600 hover:underline cursor-pointer">
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a onClick={() => router.push('/privacy')}
                           className="text-blue-600 hover:underline cursor-pointer">
                            Privacy Policy
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}