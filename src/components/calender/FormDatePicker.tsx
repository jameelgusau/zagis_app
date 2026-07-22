"use client";

import {
    Control,
    Controller,
    FieldValues,
    Path,
    RegisterOptions,
} from "react-hook-form";

import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface FormDatePickerProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    placeholder?: string;
    fromYear?: number;
    toYear?: number;
    className?: string;
    rules?: Omit<
        RegisterOptions<T, Path<T>>,
        "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
    >;
}

export function FormDatePicker<T extends FieldValues>({
    name,
    control,
    label,
    placeholder = "Pick a date",
    fromYear = 1900,
    toYear = new Date().getFullYear(),
    className,
    rules,
}: FormDatePickerProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => (
                <div className={cn("space-y-2 relative", className)}>
                    {label && (
                        <label className="text-[12px] font-bold">{label}</label>
                    )}

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className={cn(
                                    "w-full justify-between text-left font-normal h-10",
                                    !field.value && "text-muted-foreground"
                                )}
                            >
                                <div className="flex items-center">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? format(field.value, "P") : placeholder}
                                </div>
                            </Button>
                        </PopoverTrigger>
                        {field.value && (
                            <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                className="absolute right-2 top-1/3"
                                onClick={() => field.onChange(null)}
                            >
                                <X />
                            </Button>
                        )}

                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={
                                    field.value as Date
                                        ? field.value
                                        : undefined
                                }
                                onSelect={field.onChange}
                                startMonth={new Date(fromYear, 0)}
                                endMonth={new Date(toYear, new Date().getDay() + 1)}
                                autoFocus
                                captionLayout="dropdown"
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            )}
        />
    );
}
