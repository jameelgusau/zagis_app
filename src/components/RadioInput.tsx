'use client';

import React from 'react';
import { Controller, Control,  FieldValues, Path} from 'react-hook-form';

interface RadioButtonProps {
  value: string | number;
  label: string;
  checked: boolean;
  onChange: () => void;
  primaryColor?: string;
  disabled?: boolean;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  value,
  label,
  checked,
  onChange,
  primaryColor = '#205072',
  disabled
}) => (
  <label
    className={`flex text-[13px] gap-2.5 ${
      disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
    }`}
  >
    <input
      type="radio"
      value={value}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className="peer sr-only"
    />
    <span
      className="h-4 w-4 rounded-full border flex items-center justify-center"
      style={{ borderColor: checked ? primaryColor : '#eee' }}
    >
      {checked && (
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: primaryColor }}
        />
      )}
    </span>
    {label}
  </label>
);

interface RHFRadioGroupProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  options: { value: string | number; label: string }[];
  primaryColor?: string;
  rules?: object;
  disabled?: boolean;
}


const RHFRadioGroup = <T extends FieldValues>({
  name,
  control,
  options,
  primaryColor,
  rules,
  disabled
}: RHFRadioGroupProps<T>) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field }) => (
      <div className="flex gap-2.5">
        {options.map(option => (
          <RadioButton
            key={option.value}
            value={option.value}
            label={option.label}
            checked={field.value === option.value}
            onChange={() => field.onChange(option.value)}
            primaryColor={primaryColor}
            disabled={disabled}
          />
        ))}
      </div>
    )}
  />
);

export default RHFRadioGroup;