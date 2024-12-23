"use client";

import React from "react";
import { Skeleton } from "@/components/skeleton/skeleton";
import { cn } from "@/lib/utils";

const ServiceTypeRow: React.FC<ServiceTypeRowProps> = ({
  id,
  category,
  name,
  description,
  basePrice,
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
            {name}
          </div>
        )}
      </div>

      <div className="mb-2 flex w-full items-center justify-start xl:mb-0 xl:w-[276px] xl:py-6">
        {isLoading ? (
          <Skeleton className="h-4 w-full"></Skeleton>
        ) : (
          <div className="text-sm text-[#202224cc]">
            <span className="font-Averta-Bold xl:hidden">Category Name </span>
            {`${category.name}`}
          </div>
        )}
      </div>

      <div className="mb-2 flex w-full items-center justify-start xl:mb-0 xl:w-[350px] xl:py-6">
        {isLoading ? (
          <Skeleton className="h-4 w-full"></Skeleton>
        ) : (
          <div className="text-sm text-[#202224cc]">
            <span className="font-Averta-Semibold xl:hidden">Description </span>
            {description}
          </div>
        )}
      </div>

      <div className="mb-2 flex w-full items-center justify-start xl:mb-0 xl:w-[276px] xl:py-6">
        {isLoading ? (
          <Skeleton className="h-4 w-full"></Skeleton>
        ) : (
          <div className="text-sm text-[#202224cc]">
            <span className="font-Averta-Bold xl:hidden">Base Price</span>
            {`$${basePrice}`}
          </div>
        )}
      </div>
    </div>
  );
};
export default ServiceTypeRow;
