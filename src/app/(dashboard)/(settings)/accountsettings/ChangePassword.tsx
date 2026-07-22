"use client";
import { useState } from "react";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Eye, EyeOff } from "lucide-react";
import { APIS } from "@/lib/config";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { toast } from 'sonner';

import {
    changePasswordSchema,
    ChangePasswordInput,
} from "@/lib/validations/auth.schema";

export default function ChangePassword() {
    const axiosPrivate = useAxiosPrivate()
    const { changePassword: { path } } = APIS
    const [show, setShow] = useState(false);
    const [showCurrent, setShowCurrent] = useState(false);

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ChangePasswordInput>({
        resolver: zodResolver(changePasswordSchema),
    });


    const onSubmit = async (data: ChangePasswordInput) => {
        try {
            const response = await axiosPrivate.put(
                path, data
            );
            if (response.data.meta.status !== 200) throw new Error("Login failed");
            const { message } = response.data.meta;
            reset()
            toast.success(message, { position: "top-right" })
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
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* Current Password */}
                <div className="mt-5">
                    <label className="text-xs font-bold">
                        Current Password
                    </label>
                    <div className="relative">
                        <Input
                            placeholder="Enter Current Password"
                            type={showCurrent ? "text" : "password"}
                            {...register("current_password")}
                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrent(!showCurrent)}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                            {showCurrent ? <EyeOff /> : <Eye />}
                        </button>
                    </div>
                    {errors.current_password && (
                        <p className="text-destructive text-xs">
                            {errors.current_password.message}
                        </p>
                    )}
                </div>

                {/* New Password */}
                <div className="mt-5">
                    <label className="text-xs font-bold">
                        New Password
                    </label>
                    <div className="relative">
                        <Input
                            placeholder="Enter New Password"
                            type={show ? "text" : "password"}
                            {...register("password")}
                        />
                        <button
                            type="button"
                            onClick={() => setShow(!show)}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                            {show ? <EyeOff /> : <Eye />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-destructive text-xs">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="mt-5">
                    <label className="text-xs font-bold">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <Input
                            placeholder="Enter New Password Again"
                            type={show ? "text" : "password"}
                            {...register("confirm_password")}
                        />
                    </div>
                    {errors.confirm_password && (
                        <p className="text-destructive text-xs">
                            {errors.confirm_password.message}
                        </p>
                    )}
                </div>
            </div>
            <div className="mt-5">
                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? (
                        <div className="flex items-center gap-2">
                            <Spinner className="h-4 w-4 animate-spin" />
                            Processing
                        </div>
                    ) : (
                        "Update"
                    )}
                </Button>
            </div>
        </form>
    );
}