import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface OrderHistoryPopupProps {
  toggle: () => void;
  booking: Booking;
}
const OrderHistoryPopup: React.FC<OrderHistoryPopupProps> = ({
  toggle,
  booking,
}) => {
  const bookingState: string = "Completed";
  const [cancelService, setCancelService] = React.useState(false);

  const style =
    bookingState === "Completed" ? (
      <div className="w-[60%] h-full bg-[#00b69b] p-[13px] bg-opacity-20 rounded-lg">
        <p className="flex h-full justify-center items-center text-[#00b69b] text-xl font-bold">
          {bookingState}
        </p>
      </div>
    ) : bookingState === "InProgress" ? (
      <div className="w-[60%] h-full bg-[#1a78f2] p-[13px] bg-opacity-20 rounded-lg">
        <p className="flex h-full justify-center items-center text-[#1a78f2] text-xl font-bold">
          {bookingState}
        </p>
      </div>
    ) : bookingState === "Pending" ? (
      <div className="w-[60%] h-full bg-[#ffd154] p-[13px] bg-opacity-20 rounded-lg">
        <p className="flex h-full justify-center items-center text-[#ff9400] text-xl font-bold">
          {bookingState}
        </p>
      </div>
    ) : bookingState === "Cancelled" ? (
      <div className="w-[60%] h-full bg-[#e01a1a] p-[13px] bg-opacity-20 rounded-lg">
        <p className="flex h-full justify-center items-center text-[#e01a1a] text-xl font-bold">
          {bookingState}
        </p>
      </div>
    ) : bookingState === "Confirmed" ? (
      <div className="w-[60%] h-full bg-[#6a1b9a] p-[13px] bg-opacity-20 rounded-lg">
        <p className="flex h-full justify-center items-center text-[#6a1b9a] text-xl font-bold">
          {bookingState}
        </p>
      </div>
    ) : (
      ""
    );
  const styleBtn =
    bookingState === "Completed" ? (
      <Button
        onClick={() => console.log("Feedback button clicked")}
        className="w-full h-[55px] bg-[#1A78F2] text-lg text-white font-Averta-Semibold"
      >
        Feedback
      </Button>
    ) : bookingState === "InProgress" ? (
      <Button
        className="w-full h-[55px] bg-[#000000] text-lg text-white font-Averta-Semibold"
        disabled
      >
        Feedback
      </Button>
    ) : (bookingState === "Pending" || bookingState == "Confirmed") &&
      cancelService ? (
      <Button
        className="w-full h-[55px] bg-[#00b69b] text-lg text-white font-Averta-Semibold hover:bg-[#00b69b] hover:bg-opacity-70"
        onClick={() => setCancelService(!cancelService)}
      >
        Don't Cancel The Service
      </Button>
    ) : (bookingState === "Pending" || bookingState == "Confirmed") &&
      !cancelService ? (
      <Button
        className="w-full h-[55px] bg-[#e01a1a] text-lg text-white font-Averta-Semibold hover:bg-[#e01a1a] hover:bg-opacity-70"
        onClick={() => setCancelService(!cancelService)}
      >
        Cancel The Service
      </Button>
    ) : (
      ""
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
      className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={toggle}
    >
      <div
        className="flex flex-col bg-white rounded-lg shadow-lg px-[50px] py-[40px] w-[60%] h-fit max-h-[98vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full h-[10%]">
          <button onClick={toggle} className="ml-auto">
            <Image
              src="/images/ProgressBar/Group.svg"
              alt="exitButton"
              width={20}
              height={20}
            />
          </button>
        </div>
        <div className="flex flex-row w-full h-[90%] mt-5 gap-10">
          <div className="w-[50%] h-full flex flex-col gap-[32px] content-between">
            <div className="w-full h-full flex flex-col gap-[8px]">
              <p className="text-[#12153a] text-lg font-Averta-Semibold uppercase leading-snug tracking-tight">
                helper selection
              </p>
              <div className="flex flex-col p-[16px] gap-[11px] rounded-lg">
                <p className="text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight">
                  helper
                </p>
                <div className="flex flex-row justify-between p-[13px] border-[#d3d8dd] border-2 rounded-lg bg-[#F4F7F9]">
                  <div className="flex flex-row h-fit gap-[10px]">
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
                  <div className="flex flex-row h-fit gap-[2px]">
                    <p className="text-[#88929c] text-xl font-Averta-Semibold leading-[25px]">
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
            <div className="w-full h-full flex flex-col gap-[8px]">
              <p className="text-[#12153a] text-lg font-Averta-Semibold uppercase leading-snug tracking-tight">
                service details
              </p>
              <div className="flex flex-col h-full px-[16px] pt-[16px] rounded-lg gap-5 pb-7">
                <div className="flex flex-col w-full h-fit gap-[11px]">
                  <p className="text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight">
                    service type
                  </p>
                  <div className="flex flex-row h-fit justify-between p-[13px] border-[#d3d8dd] border-2 rounded-lg bg-[#F4F7F9]">
                    <p className="text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight">
                      {booking.serviceType.name}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col w-full h-fit gap-[11px]">
                  <p className="text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight">
                    Description
                  </p>
                  <div className="flex flex-col w-full h-[90px] gap-[11px] p-[13px] border-[#d3d8dd] border-2 rounded-lg bg-[#F4F7F9]">
                    <p className="text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight">
                      {booking.serviceType.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[50%] h-full flex flex-col gap-[8px]">
            <p className="text-[#12153a] text-lg font-Averta-Semibold uppercase leading-snug tracking-tight">
              customer-related info
            </p>
            <div className="w-full h-full flex flex-col p-[16px] rounded-lg gap-6">
              <div className="flex flex-col w-full h-fit gap-[11px]">
                <p className="text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight">
                  customer
                </p>
                <div className="flex flex-row gap-[10px] w-full h-fit p-[13px] border-[#d3d8dd] border-2 rounded-lg bg-[#F4F7F9]">
                  <Image
                    src="/images/About/Google.png"
                    alt="avatar"
                    width={20}
                    height={20}
                  />
                  <p className="text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight">
                    {booking.customer.fullName}
                  </p>
                </div>
              </div>
              <div className="flex flex-col w-full h-fit gap-[11px]">
                <p className="text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight">
                  address
                </p>
                <div className="flex flex-row h-fit justify-between p-[13px] border-[#d3d8dd] border-2 rounded-lg bg-[#F4F7F9]">
                  <p className="text-[#4f6071] text-base font-Averta-Semibold leading-[23px] min-h-[23px] tracking-tight">
                    {booking.customer.address}
                  </p>
                </div>
              </div>
              <div className="flex flex-col w-full h-fit gap-[11px]">
                <p className="text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight">
                  time
                </p>
                <div className="flex flex-row h-fit justify-between p-[13px] border-[#d3d8dd] border-2 rounded-lg bg-[#F4F7F9]">
                  <p className="text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight">
                    {formatSchedule(
                      booking.scheduledStartTime,
                      booking.scheduledEndTime
                    )}
                  </p>
                </div>
              </div>
              <div className="flex flex-col w-full h-full gap-[11px]">
                <p className="text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight">
                  price
                </p>
                <div className="flex flex-row w-full h-full gap-[16px]">
                  <div className="w-[40%] h-full justify-between p-[13px] border-[#d3d8dd] border-2 rounded-lg bg-[#F4F7F9]">
                    <p className="text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight">
                      {booking.totalPrice}/vnd
                    </p>
                  </div>
                  {style}
                </div>
              </div>
              <div className="h-[55px]">{styleBtn}</div>
            </div>
          </div>
        </div>
        {cancelService ? (
          <div className="flex flex-col gap-[10px]">
            <div className="h-fit w-full flex flex-col gap-[8px] mt-[10px]">
              <p className="text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight">
                cancellation reason
              </p>
              <textarea
                placeholder="CANCELLATION REASON"
                className="text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight border-[#d3d8dd] border-2 rounded-lg min-h-[130px] px-[10px] py-[16px] resize-none"
              />
            </div>
            <Button className="w-[50%] m-auto h-[55px] bg-[#e01a1a] text-lg text-white font-Averta-Semibold hover:bg-[#e01a1a] hover:bg-opacity-70">
              Confirm
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPopup;
