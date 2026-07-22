"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";
import Select, { StylesConfig, GroupBase } from "react-select";

/* ---------- shared styles ---------- */

export const customClassNames = {
    control: () =>
        `shadow-none relative bg-white/30 h-10 flex flex-nowrap rounded border border-border w-full text-[13px] font-normal text-[#205072]
     hover:bg-[#d2d2d250] px-2.5 py-2.5 focus:outline-none focus:ring-0`,
    placeholder: () => "text-muted-foreground text-[13px]",
    singleValue: () => "text-[13] text-foreground",
    input: () => "text-[13px]",
    menu: () => "bg-white mt-1 border  rounded shadow",
    option: ({
        isSelected,
        isFocused,
    }: {
        isSelected: boolean;
        isFocused: boolean;
    }) =>
        `text-[13px] px-[10px] py-[6px] cursor-pointer ${isSelected
            ? "bg-primary text-white"
            : isFocused
                ? "bg-primary/50"
                : "text-foreground"
        }`,
};

export type SelectOption = {
    value: string;
    label: string;
};
export const noWrapStyles: StylesConfig<SelectOption, false, GroupBase<SelectOption>> = {
    control: (base) => ({
        ...base,
        flexWrap: "nowrap",
        backgroundColor: "transparent",
        boxShadow: "none",
        minHeight: "2.5rem",
    }),
    indicatorSeparator: () => ({
        display: "none",
    }),
};

/* ---------- component props ---------- */

interface FormSelectProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    placeholder?: string;
    options: { value: string; label: string }[];
    rules?: object;
    className?: string;
}

/* ---------- reusable component ---------- */

export function FormSelect<T extends FieldValues>({
    name,
    control,
    label,
    placeholder,
    options,
    rules,
    // className,
}: FormSelectProps<T>) {
    return (
        // <div className="mx-5">
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
                        <Select<SelectOption, false>
                            {...field}
                            options={options}
                            placeholder={placeholder}
                            className="w-full"
                            unstyled
                            classNames={customClassNames}
                            styles={noWrapStyles}
                        />
                    )}
                />
            </div>
        // </div>
    );
}
