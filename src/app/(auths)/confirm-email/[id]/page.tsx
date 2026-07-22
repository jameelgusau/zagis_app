'use client'
import Link from "next/link";
import { useState } from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from 'sonner';
import apiCliet from '@/lib/axios'
import { APIS } from '@/lib/config';
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { handleApiError } from "@/services/apiHandler";
import { useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    setPasswordSchema,
    SetPasswordInput,
} from "@/lib/validations/auth.schema";


export default function Page() {
    const params = useParams();
    const id = params?.id as string;
    const router = useRouter();
    const { verifyEmail: { path } } = APIS
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {
        register,
        formState: { errors },
        handleSubmit,
        // watch,
    } = useForm<SetPasswordInput>({
        resolver: zodResolver(setPasswordSchema),
    });
    const onSubmit: SubmitHandler<SetPasswordInput> = async (data) => {
        const newData = {
            ...data,
            token: id
        }
        try {
            const response = await apiCliet.post(
                path,
                newData,
                { withCredentials: true }
            );
            if (response.data.meta.status !== 200) throw new Error("Login failed");
            router.push("/")
            toast.success(`${response.data.meta.message}!`, { position: "top-right" })
        } catch (err) {
    
            handleApiError(err);
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
                    <h1 className="font-bold text-[24px]  m-[5px_0]">Set a Password</h1>
                    <p className="text-[14px] m-[5px_0]">Fill the form below to set your password.</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="m-0 w-full">
                        <div className="my-5">
                            <div className="relative">
                                <label className="text-[12px] font-bold">New Password</label>
                                <div className="relative w-full">
                                    <Input
                                        // name='password' 
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="New Password..."
                                        {...register("password", { required: true })}
                                        aria-invalid={errors.password ? "true" : "false"}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
                                    >
                                        {showPassword ? <EyeOff /> : <Eye />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-destructive text-xs">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="my-5">
                            <div className="relative">
                                <label className="text-[12px] font-bold">Confirm Password</label>
                                <div className="relative w-full">
                                    <Input
                                        placeholder="Enter New Password Again"
                                        type={showConfirmPassword ? "text" : "password"}
                                        {...register("confirm_password")}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
                                    >
                                        {showConfirmPassword ? <EyeOff /> : <Eye />}
                                    </button>
                                </div>
                                {errors.confirm_password && (
                                    <p className="text-destructive text-xs">
                                        {errors.confirm_password.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="w-full grid gap-2 pt-6.25">
                            <Button
                            >
                                Reset Password
                            </Button>
                            <Link
                                href="/"

                            >
                                <span className="flex justify-center items-center gap-1.5"><ArrowLeft />Back to Login</span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
