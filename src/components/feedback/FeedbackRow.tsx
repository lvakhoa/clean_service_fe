"use client";

import React, { useState } from "react";
import { Checkbox } from "@material-tailwind/react";
import { formatDateTime } from "@/helpers/formatDateTime";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Skeleton } from "../skeleton/skeleton";

interface FeedbackRowProps {
  id: string;
  bookingId?: string;
  title: string;
  description?: string;
  sentiment: "Positive" | "Negative" | "Neutral";
  createdAt: string;
  customerName?: string;
  isEven: boolean;
  className?: string;
  isPending: boolean;
  onCheckboxToggle?: (id: string, checked: boolean) => void;
}

const FeedbackRow: React.FC<FeedbackRowProps> = ({
  id,
  bookingId,
  title,
  description,
  sentiment,
  customerName,
  createdAt,
  isEven,
  className,
  isPending,
  onCheckboxToggle,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  //const bgColor = isEven ? "bg-white" : "bg-[#f5f7ff]";
  const sentimentColor =
    sentiment === "Positive"
      ? "bg-[#ccf0eb] text-[#00b69b]"
      : sentiment === "Negative"
      ? "bg-[#fcd7d4] text-[#ef3826]"
      : "bg-[#ccd0d9] text-[#2b3641]";

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    if (onCheckboxToggle) {
      onCheckboxToggle(id, checked);
    }
  };

  const router = useRouter();
  return (
    <div
      className={cn(
        `flex group overflow-hidden flex-wrap w-full bg-white min-h-[63px] max-md:max-w-full hover:bg-gray-200 hover:cursor-pointer`,
        className
      )}
      onClick={() => {
        console.log("clicked");
        router.push(`/dashboard/feedback/${id}`);
      }}
    >
      <div
        className={`flex flex-col grow shrink justify-center pl-6 bg-white group-hover:transition-colors group-hover:bg-[#e1e7ff] border-b border-zinc-600 border-opacity-20 w-[66px]`}
        onClick={(e) => e.stopPropagation()}
      >
        {isPending ? (
          <Skeleton className="h-[50px] w-full" />
        ) : (
          <div className="flex overflow-hidden items-center pl-px w-full min-h-[48px]">
            <Checkbox
              checked={isChecked}
              onChange={handleCheckboxChange}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
        )}
      </div>
      <div
        className={`flex flex-col grow shrink justify-center pl-2.5 group-hover:transition-colors group-hover:bg-[#e1e7ff] text-sm font-bold bg-white border-b border-zinc-600 border-opacity-20 text-neutral-800 w-[103px]`}
      >
        {isPending ? (
          <Skeleton className="h-[50px] w-full" />
        ) : (
          <div className="overflow-hidden self-stretch px-3 py-4 w-full min-h-[48px] font-Averta-Bold text-[15px]">
            {customerName}
          </div>
        )}
      </div>
      <div
        className={`flex flex-col grow shrink justify-center group-hover:transition-colors group-hover:bg-[#e1e7ff] pl-6 text-xs font-bold text-center whitespace-nowrap bg-white border-b border-zinc-600 border-opacity-20 w-[125px]`}
      >
        <div className="flex overflow-hidden flex-1 items-center size-full">
          <div className="flex flex-col self-stretch my-auto w-[93px]">
            {isPending ? (
              <Skeleton className="h-[50px] w-full" />
            ) : (
              <div
                className={`flex relative gap-4 justify-between items-start px-4 py-1.5 min-h-[27px] ${sentimentColor} rounded-md`}
              >
                <div className="z-0 flex-1 shrink my-auto basis-0 font-Averta-Bold text-[13px]">
                  {sentiment}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={`flex flex-col grow shrink justify-center group-hover:transition-colors group-hover:bg-[#e1e7ff] pl-2.5 text-sm bg-white border-b border-zinc-600 border-opacity-20 min-w-[240px] text-neutral-800 w-[566px] max-md:max-w-full`}
      >
        {isPending ? (
          <Skeleton className="h-[50px] w-full" />
        ) : (
          <div className="overflow-hidden self-stretch px-3 py-4 w-full min-h-[48px] max-md:max-w-full font-Averta-Regular text-[15px]">
            {title}
          </div>
        )}
      </div>
      <div
        className={`flex flex-col grow shrink justify-center group-hover:transition-colors group-hover:bg-[#e1e7ff] pl-2.5 text-sm bg-white border-b border-zinc-600 border-opacity-20 text-neutral-800 w-[136px]`}
      >
        {isPending ? (
          <Skeleton className="h-[50px] w-full" />
        ) : (
          <div className="overflow-hidden self-stretch px-3 py-4 w-full min-h-[48px] font-Averta-Regular text-[14px]">
            {formatDateTime(createdAt)}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackRow;
