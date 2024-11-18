"use client";

import React, { useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { useParams } from "next/navigation";
import { LuArrowLeft } from "react-icons/lu";
import Image from "next/image";
import { useFeedback } from "@/hooks/useFeedback";
import { useState } from "react";
import { format, formatDistance, isToday, isYesterday } from "date-fns";
import { set } from "zod";
import { formatDateTime } from "@/helpers/formatDateTime";
import { Skeleton } from "@/components/skeleton/skeleton";

const FeedbackDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { useGetFeedbackById, useDeleteFeedback } = useFeedback();

  const { data, error, isPending } = useGetFeedbackById(id);

  const mutation = useDeleteFeedback();

  const [sentiment, setSentiment] = useState("Neutral");
  const [sentimentColor, setSentimentColor] = useState(
    "bg-[#ccd0d9] text-[#2b3641]"
  );
  const [feedbackData, setFeedbackData] = useState<Feedback>({
    id: "",
    bookingId: "",
    helperRating: 0,
    title: "",
    description: "",
    createdAt: "",
  });

  useEffect(() => {
    if (data) {
      setFeedbackData(data.data);
    } else {
      console.log(error);
    }

    if (data != null && data.data.helperRating != undefined) {
      if (data.data.helperRating > 3) {
        setSentiment("Positive");
        setSentimentColor("bg-[#ccf0eb] text-[#00b69b]");
      } else if (data.data.helperRating < 3) {
        setSentiment("Negative");
        setSentimentColor("bg-[#fcd7d4] text-[#ef3826]");
      } else {
        setSentiment("Neutral");
        setSentimentColor("bg-[#ccd0d9] text-[#2b3641]");
      }
    }
  }, [data]);

  const logo = [
    {
      logo: "/images/Dashboard/Feedback/Clean.svg",
    },
    {
      logo: "/images/About/UIT.svg",
    },
  ];

  return (
    <div className="flex flex-col justify-center mt-3.5 w-full bg-white rounded max-md:px-5 max-md:max-w-full">
      <div className="flex flex-col w-full rounded max-md:max-w-full pb-6">
        {/* Begin Title */}
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center justify-start">
            <button className="h-full p-6 hover:bg-slate-200 border-r-[1px] ">
              <LuArrowLeft className="h-[19px] text-neutral-300 text-xl font-bold" />
            </button>
            {isPending ? (
              <Skeleton className="h-[50px] w-[100px]" />
            ) : (
              <p className="overflow-hidden self-stretch px-3 py-5 w-full ml-5 min-h-[48px] font-Averta-Bold text-lg">
                {feedbackData.title}
              </p>
            )}
            <div
              className={`flex flex-col grow shrink justify-center pl-6 text-xs font-bold text-center whitespace-nowrap w-[125px]`}
            >
              <div className="flex overflow-hidden flex-1 items-center size-full">
                <div className="flex flex-col self-stretch my-auto w-[93px]">
                  {isPending ? (
                    <Skeleton className="h-[50px] w-[100px]" />
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
          </div>
          <button
            onClick={() => mutation.mutate(id)}
            className="h-full p-6 hover:bg-slate-200"
          >
            <FaRegTrashAlt className="h-[19px]" />
          </button>
        </div>
        {/* End Title */}

        {/* Begin Sender info */}
        <div className="flex flex-row items-center justify-between py-3 px-5">
          <div className="flex flex-row items-center gap-2">
            {isPending ? (
              <Skeleton className="h-[50px] w-[100px]" />
            ) : (
              <Image
                src="/images/Dashboard/Header/Avatar.png"
                alt="Avatar"
                width={44}
                height={44}
                sizes="100vw"
                style={{ width: "60px", height: "auto" }}
              />
            )}
            <div className="flex flex-row self-stretch items-center mx-4">
              {isPending ? (
                <Skeleton className="h-[50px] w-[100px]" />
              ) : (
                <>
                  <p className=" font-bold font-Averta-Semibold text-lg mr-1">
                    {feedbackData.customerName}
                  </p>
                  <p className="text-xs font-semibold text-neutral-600 font-Averta-Regular mt-0.5">
                    {"<customer>"}
                  </p>
                </>
              )}
            </div>
          </div>
          {isPending ? (
            <Skeleton className="h-[50px] w-[100px]" />
          ) : (
            <p className=" py-4 font-Averta-Regular text-sm text-gray-400">
              {formatDateTime(feedbackData.createdAt)}
            </p>
          )}
        </div>
        {/* End Sender info */}

        {/* Begin Content */}
        <div className="flex flex-col w-full h-fit px-16 py-8">
          {isPending ? (
            <Skeleton className="h-[50px] w-[100px] mb-4" />
          ) : (
            <p className="overflow-hidden self-stretch px-3 py-5 w-full ml-5 min-h-[48px] font-Averta-Bold text-2xl">
              {feedbackData.title}
            </p>
          )}
          {isPending ? (
            <Skeleton className="h-[50px] w-full" />
          ) : (
            <p className="overflow-hidden self-stretch px-3 py-5 w-full ml-5 min-h-[48px] font-Averta-Regular">
              {feedbackData.description}
            </p>
          )}
        </div>
        {/* End  Content*/}

        {/* Logo */}
        <div className="flex flex-row items-center justify-center gap-8 w-full h-[100px]">
          {logo.map((items) => (
            <div key={items.logo} className="flex items-center justify-center">
              <div className="relative w-full h-[25px] md:h-[30px] lg:h-[40px]">
                <Image
                  src={items.logo}
                  alt="ClientLogo"
                  width={50}
                  height={50}
                  style={{ height: "40px", width: "auto" }}
                  className="object-contain filter grayscale"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackDetail;
