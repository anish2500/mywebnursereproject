"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { startTransition, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LoginData, loginSchema } from "../schema";
import { useState } from "react";

export default function LoginForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
        mode: "onSubmit",
    });
    const [pending, setTransition] = useTransition();
    const [showPassword, setShowPassword] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const submit = async (values: LoginData) => {
        // GOTO
        setTransition( async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setShowSuccess(true);
            // router.push("/");
        })
        console.log("login", values);
    };

    return (
        <div className="w-full max-w-105 bg-white rounded-2xl shadow-xl px-10 py-12 text-center font-montserrat">
            {showSuccess && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                    Login successful! Welcome back.
                </div>
            )}
            <h2 className="text-2xl font-bold text-gray-800 mb-2 font-montserrat">Sign in to your account</h2>
            <p className="text-sm text-gray-500 mb-8">
                Enter your credentials to access your account
            </p>

            <form onSubmit={handleSubmit(submit)} className="space-y-6">
                {/* Email */}
                <div className="text-left">
                    <div className="relative">
                        <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-green-500">
                            email
                        </span>
                        <input
                            type="email"
                            {...register("email")}
                            placeholder="Email address"
                            className={`w-full px-5 py-4 rounded-xl border bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 pl-12 ${
                                errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200'
                            }`}
                        />
                    </div>
                    {errors.email?.message && (
                        <span className="text-red-500 text-sm mt-1 block">{errors.email.message}</span>
                    )}
                </div>

                {/* Password */}
                <div className="text-left">
                    <div className="relative">
                        <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-green-500">
                            lock
                        </span>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            {...register("password")}
                            placeholder="Password"
                            className={`w-full px-5 py-4 rounded-xl border bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 pl-12 pr-12 ${
                                errors.password ? 'border-red-500 bg-red-50' : 'border-gray-200'
                            }`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600"
                        >
                            <span className="material-icons">
                                {showPassword ? 'visibility_off' : 'visibility'}
                            </span>
                        </button>
                    </div>
                    {errors.password?.message && (
                        <span className="text-red-500 text-sm mt-1 block">{errors.password.message}</span>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isSubmitting || pending}
                    className="w-full py-4 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition shadow-md hover:shadow-lg disabled:opacity-60"
                >
                    {isSubmitting || pending ? "Signing in..." : "Continue"}
                </button>
            </form>

            <p className="text-sm text-gray-500 mt-6">
                Don't have an account?{' '}
                <Link href="/register" className="text-green-600 font-semibold cursor-pointer hover:underline">
                    Register
                </Link>
            </p>
        </div>
    );
}
