"use client";

import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangePickerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  className?: string;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >;
}

export function DateRangePicker<T extends FieldValues>({
  name,
  control,
  label,
  placeholder = "Pick a date range",
  className,
  rules,
}: DateRangePickerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => {
        const value = field.value as DateRange | undefined;

        return (
          <div className={cn("space-y-2", className)}>
            {label && (
              <label className="text-[12px] font-bold">
                {label}
              </label>
            )}

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                       "w-full justify-start text-left font-normal h-10 shadow-none border border-border rounded text-[13px]",
                    !value?.from && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />

                  {value?.from ? (
                    value.to ? (
                      <>
                        {format(value.from, "PPP")} -{" "}
                        {format(value.to, "PPP")}
                      </>
                    ) : (
                      format(value.from, "PPP")
                    )
                  ) : (
                    placeholder
                  )}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={value}
                  onSelect={field.onChange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        );
      }}
    />
  );
}