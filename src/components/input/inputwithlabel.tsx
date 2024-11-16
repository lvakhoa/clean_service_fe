"use client";

import React, { use, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { set } from "zod";
interface InputWithLabelProps {
  labelText: string;
  inputType: string;
  inputPlaceholder: string;
  inputId: string;
  inputWidth?: string;
  options?: string[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  keyName?: string;
  plusPX?: string;
  className?: string;
}

export function InputWithLabel({
  labelText,
  inputType,
  inputPlaceholder,
  inputId,
  inputWidth = "w-full",
  options = [],
  defaultValue,
  keyName,
  plusPX,
  className,
}: InputWithLabelProps) {
  const { register, setValue } = useFormContext();
  const [selectedValue, setSelectedValue] = useState(defaultValue ?? "");

  useEffect(() => {
    setSelectedValue(defaultValue ?? selectedValue);
  }, [defaultValue]);

  return (
    <div className={cn("grid max-w-max items-center gap-1.5", className)}>
      <Label
        className="text-[14px] font-Averta-Semibold text-[#9FA7B0]"
        htmlFor={inputId}
      >
        {labelText}
      </Label>
      {inputType === "combobox" ? (
        <Select
          value={selectedValue}
          onValueChange={(value) => {
            setSelectedValue(value);
            setValue(keyName || inputId, value);
          }}
        >
          <SelectTrigger
            className={`${inputWidth} font-Averta-Regular h-[50px] text-[16px] text-[#5f6367] border-2`}
            style={{ width: `${inputWidth}` }}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {options.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : (
        <Input
          className="font-Averta-Regular h-[50px] text-[16px] text-[#5f6367] border-2"
          type={inputType}
          id={inputId}
          placeholder={inputPlaceholder}
          defaultValue={defaultValue}
          style={
            plusPX
              ? { width: `calc(${inputWidth} + ${plusPX})` }
              : { width: `${inputWidth}` }
          }
          {...register(keyName || inputId)}
        />
      )}
    </div>
  );
}
