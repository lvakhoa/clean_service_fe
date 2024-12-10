"use client";

import React, { use, useState } from "react";
import { Checkbox as MaterialCheckbox } from "@material-tailwind/react";
import { Skeleton } from "@/components/skeleton/skeleton";
import { cn } from "@/lib/utils";

const ServiceTypeRow: React.FC<ServiceTypeRowProps> = ({
  id,
  name,
  description,
  basePrice,
  category,
  onRowClick,
  onCheckboxToggle,
  isLoading,
}) => {
  const serviceColor =
    category?.name === "Home Cleaning"
      ? "bg-[#1A78F2] text-[#1A78F2]"
      : category?.name === "Other Services"
        ? "bg-[#00B69B] text-[#00B69B]"
        : "bg-[#9370db] text-[#171717]";

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    if (onCheckboxToggle) {
      onCheckboxToggle(id, checked);
    }
  };

  return (
    <div
      className={cn(
        "flex h-auto w-full flex-wrap items-start gap-3 border-b border-gray-200 bg-white p-2.5 md:items-center",
        isLoading
          ? "cursor-default hover:bg-white"
          : "cursor-pointer hover:bg-[#f4f7ff]",
      )}
      onClick={() => onRowClick(id)}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <div className="flex min-h-[48px] w-full items-center overflow-hidden pl-px">
          {isLoading ? (
            <Skeleton className="h-4 w-full"></Skeleton>
          ) : (
            <MaterialCheckbox
              color="blue"
              checked={isChecked}
              onChange={handleCheckboxChange}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          )}
        </div>
      </div>

      <div className="mb-2 flex w-full items-center justify-start md:mb-0 md:w-[210px] md:py-6">
        {isLoading ? (
          <Skeleton className="h-4 w-full"></Skeleton>
        ) : (
          <div className="text-sm text-[#202224cc]">
            <span className="font-Averta-Semibold xl:hidden">NAME: </span>
            {name}
          </div>
        )}
      </div>

      <div className="mb-2 flex w-full items-center justify-start xl:mb-0 xl:w-[552px] xl:py-6">
        {isLoading ? (
          <Skeleton className="h-4 w-full"></Skeleton>
        ) : (
          <div className="text-sm text-[#202224cc]">
            <span className="font-Averta-Semibold xl:hidden">
              DESCRIPTION:{" "}
            </span>
            {description}
          </div>
        )}
      </div>

      <div className="mb-2 flex w-full items-center justify-start xl:mb-0 xl:w-[210px] xl:py-6">
        {isLoading ? (
          <Skeleton className="h-4 w-full"></Skeleton>
        ) : (
          <div className="flex flex-row items-center gap-2 text-sm text-[#202224cc]">
            <span className="font-Averta-Bold xl:hidden">
              SERVICE CATEGORY:{" "}
            </span>
            <div
              className={`relative flex min-h-[27px] items-start justify-between gap-4 px-4 py-1.5 ${serviceColor} rounded-md bg-opacity-20`}
            >
              <div className="z-0 my-auto flex-1 shrink basis-0 font-Averta-Bold text-[13px]">
                {category?.name}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mb-2 flex w-full items-center justify-start xl:mb-0 xl:w-[150px] xl:py-6">
        {isLoading ? (
          <Skeleton className="h-4 w-full"></Skeleton>
        ) : (
          <div className="text-sm text-[#202224cc]">
            <span className="font-Averta-Bold xl:hidden">BASE PRICE: </span>
            {`$${basePrice}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceTypeRow;
