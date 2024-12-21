import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CreateFeedbackPopup from "./CreateFeedbackPopup";
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
import { toast } from "react-toastify";
import { useScheduler } from "@/hooks/useScheduler";
import { ClipLoader } from "react-spinners";
import { BookingStatus } from "@/configs/enum";
import CreateRefundPopup from "./CreateRefundPopup";

interface OrderHistoryPopupProps {
  toggle: () => void;
  booking: Booking;
}
const OrderHistoryPopup: React.FC<OrderHistoryPopupProps> = ({
  toggle,
  booking,
}) => {
  const { updateBooking, queryClient } = useScheduler();

  const bookingState: string = booking.status;
  const [cancelService, setCancelService] = useState(false);
  const [reason, setReason] = useState("");
  const [feedbackToggle, setFeedbackToggle] = useState(false);
  const [refundToggle, setRefundToggle] = useState(false);
  const [updating, setUpdating] = useState(false);

  const handleFeedback = () => {
    setFeedbackToggle(!feedbackToggle);
  };
  const handleRefund = () => {
    setRefundToggle(!refundToggle);
  }

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
          {bookingState}
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
  const styleBtn =
    bookingState === BookingStatus.Completed ? (
      booking.helperRating == null ? (
        <Button
          onClick={handleFeedback}
          className="h-[55px] w-full bg-[#1A78F2] font-Averta-Semibold text-lg text-white"
        >
          Feedback
        </Button>
      ) : (
        <></>
      )
    ) : bookingState === BookingStatus.InProgress ? (
      <Button
        className="h-[55px] w-full bg-[#000000] font-Averta-Semibold text-lg text-white"
        disabled
      >
        Feedback
      </Button>
    ) : (bookingState === BookingStatus.Confirmed) &&
      cancelService ? (
      <Button
        className="h-[55px] w-full bg-[#00b69b] font-Averta-Semibold text-lg text-white hover:bg-[#00b69b] hover:bg-opacity-70"
        onClick={() => setCancelService(!cancelService)}
      >
        Don't Cancel The Service
      </Button>
    ) : ( (bookingState === BookingStatus.Confirmed ) &&
      !cancelService ) ? (
      <Button
        className="h-[55px] w-full bg-[#e01a1a] font-Averta-Semibold text-lg text-white hover:bg-[#e01a1a] hover:bg-opacity-70"
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

  const handleConfirmCancel = async () => {
    if (!reason.trim()) {
      console.log("Error: Reason is empty");
      toast.error("Please enter the reason for cancellation");
    } else {
      setUpdating(true);
      try {
        await updateBooking.mutateAsync({
          id: booking.id,
          data: { status: 4, cancellationReason: reason },
        });
        toast.success("Service has been cancelled successfully.");
        //window.location.reload();
        queryClient.invalidateQueries({ queryKey: ["currentBooking"] });
        toggle();
      } catch (error: any) {
        console.error("Error cancelling service:", error);
        toast.error(
          `Failed to cancel service: ${error.message || "Unknown error"}`,
        );
      } finally {
        setUpdating(false);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
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
                
              { booking.status === BookingStatus.Completed && !booking.helperRating && <div className="h-[55px] mt">
                <Button
          onClick={() => handleRefund() }
          className="w-full h-[55px] bg-[#e01a1a] hover:bg-[#d86464] text-lg text-white font-Averta-Semibold"
        >
          Request Refund
        </Button>
                </div>}
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
              { styleBtn !== "" && <div className="h-[55px]">{styleBtn}</div>}
            </div>
          </div>
        </div>
        {cancelService ? (
          <div className="flex flex-col gap-[10px]">
            <div className="mt-[10px] flex h-fit w-full flex-col gap-[8px]">
              <p className="font-Averta-Semibold text-sm uppercase leading-[17px] tracking-tight text-[#9ea7af]">
                cancellation reason
              </p>
              <textarea
                placeholder="CANCELLATION REASON"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="min-h-[130px] resize-none rounded-lg border-2 border-[#d3d8dd] px-[10px] py-[16px] font-Averta-Semibold text-base leading-[23px] tracking-tight text-[#4f6071]"
              />
            </div>
            <div className="item-center m-auto flex h-[55px] w-[50%] justify-center rounded-lg bg-[#e01a1a] font-Averta-Semibold text-lg text-white hover:bg-[#e01a1a] hover:bg-opacity-70">
              <AlertDialog>
                <AlertDialogTrigger disabled={updating}>
                  {updating ? (
                    <ClipLoader color="#ffffff" loading={updating} size={30} />
                  ) : (
                    "Confirm"
                  )}
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently cancel
                      the booking order.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleConfirmCancel}
                      className="bg-[#e01a1a] hover:bg-[#e01a1a] hover:bg-opacity-70"
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ) : (
          ""
        )}
        {bookingState === BookingStatus.Cancelled && booking.cancellationReason && (
          <div className="flex flex-col gap-[10px]">
          <div className="h-fit w-full flex flex-col gap-[8px] ">
            <p className="text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight">
              cancellation reason
            </p>
            <textarea
              disabled = {true}
              placeholder="CANCELLATION REASON"
              value={booking.cancellationReason ? booking.cancellationReason : ""}
              onChange={(e) => setReason(e.target.value)}
              className="text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight border-[#d3d8dd] border-2 rounded-lg min-h-[130px] px-[10px] py-[16px] resize-none"
            />
          </div>
        </div>
        )

        }
      </div>
      {feedbackToggle && (
        <div onClick={(e) => e.stopPropagation()}>
          <CreateFeedbackPopup
            toggle={handleFeedback}
            booking={booking}
            closeParentPopup={toggle}
          />
        </div>
      )}
      {refundToggle && (
        <div onClick={(e) => e.stopPropagation()}>
          <CreateRefundPopup
            toggle={handleRefund}
            booking={booking}
            closeParentPopup={toggle}
          />
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPopup;
