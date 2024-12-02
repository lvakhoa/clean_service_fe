import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useScheduler } from "@/hooks/useScheduler";
import { BookingStatus } from "@/configs/enum";

interface JobHistoryPopupProps {
  toggle: () => void;
  booking: Booking;
}
const JobHistoryPopup: React.FC<JobHistoryPopupProps> = ({
  toggle,
  booking,
}) => {
  const { updateBooking, queryClient } = useScheduler();

  const bookingState: string = booking.status;
  const [reason, setReason] = useState("");
  const [updating, setUpdating] = useState(false);

  const style =
    bookingState === BookingStatus.Completed ? (
      <div className="h-full w-[60%] rounded-lg bg-[#00b69b] bg-opacity-20 p-[13px]">
        <p className="flex h-full items-center justify-center text-xl font-bold text-[#00b69b]">
          {bookingState}
        </p>
      </div>
    ) : bookingState === BookingStatus.InProgress ? (
      <div className="h-full w-[60%] rounded-lg bg-[#1a78f2] bg-opacity-20 p-[13px]">
        <p className="flex h-full items-center justify-center text-xl font-bold text-[#1a78f2]">
          {"In Progress"}
        </p>
      </div>
    ) : bookingState === BookingStatus.Pending ? (
      <div className="h-full w-[60%] rounded-lg bg-[#ffd154] bg-opacity-20 p-[13px]">
        <p className="flex h-full items-center justify-center text-xl font-bold text-[#ff9400]">
          {bookingState}
        </p>
      </div>
    ) : bookingState === BookingStatus.Cancelled ? (
      <div className="h-full w-[60%] rounded-lg bg-[#e01a1a] bg-opacity-20 p-[13px]">
        <p className="flex h-full items-center justify-center text-xl font-bold text-[#e01a1a]">
          {bookingState}
        </p>
      </div>
    ) : bookingState === BookingStatus.Confirmed ? (
      <div className="h-full w-[60%] rounded-lg bg-[#6a1b9a] bg-opacity-20 p-[13px]">
        <p className="flex h-full items-center justify-center text-xl font-bold text-[#6a1b9a]">
          {bookingState}
        </p>
      </div>
    ) : (
      ""
    );

  const handleStartWorkingSession = async () => {
    setUpdating(true);
    console.log("Start working session");
    try {
      await updateBooking.mutateAsync({
        id: booking.id,
        data: { status: 2 },
      });
      toast.success("Start Session.");
      queryClient.invalidateQueries({ queryKey: ["currentCustomerBooking"] });
      toggle();
    } catch (error: any) {
      console.error("Error start session:", error);
      toast.error(
        `Failed to start session: ${error.message || "Unknown error"}`,
      );
    } finally {
      setUpdating(false);
    }
  };

  const handleEndWorkingSession = async () => {
    setUpdating(true);
    console.log("End working session");
    try {
      await updateBooking.mutateAsync({
        id: booking.id,
        data: { status: 3 },
      });
      toast.success("End Session.");
      queryClient.invalidateQueries({ queryKey: ["currentCustomerBooking"] });
      toggle();
    } catch (error: any) {
      console.error("Error ending session:", error);
      toast.error(
        `Failed to ending session: ${error.message || "Unknown error"}`,
      );
    } finally {
      setUpdating(false);
    }
  };

  const styleBtn =
    bookingState === BookingStatus.InProgress ? (
      <div className="h-[55px]">
        <Button
          className="h-[55px] w-full bg-[#1A78F2] font-Averta-Semibold text-lg text-white hover:bg-[#1A78F2]/70"
          onClick={handleEndWorkingSession}
        >
          End Working Session
        </Button>
      </div>
    ) : bookingState === BookingStatus.Confirmed ? (
      <div className="h-[55px]">
        <Button
          className="h-[55px] w-full bg-[#1A78F2] font-Averta-Semibold text-lg text-white hover:bg-[#1A78F2]/70"
          onClick={handleStartWorkingSession}
        >
          Start Working Session
        </Button>
      </div>
    ) : (
      <></>
    );

  function formatSchedule(startTime: string, endTime: string): string {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
    };
    const start = startDate.toLocaleTimeString("en-GB", options);
    const end = endDate.toLocaleTimeString("en-GB", options);

    const day = startDate.getDate().toString().padStart(2, "0");
    const month = (startDate.getMonth() + 1).toString().padStart(2, "0"); // tháng nó tính từ 0 nên +1
    const year = startDate.getFullYear();

    return `From ${start} to ${end} | ${day}/${month}/${year}`;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex h-full w-full cursor-default items-center justify-center bg-black bg-opacity-50"
      onClick={toggle}
    >
      <div
        className="flex h-fit max-h-[98vh] w-[60%] flex-col overflow-y-auto rounded-lg bg-white px-[50px] py-[40px] shadow-lg scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300"
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
        <div className="mt-5 flex h-[90%] w-full flex-row gap-10">
          <div className="flex h-full w-[50%] flex-col content-between gap-[32px]">
            <div className="flex h-full w-full flex-col gap-[8px]">
              <p className="font-Averta-Semibold text-lg uppercase leading-snug tracking-tight text-[#12153a]">
                helper selection
              </p>
              <div className="flex flex-col gap-[11px] rounded-lg p-[16px]">
                <p className="font-Averta-Semibold text-sm uppercase leading-[17px] tracking-tight text-[#9ea7af]">
                  helper
                </p>
                <div className="flex flex-row justify-between rounded-lg border-2 border-[#d3d8dd] bg-[#F4F7F9] p-[13px]">
                  <div className="flex h-fit flex-row gap-[10px]">
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
                  <div className="flex h-fit flex-row gap-[2px]">
                    <p className="font-Averta-Semibold text-xl leading-[25px] text-[#88929c]">
                      {booking.helper.averageRating}
                    </p>
                    <Image
                      src="/images/QuickPopUp/StarRating.svg"
                      alt="avatar"
                      width={18}
                      height={18}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex h-full w-full flex-col gap-[8px]">
              <p className="font-Averta-Semibold text-lg uppercase leading-snug tracking-tight text-[#12153a]">
                service details
              </p>
              <div className="flex h-full flex-col gap-5 rounded-lg px-[16px] pb-7 pt-[16px]">
                <div className="flex h-fit w-full flex-col gap-[11px]">
                  <p className="font-Averta-Semibold text-sm uppercase leading-[17px] tracking-tight text-[#9ea7af]">
                    service type
                  </p>
                  <div className="flex h-fit flex-row justify-between rounded-lg border-2 border-[#d3d8dd] bg-[#F4F7F9] p-[13px]">
                    <p className="font-Averta-Semibold text-base leading-[23px] tracking-tight text-[#4f6071]">
                      {booking.serviceType.name}
                    </p>
                  </div>
                </div>
                <div className="flex h-fit w-full flex-col gap-[11px]">
                  <p className="font-Averta-Semibold text-sm uppercase leading-[17px] tracking-tight text-[#9ea7af]">
                    Description
                  </p>
                  <div className="flex h-[90px] w-full flex-col gap-[11px] rounded-lg border-2 border-[#d3d8dd] bg-[#F4F7F9] p-[13px]">
                    <p className="font-Averta-Semibold text-base leading-[23px] tracking-tight text-[#4f6071]">
                      {booking.serviceType.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-full w-[50%] flex-col gap-[8px]">
            <p className="font-Averta-Semibold text-lg uppercase leading-snug tracking-tight text-[#12153a]">
              customer-related info
            </p>
            <div className="flex h-full w-full flex-col gap-6 rounded-lg p-[16px]">
              <div className="flex h-fit w-full flex-col gap-[11px]">
                <p className="font-Averta-Semibold text-sm uppercase leading-[17px] tracking-tight text-[#9ea7af]">
                  customer
                </p>
                <div className="flex h-fit w-full flex-row gap-[10px] rounded-lg border-2 border-[#d3d8dd] bg-[#F4F7F9] p-[13px]">
                  <Image
                    src="/images/About/Google.png"
                    alt="avatar"
                    width={20}
                    height={20}
                  />
                  <p className="font-Averta-Semibold text-base leading-[23px] tracking-tight text-[#4f6071]">
                    {booking.customer.fullName}
                  </p>
                </div>
              </div>
              <div className="flex h-fit w-full flex-col gap-[11px]">
                <p className="font-Averta-Semibold text-sm uppercase leading-[17px] tracking-tight text-[#9ea7af]">
                  address
                </p>
                <div className="flex h-fit flex-row justify-between rounded-lg border-2 border-[#d3d8dd] bg-[#F4F7F9] p-[13px]">
                  <p className="min-h-[23px] font-Averta-Semibold text-base leading-[23px] tracking-tight text-[#4f6071]">
                    {booking.customer.address}
                  </p>
                </div>
              </div>
              <div className="flex h-fit w-full flex-col gap-[11px]">
                <p className="font-Averta-Semibold text-sm uppercase leading-[17px] tracking-tight text-[#9ea7af]">
                  time
                </p>
                <div className="flex h-fit flex-row justify-between rounded-lg border-2 border-[#d3d8dd] bg-[#F4F7F9] p-[13px]">
                  <p className="font-Averta-Semibold text-base leading-[23px] tracking-tight text-[#4f6071]">
                    {formatSchedule(
                      booking.scheduledStartTime,
                      booking.scheduledEndTime,
                    )}
                  </p>
                </div>
              </div>
              <div className="flex h-full w-full flex-col gap-[11px]">
                <p className="font-Averta-Semibold text-sm uppercase leading-[17px] tracking-tight text-[#9ea7af]">
                  price
                </p>
                <div className="flex h-full w-full flex-row gap-[16px]">
                  <div className="h-full w-[40%] justify-between rounded-lg border-2 border-[#d3d8dd] bg-[#F4F7F9] p-[13px]">
                    <p className="font-Averta-Semibold text-base leading-[23px] tracking-tight text-[#4f6071]">
                      {booking.totalPrice}/vnd
                    </p>
                  </div>
                  {style}
                </div>
              </div>
              {styleBtn}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobHistoryPopup;
