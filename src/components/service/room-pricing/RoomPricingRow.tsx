"use client";

import React, { useState } from "react";
import { Checkbox as MaterialCheckbox } from "@material-tailwind/react";
import { Skeleton } from "@/components/skeleton/skeleton";
import { cn } from "@/lib/utils";

const RoomPricingRow: React.FC<RoomPricingRowProps> = ({
  id,
  serviceTypeName,
  roomCount,
  roomType,
  additionalPrice,
  onRowClick,
  isLoading,
}) => {
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
      <div className="mb-2 ml-5 flex w-full items-center justify-start xl:mb-0 xl:w-[300px] xl:py-6">
        {isLoading ? (
          <Skeleton className="h-4 w-full"></Skeleton>
        ) : (
          <div className="text-sm text-[#202224cc]">
            <span className="font-Averta-Semibold xl:hidden">
              Service Type Name:{" "}
            </span>
            {serviceTypeName}
          </div>
        )}
      </div>
      <div className="mb-2 flex w-full items-center justify-start xl:mb-0 xl:w-[350px] xl:py-6">
        {isLoading ? (
          <Skeleton className="h-4 w-full"></Skeleton>
        ) : (
          <div className="text-sm text-[#202224cc]">
            <span className="font-Averta-Semibold xl:hidden">Title: </span>
            {roomType}
          </div>
        )}
      </div>

      <div className="mb-2 flex w-full items-center justify-start xl:mb-0 xl:w-[276px] xl:py-6">
        {isLoading ? (
          <Skeleton className="h-4 w-full"></Skeleton>
        ) : (
          <div className="text-sm text-[#202224cc]">
            <span className="font-Averta-Bold xl:hidden">ROOM COUNT</span>
            {roomCount}
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
            {`$${additionalPrice}`}
          </div>
        )}
      </div>
    </div>
  );
};
export default RoomPricingRow;
