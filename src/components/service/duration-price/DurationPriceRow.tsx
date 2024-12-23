"use client";

import React from "react";
import { Skeleton } from "@/components/skeleton/skeleton";
import { cn } from "@/lib/utils";

const DurationPriceRow: React.FC<DurationPriceRowProps> = ({
  id,
  serviceTypeName,
  durationHours,
  priceMultiplier,
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
      <div className="mb-2 ml-5 flex w-full items-center justify-start md:mb-0 md:w-[500px] md:py-6">
        {isLoading ? (
          <Skeleton className="h-4 w-full"></Skeleton>
        ) : (
          <div className="text-sm text-[#202224cc]">
            <span className="font-Averta-Semibold xl:hidden">NAME: </span>
            {serviceTypeName}
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
            {durationHours}
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
              className={`relative flex min-h-[27px] items-start justify-between gap-4 rounded-md bg-opacity-20 px-4 py-1.5`}
            >
              <div className="z-0 my-auto flex-1 shrink basis-0 font-Averta-Bold text-[13px]">
                {priceMultiplier}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DurationPriceRow;
