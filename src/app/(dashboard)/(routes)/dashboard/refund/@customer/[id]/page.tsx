"use client";

import React, { useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { useParams } from "next/navigation";
import { LuArrowLeft } from "react-icons/lu";
import Image from "next/image";
import { useState } from "react";
import { formatDateTime } from "@/helpers/formatDateTime";
import { useRefund } from "@/hooks/useRefund";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/skeleton/skeleton";
import { toast } from "react-toastify";
import getFirstNWords from "@/helpers/getFirstNWords";
import { Label } from "@/components/ui/label";

const RefundDetail = () => {
  const { id } = useParams<{ id: string }>();

  const {
    useGetRefundById,
    deleteRefundMutation,
    queryClient,
    updateRefundMutation,
  } = useRefund();

  const { data, error, isPending } = useGetRefundById(id);

  const mutation = deleteRefundMutation;

  const [refundData, setRefundData] = useState<Refund>({
    id: "1",
    helperId: "",
    helperName: "",
    customerId: "",
    customerName: "",
    reason: "",
    status: "",
    createdAt: "",
    resolvedAt: "",
  });

  useEffect(() => {
    if (data && data.data) {
      setRefundData(data.data);
    } else {
      console.log(error);
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
            <button
              className="h-full p-6 hover:bg-slate-200 border-r-[1px]"
              onClick={() => window.history.back()}
            >
              <LuArrowLeft className="h-[19px] text-neutral-300 text-xl font-bold" />
            </button>
            {isPending ? (
              <Skeleton className="h-[50px] w-[100px]" />
            ) : (
              <p className="overflow-hidden self-stretch px-3 py-5 w-full ml-5 min-h-[48px] font-Averta-Bold text-lg">
                {getFirstNWords(refundData.reason, 5)}
              </p>
            )}
          </div>

          <div className="flex justify-center items-center gap-3">
            {isPending ? (
              <Skeleton className="h-[50px] w-[100px]" />
            ) : (
              <div className="flex gap-2">
                <Label
                  className={`
                    ${
                      refundData.status === "Pending"
                        ? "bg-[#FFD154]/20 text-[#FF9500]"
                        : "text-[#12153A] bg-[#6896D1]/20 "
                    }`}
                >
                  {refundData.status}
                </Label>
              </div>
            )}

            {isPending ? (
              <Skeleton className="h-[50px] w-[100px]" />
            ) : (
              <button
                onClick={() => mutation.mutate(id)}
                className="h-full p-6 hover:bg-slate-200"
              >
                <FaRegTrashAlt className="h-[19px]" />
              </button>
            )}
          </div>
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
            <div className="flex flex-row self-stretch items-center mx-4 gap-2">
              {isPending ? (
                <Skeleton className="h-[50px] w-[100px]" />
              ) : (
                <>
                  <p className=" font-bold font-Averta-Semibold text-lg mr-1">
                    {refundData.customerName}
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
              {formatDateTime(refundData.createdAt)}
            </p>
          )}
        </div>
        {/* End Sender info */}

        {/* Begin Content */}
        <div className="flex flex-col w-full h-fit px-16 pb-8">
          {isPending ? (
            <Skeleton className="h-[50px] w-full" />
          ) : (
            <p className="overflow-hidden self-stretch px-3 py-5 w-full ml-5 min-h-[48px] font-Averta-Regular">
              {refundData.reason}
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

export default RefundDetail;
