"use client";

import React, { useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { useParams, useRouter } from "next/navigation";
import { LuArrowLeft } from "react-icons/lu";
import Image from "next/image";
import { useFeedback } from "@/hooks/useFeedback";
import { useState } from "react";
import { format, formatDistance, isToday, isYesterday } from "date-fns";
import { set } from "zod";
import { formatDateTime } from "@/helpers/formatDateTime";
import { Skeleton } from "@/components/skeleton/skeleton";
import { toast } from "react-toastify";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ClipLoader } from "react-spinners";

const FeedbackDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { useGetFeedbackById, useDeleteFeedback } = useFeedback();

  const { data, error, isPending } = useGetFeedbackById(id);
  const { queryClient } = useFeedback();
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const mutation = useDeleteFeedback();

  const [sentiment, setSentiment] = useState("Neutral");
  const [sentimentColor, setSentimentColor] = useState(
    "bg-[#ccd0d9] text-[#2b3641]",
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
    if (data && data.data) {
      setFeedbackData(data.data);
    } else {
      console.log(error);
    }

    if (
      data != null &&
      data.data != undefined &&
      data.data.helperRating != undefined
    ) {
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

  const handleDeleteFeedback = async () => {
    try {
      setDeleting(true);
      await mutation.mutateAsync(id);
      toast.success("Delete feedback successfully!");
      router.back();
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
      queryClient.invalidateQueries({ queryKey: ["feedbacks/customer"] });
    } catch (error) {
      toast.error("Failed to delete some feedback");
      console.error(error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="mt-3.5 flex w-full flex-col justify-center rounded bg-white max-md:max-w-full max-md:px-5">
      <div className="flex w-full flex-col rounded pb-6 max-md:max-w-full">
        {/* Begin Title */}
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center justify-start">
            <button
              onClick={() => history.back()}
              className="h-full border-r-[1px] p-6 hover:bg-slate-200"
            >
              <LuArrowLeft className="h-[19px] text-xl font-bold text-neutral-300" />
            </button>
            {isPending ? (
              <Skeleton className="h-[50px] w-[100px]" />
            ) : (
              <p className="ml-5 min-h-[48px] w-full self-stretch overflow-hidden px-3 py-5 font-Averta-Bold text-lg">
                {feedbackData.title}
              </p>
            )}
            <div
              className={`flex w-[125px] shrink grow flex-col justify-center whitespace-nowrap pl-6 text-center text-xs font-bold`}
            >
              <div className="flex size-full flex-1 items-center overflow-hidden">
                <div className="my-auto flex w-[93px] flex-col self-stretch">
                  {isPending ? (
                    <Skeleton className="h-[50px] w-[100px]" />
                  ) : (
                    <div
                      className={`relative flex min-h-[27px] items-start justify-between gap-4 px-4 py-1.5 ${sentimentColor} rounded-md`}
                    >
                      <div className="z-0 my-auto flex-1 shrink basis-0 font-Averta-Bold text-[13px]">
                        {sentiment}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* <button
            onClick={handleDeleteFeedback}
            className="h-full p-6 hover:bg-slate-200"
          >
            <FaRegTrashAlt className="h-[19px]" />
          </button> */}
          <AlertDialog>
            <AlertDialogTrigger disabled={deleting}>
              {deleting ? (
                <ClipLoader color="#ffffff" loading={deleting} size={30} />
              ) : (
                <div className="h-full p-6 hover:bg-slate-200">
                  <FaRegTrashAlt className="h-[19px]" />
                </div>
              )}
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  feedback.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteFeedback}
                  className="bg-[#e01a1a] hover:bg-[#e01a1a] hover:bg-opacity-70"
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        {/* End Title */}

        {/* Begin Sender info */}
        <div className="flex flex-row items-center justify-between px-5 py-3">
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
            <div className="mx-4 flex flex-row items-center self-stretch">
              {isPending ? (
                <Skeleton className="h-[50px] w-[100px]" />
              ) : (
                <>
                  <p className="mr-1 font-Averta-Semibold text-lg font-bold">
                    {feedbackData.customerName}
                  </p>
                  <p className="mt-0.5 font-Averta-Regular text-xs font-semibold text-neutral-600">
                    {"<customer>"}
                  </p>
                </>
              )}
            </div>
          </div>
          {isPending ? (
            <Skeleton className="h-[50px] w-[100px]" />
          ) : (
            <p className="py-4 font-Averta-Regular text-sm text-gray-400">
              {formatDateTime(feedbackData.createdAt)}
            </p>
          )}
        </div>
        {/* End Sender info */}

        {/* Begin Content */}
        <div className="flex h-fit w-full flex-col px-16 py-8">
          {isPending ? (
            <Skeleton className="mb-4 h-[50px] w-[100px]" />
          ) : (
            <p className="ml-5 min-h-[48px] w-full self-stretch overflow-hidden px-3 py-5 font-Averta-Bold text-2xl">
              {feedbackData.title}
            </p>
          )}
          {isPending ? (
            <Skeleton className="h-[50px] w-full" />
          ) : (
            <p className="ml-5 min-h-[48px] w-full self-stretch overflow-hidden px-3 py-5 font-Averta-Regular">
              {feedbackData.description}
            </p>
          )}
        </div>
        {/* End  Content*/}

        {/* Logo */}
        <div className="flex h-[100px] w-full flex-row items-center justify-center gap-8">
          {logo.map((items) => (
            <div key={items.logo} className="flex items-center justify-center">
              <div className="relative h-[25px] w-full md:h-[30px] lg:h-[40px]">
                <Image
                  src={items.logo}
                  alt="ClientLogo"
                  width={50}
                  height={50}
                  style={{ height: "40px", width: "auto" }}
                  className="object-contain grayscale filter"
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
