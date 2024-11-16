"use client";

import React, { use, useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
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

interface CustomSelectProps {
  labelText: string;
  inputType: string;
  inputPlaceholder: string;
  inputId: string;
  inputWidth?: string;
  options?: string[];
  defaultValue?: string;
  keyName?: string;
  plusPX?: string;
  className?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onValueChange?: (value: string) => void;
}

export function CustomSelect({
  labelText,
  inputId,
  options = [],
  defaultValue,
  inputWidth = "w-full",
  onValueChange,
  className = "w-full",
}: CustomSelectProps) {
  return (
    <div className={cn("grid max-w-max items-center gap-1.5", className)}>
      <Label
        className="text-[14px] font-Averta-Semibold text-[#9FA7B0]"
        htmlFor={inputId}
      >
        {labelText}
      </Label>

      <Select defaultValue={defaultValue} onValueChange={onValueChange}>
        <SelectTrigger
          className={`${inputWidth} font-Averta-Semibold h-[50px] text-[16px] text-[#5f6367] border-2`}
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
    </div>
  );
}
