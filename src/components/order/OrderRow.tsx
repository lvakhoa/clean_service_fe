import React from "react";
import Star from "../employee/Star";
import { BookingStatus } from "@/configs/enum";
import OrderInfoPopup from "../popup/OrderInfoPopup";

const OrderRow: React.FC<OrderRowProps> = ({ booking }) => {
  const startTimeString: string = new Date(
    booking.scheduledStartTime
  ).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endTimeString: string = new Date(
    booking.scheduledEndTime
  ).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const date = new Date(booking.scheduledStartTime);
  const dateString: string = `${date.getDate().toString().padStart(2, "0")}/${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;

  const statusColor =
    booking.status === BookingStatus.Pending
      ? "bg-[#FFD154] text-[#FF9500]"
      : booking.status === BookingStatus.InProgress
      ? "bg-[#1A78F2] text-[#1A78F2]"
      : booking.status === BookingStatus.Cancelled
      ? "bg-[#EF3826] text-[#EF3826]"
      : booking.status === BookingStatus.Completed
      ? "bg-[#00B69B] text-[#00B69B]"
      : booking.status === BookingStatus.Confirmed
      ? "bg-[#6a1b9a] text-[#6a1b9a]"
      : "";
  const renderRating = () => {
    const filledStars = Math.floor(booking.helperRating ?? 0);
    const remainingPercentage = ((booking.helperRating ?? 0) % 1) * 100;

    const starPercentages = Array.from({ length: 5 }, (_, index) => {
      if (index < filledStars) {
        return 100;
      } else if (index === filledStars) {
        return remainingPercentage;
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

  const [toggleOrderInfo, setToggleOrderInfo] = React.useState(false);
  const handleToggle = () => setToggleOrderInfo(!toggleOrderInfo);

  return (
    <div className="flex flex-wrap gap-3 w-full border-b border-gray-200 bg-white hover:bg-[#f4f7ff] h-auto items-start md:items-center p-2.5 cursor-pointer">
      <div className="w-full md:w-[150px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224] font-semibold">
          <span className="md:hidden font-bold">CUSTOMER: </span>
          {booking.customer.fullName}
        </div>
      </div>

      <div className="w-full md:w-[150px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224] font-semibold">
          <span className="md:hidden font-bold">HELPER: </span>
          {booking.helper ? booking.helper.user.fullName : "N/A"}
        </div>
      </div>

      <div className="w-full md:w-[190px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224] font-semibold">
          <span className="md:hidden font-bold">ADDRESS: </span>
          {booking.location}
        </div>
      </div>

      <div className="w-full md:w-[167px] flex items-center justify-start md:pl-0 mb-2 md:mb-0">
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

      <div className="w-full md:w-[100px] flex items-center justify-center md:pl-0 mb-2 md:mb-0 mr-6">
        <div className="text-xs text-[#1D2C4C80] font-semibold text-center">
          <span className="md:hidden font-bold text-[#202224]">RATING:</span>
          {renderRating()}
          <div className="mt-1">
            {booking.helperRating !== null
              ? `${booking.helperRating} out of 5 stars`
              : "N/A"}
          </div>
        </div>
      </div>

      <div className="w-full md:w-[90px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224cc]">
          <span className="md:hidden font-bold">PRICE: </span>
          {`$${booking.totalPrice}`}
        </div>
      </div>

      <div className="w-full md:w-[140px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className=" text-sm text-[#202224cc]">
          <span className="md:hidden font-bold">STATUS: </span>
          <div
            className={`flex flex-col relative gap-4 justify-between items-start md:items-center md:justify-center px-4 py-1.5 min-h-[27px] md:min-w-28 ${statusColor} bg-opacity-20 rounded-md`}
          >
            <div className="z-0 flex-1 shrink my-auto basis-0 font-Averta-Bold text-[13px]">
              {booking.status}
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
      {toggleOrderInfo && (
        <OrderInfoPopup toggle={handleToggle} booking={booking} />
      )}
    </div>
  );
};

export default OrderRow;
