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
      <div className="flex flex-col divide-y-2 h-full">
        <p className="text-[#1d2c4c] opacity-50 text-sm leading-[19px] tracking-tight font-Averta-Semibold">
          <span className="text-[#677482]">{start}</span> -{" "}
          <span className="text-[#677482]">{end}</span>
        </p>
        <p className="text-[#1d2c4c] opacity-50 text-sm leading-[19px] tracking-tight font-Averta-Semibold text-center">
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
      className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="flex flex-col bg-white rounded-lg shadow-lg px-[50px] py-[30px] w-[50%] h-fit gap-[20px] max-h-[98vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full h-[10%]">
          <button
            onClick={toggle}
            className="ml-auto p-2 rounded-full hover:bg-gray-200 hover:shadow-md transition duration-200 ease-in-out"
          >
            <Image
              src="/images/ProgressBar/Group.svg"
              alt="exitButton"
              width={20}
              height={20}
            />
          </button>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-[#1a78f2] text-[32px] font-Averta-Bold leading-[62px] self-start">
            - Rate our Services
          </p>
          <p className="text-[#170f49] text-[32px] font-Averta-Bold leading-[62px]">
            Fill the form to submit your feedback
          </p>
        </div>
        <div className="flex flex-col w-[90%] justify-center items-center mx-auto">
          <div className="flex flex-col w-full h-fit gap-[11px] px-[16px] py-[13px]">
            <p className="text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight">
              order selection
            </p>
            <div className="flex flex-row h-fit justify-between p-[13px] border-[#d3d8dd] border-2 rounded-lg">
              <div className="flex flex-row gap-[10px] items-center justify-center">
                <Image
                  src="/images/About/Google.png"
                  alt="avatar"
                  width={20}
                  height={20}
                />
                <p className="text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight">
                  {booking.helper.user.fullName}
                </p>
              </div>
              {formatSchedule(
                booking.scheduledStartTime,
                booking.scheduledEndTime
              )}
              <div className="bg-[#1a78f2] bg-opacity-20 py-2 px-3 rounded-md flex justify-center items-center">
                <p className="text-[#1a78f2] text-xs font-bold">
                  Home Cleaning
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full h-fit gap-[11px] p-[16px]">
            <p className="text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight">
              title
            </p>
            <input
              className="text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight border-[2px] p-[15px] rounded-lg border-[#d3d8dd]"
              placeholder="Type your feedback title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full h-fit gap-[11px] p-[16px]">
            <p className="text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight">
              your service rating
            </p>
            <div className="flex flex-row h-fit py-[13px]">
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
          <div className="flex flex-col w-full h-fit gap-[11px] p-[16px]">
            <p className="text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight">
              Feedback content (Optional)
            </p>
            <textarea
              placeholder="Type your feedback content"
              className="text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight border-[#d3d8dd] border-2 rounded-lg min-h-[130px] px-[10px] py-[16px] resize-none"
            />
          </div>
          <Button
            onClick={handleSubmit}
            className="w-[30%] h-[55px] bg-[#1A78F2] text-lg text-white font-Averta-Semibold my-3"
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
