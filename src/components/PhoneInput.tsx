"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { cn } from "@/lib/utils";

interface PhoneFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label?: string;
    rules?: object;
}

export function PhoneField<T extends FieldValues>({ control, name, label, rules }: PhoneFieldProps<T>) {
    return (
        <div className='relative'>
            {label && (
                <label className="text-[12px] font-bold">
                    {label}
                </label>
            )}
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <PhoneInput
                        {...field}
                        defaultCountry="NG"
                        placeholder="Enter phone number"
                        className={cn(
                            "flex h-10 w-full rounded-md border border-input"

                        )}
                    />

                )}
            />
        </div>
    );
}
