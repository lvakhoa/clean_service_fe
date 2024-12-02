import React from "react";
import Star from "../employee/Star";
import { BookingStatus } from "@/configs/enum";
import JobHistoryPopup from "../popup/JobHistoryPopup";

type JobHistoryRowProps = {
  job: Booking;
};

const JobHistoryRow: React.FC<JobHistoryRowProps> = ({ job }) => {
  const formatTime = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHour = hours % 12 || 12; // Converts 0 to 12 for 12-hour clock
    return minutes === 0
      ? `${formattedHour} ${ampm}`
      : `${formattedHour}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  const [toggle, setToggle] = React.useState(false);
  const handleToggle = () => setToggle(!toggle);

  const startTimeString: string = new Date(
    job.scheduledStartTime,
  ).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endTimeString: string = new Date(
    job.scheduledEndTime,
  ).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const dateString: string = new Date(
    job.scheduledStartTime,
  ).toLocaleDateString("en-US");

  const statusColor =
    job.status === BookingStatus.Pending
      ? "bg-[#FFD154] text-[#FF9500]"
      : job.status === BookingStatus.InProgress
        ? "bg-[#1A78F2] text-[#1A78F2]"
        : job.status === BookingStatus.Cancelled
          ? "bg-[#EF3826] text-[#EF3826]"
          : job.status === BookingStatus.Completed
            ? "bg-[#00B69B] text-[#00B69B]"
            : job.status === BookingStatus.Confirmed
              ? "bg-[#6a1b9a] text-[#6a1b9a]" // Màu sắc cho trạng thái Confirmed
              : "";

  const percentage = (job.helperRating ?? 0) * 20;
  const filledStars = Math.floor(percentage / 20);

  const renderRating = () => {
    const remainingPercentage = (percentage % 20) / 20;
    const starPercentages = Array.from({ length: 5 }, (_, index) => {
      if (index < filledStars) {
        return 100;
      } else if (index === filledStars) {
        return remainingPercentage * 100;
      } else {
        return 0;
      }
    });
    return (
      <div className="flex items-center">
        {starPercentages.map((percent, index) => (
          <Star key={index} percentage={percent} />
        ))}
      </div>
    );
  };
  return (
    <div className="flex h-auto w-full cursor-pointer flex-wrap items-start gap-3 border-b border-gray-200 bg-white p-2.5 hover:bg-[#f4f7ff] md:items-center">
      <div className="mb-2 flex w-full items-center justify-start md:mb-0 md:w-[200px] md:py-6">
        <div className="text-sm font-semibold text-[#202224]">
          <span className="font-bold md:hidden">CUSTOMER: </span>
          {job.customer.fullName}
        </div>
      </div>
      <div className="mb-2 flex w-full items-center justify-start md:mb-0 md:w-[230px] md:py-6">
        <div className="text-sm font-semibold text-[#202224]">
          <span className="font-bold md:hidden">ADDRESS: </span>
          {job.location}
        </div>
      </div>
      <div className="mb-2 flex w-full items-center justify-start md:mb-0 md:w-[190px] md:pl-0">
        <div className="text-xs font-semibold text-[#1D2C4C80]">
          <span className="font-bold text-[#202224] md:hidden">TIME:</span>
          <div className="flex flex-col md:items-center">
            <span className="text-[#677582]">
              {startTimeString}{" "}
              <span className="mx-1 text-[#1D2C4C80]">to</span> {endTimeString}
            </span>
            <span className="text-[#1D2C4C80] md:ml-2">{dateString}</span>
          </div>
        </div>
      </div>
      <div className="mb-2 mr-10 flex w-full items-center justify-center md:mb-0 md:w-[100px] md:pl-0">
        <div className="text-center text-xs font-semibold text-[#1D2C4C80]">
          <span className="font-bold text-[#202224] md:hidden">RATING:</span>
          {renderRating()}
          <div className="mt-1">
            {job.helperRating !== null
              ? `${job.helperRating} out of 5 stars`
              : "N/A"}
          </div>
        </div>
      </div>
      <div className="mb-2 flex w-full items-center justify-start md:mb-0 md:w-[100px] md:py-6">
        <div className="text-sm text-[#202224cc]">
          <span className="font-bold md:hidden">PRICE: </span>
          {`$${job.totalPrice}`}
        </div>
      </div>
      <div className="mb-2 flex w-full items-center justify-start md:mb-0 md:w-[140px] md:py-6">
        <div className="text-sm text-[#202224cc]">
          <span className="font-bold md:hidden">STATUS: </span>
          <div
            className={`relative flex min-h-[27px] items-start justify-between gap-4 px-4 py-1.5 ${statusColor} rounded-md bg-opacity-20`}
          >
            <div className="z-0 my-auto flex-1 shrink basis-0 font-Averta-Bold text-[13px]">
              {job.status}
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-1 items-center md:py-6">
        <button
          onClick={handleToggle}
          className="ml-auto rounded-[4.5px] bg-[#6896d1] bg-opacity-20 px-4 py-1.5 text-xs font-semibold text-[#12153a] hover:bg-opacity-50 md:w-[100px]"
        >
          More Info
        </button>
      </div>
      {toggle && <JobHistoryPopup toggle={handleToggle} booking={job} />}
    </div>
  );
};
export default JobHistoryRow;
