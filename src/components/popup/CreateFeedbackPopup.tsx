import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface CreateFeedbackPopupProps {
  toggle: () => void;
  booking: Booking;
  closeParentPopup: () => void;
}
import { useState } from "react";
import { toast } from "react-toastify";
import { CreateFeedbackDto } from "@/schemas/createFeedbackSchema";
import { useFeedback } from "@/hooks/useFeedback";
import { ClipLoader } from "react-spinners";
import { set } from "date-fns";

const CreateFeedbackPopup: React.FC<CreateFeedbackPopupProps> = ({
  toggle,
  booking,
  closeParentPopup,
}) => {
  const { createFeedback, queryClient } = useFeedback();

  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [creating, setCreating] = useState(false);

  const handleRating = (star: number) => {
    setRating(star);
  };

  const formatSchedule = (startTime: string, endTime: string): JSX.Element => {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    const timeFormatter = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const start = timeFormatter.format(startDate);
    const end = timeFormatter.format(endDate);

    const day = startDate.getDate().toString().padStart(2, "0");
    const month = (startDate.getMonth() + 1).toString().padStart(2, "0");
    const year = startDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return (
      <div className="flex h-full flex-col divide-y-2">
        <p className="font-Averta-Semibold text-sm leading-[19px] tracking-tight text-[#1d2c4c] opacity-50">
          <span className="text-[#677482]">{start}</span> -{" "}
          <span className="text-[#677482]">{end}</span>
        </p>
        <p className="text-center font-Averta-Semibold text-sm leading-[19px] tracking-tight text-[#1d2c4c] opacity-50">
          {formattedDate}
        </p>
      </div>
    );
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please provide a rating.");
      return;
    }
    if (title === "") {
      toast.error("Please provide a title.");
      return;
    }

    const feedbackData: CreateFeedbackDto = {
      title,
      rating,
      description,
      bookingId: booking.id,
    };

    setCreating(true);
    try {
      await createFeedback.mutateAsync(feedbackData);
      toast.success("Feedback submitted successfully!");

      toggle();
      closeParentPopup();
      queryClient.invalidateQueries({ queryKey: ["currentBooking"] });
      queryClient.invalidateQueries({ queryKey: ["feedbacks/customer"] });

      setTitle("");
      setRating(0);
      setDescription("");
    } catch (error) {
      toast.error("Failed to submit feedback");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="flex h-fit max-h-[98vh] w-[50%] flex-col gap-[20px] overflow-y-auto rounded-lg bg-white px-[50px] py-[30px] shadow-lg scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-[10%] w-full">
          <button
            onClick={toggle}
            className="ml-auto rounded-full p-2 transition duration-200 ease-in-out hover:bg-gray-200 hover:shadow-md"
          >
            <Image
              src="/images/ProgressBar/Group.svg"
              alt="exitButton"
              width={20}
              height={20}
            />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="self-start font-Averta-Bold text-[32px] leading-[62px] text-[#1a78f2]">
            - Rate our Services
          </p>
          <p className="font-Averta-Bold text-[32px] leading-[62px] text-[#170f49]">
            Fill the form to submit your feedback
          </p>
        </div>
        <div className="mx-auto flex w-[90%] flex-col items-center justify-center">
          <div className="flex h-fit w-full flex-col gap-[11px] px-[16px] py-[13px]">
            <p className="font-Averta-Semibold text-sm uppercase leading-[17px] tracking-tight text-[#9ea7af]">
              order selection
            </p>
            <div className="flex h-fit flex-row justify-between rounded-lg border-2 border-[#d3d8dd] p-[13px]">
              <div className="flex flex-row items-center justify-center gap-[10px]">
                <Image
                  src="/images/About/Google.png"
                  alt="avatar"
                  width={20}
                  height={20}
                />
                <p className="font-Averta-Semibold text-base leading-[23px] tracking-tight text-[#4f6071]">
                  {booking.helper.user.fullName}
                </p>
              </div>
              {formatSchedule(
                booking.scheduledStartTime,
                booking.scheduledEndTime,
              )}
              <div className="flex items-center justify-center rounded-md bg-[#1a78f2] bg-opacity-20 px-3 py-2">
                <p className="text-xs font-bold text-[#1a78f2]">
                  Home Cleaning
                </p>
              </div>
            </div>
          </div>
          <div className="flex h-fit w-full flex-col gap-[11px] p-[16px]">
            <p className="font-Averta-Semibold text-sm uppercase leading-[17px] tracking-tight text-[#9ea7af]">
              title
            </p>
            <input
              className="rounded-lg border-[2px] border-[#d3d8dd] p-[15px] font-Averta-Semibold text-base leading-[23px] tracking-tight text-[#4f6071]"
              placeholder="Type your feedback title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex h-fit w-full flex-col gap-[11px] p-[16px]">
            <p className="font-Averta-Semibold text-sm uppercase leading-[17px] tracking-tight text-[#9ea7af]">
              your service rating
            </p>
            <div className="flex h-fit flex-row py-[13px]">
              {[1, 2, 3, 4, 5].map((star) => (
                <Image
                  key={star}
                  src={
                    rating >= star
                      ? "/images/QuickPopUp/StarRating.svg"
                      : "/images/QuickPopUp/UnRating.svg"
                  }
                  alt="star"
                  width={35}
                  height={35}
                  onClick={() => handleRating(star)}
                />
              ))}
            </div>
          </div>
          <div className="flex h-fit w-full flex-col gap-[11px] p-[16px]">
            <p className="font-Averta-Semibold text-sm uppercase leading-[17px] tracking-tight text-[#9ea7af]">
              Feedback content (Optional)
            </p>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Type your feedback content"
              className="min-h-[130px] resize-none rounded-lg border-2 border-[#d3d8dd] px-[10px] py-[16px] font-Averta-Semibold text-base leading-[23px] tracking-tight text-[#4f6071]"
            />
          </div>
          <Button
            onClick={handleSubmit}
            className="my-3 h-[55px] w-[30%] bg-[#1A78F2] font-Averta-Semibold text-lg text-white"
          >
            {creating ? (
              <ClipLoader color="#ffffff" loading={creating} size={30} />
            ) : (
              "Confirm"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateFeedbackPopup;
