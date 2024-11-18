'use client';

import React, { useState } from 'react';
import { Label } from '../ui/label';

interface MultiLineInputProps {
  labelText: string;
  inputPlaceholder: string;
  inputId: string;
  inputWidth?: string;
  inputHeight?: string;
  defaultValue: string;
  setValue: (value: string) => void;
}

export function MultiLineInput({
  labelText,
  inputPlaceholder,
  inputId,
  inputWidth = 'w-full',
  inputHeight = 'h-full',
  defaultValue,
  setValue,
}: MultiLineInputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="grid max-w-max items-center gap-1.5">
      <Label
        className="text-[14px] font-Averta-Semibold text-[#9FA7B0]"
        htmlFor={inputId}
      >
        {labelText}
      </Label>
      <textarea
        id={inputId}
        className={`${inputWidth} ${inputHeight} font-Averta-Regular text-base text-[#5f6367]
                "flex rounded-md border border-[#D3D8DD] bg-transparent px-3 py-1 shadow-sm
                transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground
                placeholder:text-[#88939D] focus-visible:outline-none focus-visible:ring-1 focus-visible:border-[#1A78F2] focus-visible:ring-[#1A78F2] 
                disabled:cursor-not-allowed disabled:opacity-50"`}
        value={defaultValue}
        onChange={handleChange}
        placeholder={inputPlaceholder}
      />
      {/* <p className="mt-2 text-gray-600">You have typed: {inputValue}</p> */}
    </div>
  );
}
