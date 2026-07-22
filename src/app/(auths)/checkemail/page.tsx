// 'use client'
import Link from "next/link";
import { ArrowLeft, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Page() {
    return (
        <section className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-[#18181B]">

            <div className="w-full max-w-lg flex-col items-center justify-between p-4 sm:p-10 bg-white dark:bg-[#0A0A0A] sm:items-start rounded-2xl">
                <div className="m-6 items-center gap-6 text-center sm:items-start sm:text-left">
                    <div className="flex items-center justify-center">
                             <MailCheck width={100} height={100} color="#CE493D"/>
                    </div>
               
                    <h1 className="font-bold text-2xl m-[5px_0]">Check your email!</h1>
                    <p className="text-[14px] m-[5px_0">We sent a password reset link to.</p>

                    <div className="my-5 w-full">
                    </div>
                    <div className="w-full py-4">
                        <Button
                            className="w-full"
                        >
                            Open email app
                        </Button>
                    </div>
                    <Link
                        href="/"
                    >
                        <span className="flex justify-center items-center gap-1.5"><ArrowLeft />Back to login</span>
                    </Link>
                </div>
            </div>
        </section>
    )
}