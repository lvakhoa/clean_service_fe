"use client";
import React from "react";
import Star from "../employee/Star";
import OrderHistoryPopup from "../popup/OrderHistoryPopup";
import { BookingStatus } from "@/configs/enum";

type OrderHistoryRowProps = {
  order: Booking;
};

const OrderHistoryRow: React.FC<OrderHistoryRowProps> = ({ order }) => {
  const startTimeString: string = new Date(
    order.scheduledStartTime
  ).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endTimeString: string = new Date(
    order.scheduledEndTime
  ).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateString: string = new Date(
    order.scheduledStartTime
  ).toLocaleDateString("en-US");

  const [toggle, setToggle] = React.useState(false);
  const handleToggle = () => setToggle(!toggle);

  const statusColor =
    order.status === BookingStatus.Pending
      ? "bg-[#FFD154] text-[#FF9500]"
      : order.status === BookingStatus.InProgress
      ? "bg-[#1A78F2] text-[#1A78F2]"
      : order.status === BookingStatus.Cancelled
      ? "bg-[#EF3826] text-[#EF3826]"
      : order.status === BookingStatus.Completed
      ? "bg-[#00B69B] text-[#00B69B]"
      : order.status === BookingStatus.Confirmed
      ? "bg-[#6a1b9a] text-[#6a1b9a]" // Màu sắc cho trạng thái Confirmed
      : "";

  // Phần trăm hoàn thành
  const percentage = (order.helperRating ?? 0) * 20;
  const filledStars = Math.floor(percentage / 20);

  // Hàm render ngôi sao
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
      <div className="flex items-center ">
        {starPercentages.map((percent, index) => (
          <Star key={index} percentage={percent} />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-wrap gap-3 w-full border-b border-gray-200 bg-white hover:bg-[#f4f7ff] h-auto items-start md:items-center p-2.5 cursor-pointer">
      <div className="w-full md:w-[200px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224] font-semibold">
          <span className="md:hidden font-bold">HELPER: </span>
          {order.helper.user.fullName}
        </div>
      </div>
      <div className="w-full md:w-[230px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224] font-semibold">
          <span className="md:hidden font-bold">ADDRESS: </span>
          {order.location}
        </div>
      </div>
      <div className="w-full md:w-[190px] flex items-center justify-start md:pl-0 mb-2 md:mb-0">
        <div className="text-xs text-[#1D2C4C80] font-semibold">
          <span className="md:hidden font-bold text-[#202224]">TIME:</span>
          <div className="flex flex-col  md:items-center">
            <span className="text-[#677582]">
              {startTimeString}{" "}
              <span className="text-[#1D2C4C80] mx-1">to</span> {endTimeString}
            </span>
            <span className="text-[#1D2C4C80] md:ml-2">{dateString}</span>
          </div>
        </div>
      </div>
      <div className="w-full md:w-[100px] flex items-center justify-center md:pl-0 mb-2 md:mb-0 mr-10">
        <div className="text-xs text-[#1D2C4C80] font-semibold text-center">
          <span className="md:hidden font-bold text-[#202224]">RATING:</span>
          {renderRating()}
          <div className="mt-1">
            {order.helperRating !== null
              ? `${order.helperRating} out of 5 stars`
              : "N/A"}
          </div>
        </div>
      </div>
      <div className="w-full md:w-[100px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224cc]">
          <span className="md:hidden font-bold">PRICE: </span>
          {`$${order.totalPrice}`}
        </div>
      </div>
      <div className="w-full md:w-[140px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224cc]">
          <span className="md:hidden font-bold">STATUS: </span>
          <div
            className={`flex relative gap-4 justify-between items-start px-4 py-1.5 min-h-[27px] ${statusColor} bg-opacity-20 rounded-md`}
          >
            <div className="z-0 justify-center flex flex-1 shrink my-auto basis-0 font-Averta-Bold text-[13px] min-w-20">
              {order.status}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full  flex-1 flex items-center md:py-6">
        <button
          onClick={handleToggle}
          className="md:w-[100px] ml-auto px-4 py-1.5 bg-[#6896d1] text-[#12153a] bg-opacity-20 text-xs rounded-[4.5px] font-semibold hover:bg-opacity-50"
        >
          More Info
        </button>
      </div>
      {toggle && <OrderHistoryPopup toggle={handleToggle} booking={order} />}
    </div>
  );
};

export default OrderHistoryRow;
