"use client"
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { PhoneField } from "@/components/PhoneInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import Uploader from "@/components/Uploader/Uploader";
import { useAuthStore } from "@/store/auth-store";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { APIS } from '@/lib/config';
import axios from 'axios';
import { toast } from 'sonner';

type FormValues = {
    image: File | null;
    full_name: string
    phone: string;
    email: string
}

const UpdateUser = () => {
    const axiosPrivate = useAxiosPrivate()
    const { updateUser: { path } } = APIS
    const { user, accessToken, setAuth } = useAuthStore((s) => s);
    const { control, handleSubmit, register,
        formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
            defaultValues: {
                full_name: "",
                phone: "",
                email: '',
                image: null

            },
        });
    useEffect(() => {
        if (user) {
            reset({
                full_name: user.full_name,
                phone: user.phone,
                email: user.email,
            })
        }
    }, [user, reset])

    const onSubmit = async (data: FormValues) => {
        if (user) {
         
            const formData = new FormData();
            formData.append("id", user.id);
            formData.append("full_name", data.full_name);
            formData.append("phone", data.phone);
            formData.append("email", data.email);
            if (data.image) {
                formData.append("image", data.image);
            }
            try {
                const response = await axiosPrivate.put(
                    path,
                    formData
                );
                if (response.data.meta.status !== 200) throw new Error("Login failed");
                const { message } = response.data.meta;
                // const users = await getUsersRequest(axiosPrivate);
                const newData = response.data.data
                // reset()
                if(accessToken) setAuth(newData, accessToken);
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

        }


    }
    return (
        <div className="my-3">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex w-full items-center justify-center m-3">
                    <Controller
                        name="image"
                        control={control}
                        render={({ field }) => (
                            <Uploader
                                value={field.value}
                                imageUrl={user?.link}
                                onChange={field.onChange}
                                size={160}
                            />
                        )}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="w-full sm:mb-3">
                        <div className="relative">
                            <label className="text-[12px] font-bold">Full Name*</label>
                            <Input type="text"
                                placeholder="Enter Full Name"
                                {...register("full_name", { required: true })}
                                aria-invalid={errors.full_name ? "true" : "false"}
                            />
                            {errors.full_name && (
                                <em className="inline-block absolute bottom-[-19.5px] left-2.5 text-destructive italic text-[0.7em]">Full Name is required</em>
                            )}
                        </div>
                    </div>
                    <div className="mb-3 w-full">
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
                    <div className="mb-3 w-full">
                        <PhoneField
                            name="phone"
                            control={control}
                            label="Phone Number"
                            rules={{ required: "Phone number is required" }}

                        />
                        {errors.phone && (
                            <em className="inline-block absolute bottom-[-19.5px] left-2.5 text-destructive italic text-[0.7em]">Number is required</em>
                        )}
                    </div>
                </div>
                <div className="flex w-full mt-3">
                    <Button type="submit" className="text-white w-full cursor-pointer" disabled={isSubmitting}>{isSubmitting ? (
                        <div className="flex items-center gap-2">
                            <Spinner className="h-4 w-4 animate-spin" />
                            Processing
                        </div>
                    ) : (
                        "Update"
                    )}
                    </Button>
                </div>

            </form >
        </div>
    )
}

export default UpdateUser