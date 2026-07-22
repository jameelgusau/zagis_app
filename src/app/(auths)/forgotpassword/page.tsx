'use client'
import Link from "next/link";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from 'sonner';
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import apiCliet from '@/lib/axios'
import { APIS } from '@/lib/config';
import { ArrowLeft } from "lucide-react";
import { handleApiError } from "@/services/apiHandler";

interface LoginFormInput {
    email: string;
}

export default function ForgotPassword() {
    const router = useRouter();
    const { initreset: { path } } = APIS
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<LoginFormInput>();
    const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
        try {
            const response = await apiCliet.post(
                path,
                data,
                { withCredentials: true }
            );
            if (response.data.meta.status !== 200) throw new Error("Login failed");
            router.push("/checkemail")
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
                    <h1 className="font-bold text-[24px] m-[5px_0]">Forgot password?</h1>
                    <p className="text-[14px] m-[5px_0]">No worries, we&apos;ll send you reset instructions.</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="m-0 w-full">
                        <div className="my-5 w-full">
                            <div className="relative">
                                <label className="text-[12px] font-bold">Email</label>
                                <Input type="email"
                                    placeholder="Enter your email address ..."
                                    {...register("email", { required: true })}
                                    aria-invalid={errors.email ? "true" : "false"}
                                />
                                {errors.email && (
                                    <em className="inline-block absolute bottom-[-19.5px] left-2.5 text-destructive italic text-[0.7em]">Email is required</em>
                                )}
                            </div>
                        </div>
                        <div className="w-full py-4">
                            <Button
                                className="w-full"
                            >
                                Reset password
                            </Button>
                        </div>
                        <Link
                            href="/"

                        >
                            <span className="flex justify-center items-center gap-1.5"><ArrowLeft />Back to login</span>
                        </Link>
                    </form>
                </div>
            </div>
        </section>
    )
}