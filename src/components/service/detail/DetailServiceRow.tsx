"use client";

import React, { useState } from "react";
import { Checkbox as MaterialCheckbox } from "@material-tailwind/react";
import { Skeleton } from "@/components/skeleton/skeleton";
import { cn } from "@/lib/utils";

const DetailServiceRow: React.FC<DetailServiceRowProps> = ({
  id,
  title,
  additionalPrice,
  multiplyPrice,
  serviceType,
  onRowClick,
  onCheckboxToggle,
  isLoading,
}) => {
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

      <div className="mb-2 flex w-full items-center justify-start xl:mb-0 xl:w-[210px] xl:py-6">
        {isLoading ? (
          <Skeleton className="h-4 w-full"></Skeleton>
        ) : (
          <div className="text-sm text-[#202224cc]">
            <span className="font-Averta-Semibold xl:hidden">CATEGORY: </span>
            {serviceType?.name}
          </div>
        )}
      </div>
      <div className="mb-2 flex w-full items-center justify-start xl:mb-0 xl:w-[350px] xl:py-6">
        {isLoading ? (
          <Skeleton className="h-4 w-full"></Skeleton>
        ) : (
          <div className="text-sm text-[#202224cc]">
            <span className="font-Averta-Semibold xl:hidden">Title: </span>
            {title}
          </div>
        )}
      </div>

      <div className="mb-2 flex w-full items-center justify-start xl:mb-0 xl:w-[276px] xl:py-6">
        {isLoading ? (
          <Skeleton className="h-4 w-full"></Skeleton>
        ) : (
          <div className="text-sm text-[#202224cc]">
            <span className="font-Averta-Bold xl:hidden">MULTIPLY PRICE: </span>
            {`$${additionalPrice}`}
          </div>
        )}
      </div>
      <div className="mb-2 flex w-full items-center justify-start xl:mb-0 xl:w-[276px] xl:py-6">
        {isLoading ? (
          <Skeleton className="h-4 w-full"></Skeleton>
        ) : (
          <div className="text-sm text-[#202224cc]">
            <span className="font-Averta-Bold xl:hidden">
              ADDITIONAL PRICE:{" "}
            </span>
            {`${multiplyPrice}x`}
          </div>
        )}
      </div>
    </div>
  );
};
export default DetailServiceRow;
