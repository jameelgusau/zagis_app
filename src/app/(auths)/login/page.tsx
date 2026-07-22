'use client'
import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';
import { useRouter } from "next/navigation";
import apiCliet from '@/lib/axios'
import { APIS } from '@/lib/config';
import { useAuthStore } from "@/store/auth-store";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from "lucide-react";
import { Input } from '@/components/ui/input';

interface LoginFormInput {
    email: string;
    password: string;
}
export default function Signin() {
    const { login: { path } } = APIS
    const router = useRouter();
    const setAuth = useAuthStore((s) => s.setAuth);
    const [show, setShow] = useState(false);
    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit
    } = useForm<LoginFormInput>();

    const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
        try {
            const response = await apiCliet.post(
                path,
                data,
                { withCredentials: true }
            );
            if (response.data.meta.status !== 200) throw new Error("Login failed");
            const { jwtToken, ...user } = response.data.data;
            setAuth(user, jwtToken);
            router.push("/home")
            toast.success(`Welcome Back ${user.full_name}!`, { position: "top-right" })
        } catch (err) {
            let message = "Something went wrong";

            if (axios.isAxiosError(err)) {
                message =
                    err.response?.data?.meta?.message ||
                    err.message;
            } else if (err instanceof Error) {
                message = err.message;
            }
            toast.error(message, { position: "top-right" })
        }
    }

    return (
            <section className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-[#18181B]">

                <div className="w-full max-w-lg flex-col items-center justify-between p-4 sm:p-10 bg-white dark:bg-[#0A0A0A] sm:items-start rounded-2xl">
                    <div className="flex items-center w-full  justify-center">

                        <Image
                            className="dark:invert"
                            src="/logo.png"
                            alt="Next.js logo"
                            width={200}
                            height={200}
                            priority
                        />
                    </div>
                    <div className=" items-center gap-6 text-center sm:items-start sm:text-left">
                        <h1 className="font-bold text-[24px] m-[5px_0]">Welcome back</h1>
                        <p className="text-[14px] m-[5px_0]">Please sign in to your account.</p>
                        <form onSubmit={handleSubmit(onSubmit)} className="m-0 w-full">
                            <div className="my-5 w-full">
                                <div className="relative">
                                    <label className="text-[12px] font-bold">Email</label>
                                    <Input type="email"
                                        // name='email' 
                                        placeholder="Your Email..."
                                        {...register("email", { required: true })}
                                        aria-invalid={errors.email ? "true" : "false"}
                                    />
                                    {errors.email && (
                                        <em className="inline-block absolute bottom-[-19.5px] left-2.5 text-destructive italic text-[0.7em]">Email is required</em>
                                    )}
                                </div>
                            </div>
                            <div className="my-5">
                                <div className="relative">
                                    <label className="text-[12px] font-bold">Password</label>
                                    <div className="relative w-full">
                                        <Input
                                            // name='password' 
                                            type={show ? 'text' : 'password'}
                                            placeholder="Your Password..."
                                            {...register("password", { required: true })}
                                            aria-invalid={errors.password ? "true" : "false"}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShow(!show)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
                                        >
                                            {show ? <EyeOff /> : <Eye />}
                                        </button>
                                    </div>
                                    {errors.password && <em className="inline-block absolute bottom-[-19.5px] left-2.5 text-destructive italic text-[0.7em]">Password is required</em>}
                                </div>
                            </div>
                            <span className='flex justify-end underline'>
                                <Link href="/forgotpassword"
                                >Forgot Password?</Link></span>
                            <div className="w-full mt-2">
                                <Button
                                    disabled={isSubmitting}
                                    className='w-full'
                                >
                                    {isSubmitting ? "Logging in..." : "Login"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
    );
}
