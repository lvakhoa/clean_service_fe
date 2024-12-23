"use client";

import { Button } from "@/components/ui/button";
import {
  AUTH_ENDPOINTS,
  CUSTOMER_ENDPOINTS,
  PUBLIC_ENDPOINTS,
} from "@/configs/endpoints";
import { BookingStatus, PaymentStatus } from "@/configs/enum";
import { useCancelPayment, useGetBookingByOrderCode } from "@/hooks/useBooking";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";

function PaymentCancelled() {
  const router = useRouter();
  const navigateToHome = () => router.replace(PUBLIC_ENDPOINTS.landing);
  const navigateToOrder = () => router.push(CUSTOMER_ENDPOINTS.booking);

  const params = useSearchParams();
  const cancel = params.get("cancel");
  const orderCode = params.get("orderCode");

  const {
    data: getBookingData,
    isPending: getBookingPending,
    isError: getBookingError,
    refetch: refetchGetBooking,
  } = useGetBookingByOrderCode(orderCode ? parseInt(orderCode) : null);

  const { mutate: handleCancel } = useCancelPayment(refetchGetBooking);
  useEffect(() => {
    if (
      cancel === "true" &&
      orderCode &&
      getBookingData &&
      getBookingData.paymentStatus !== PaymentStatus.Paid &&
      getBookingData.status !== BookingStatus.Cancelled
    ) {
      handleCancel(parseInt(orderCode));
    }
  }, [cancel, orderCode, handleCancel, getBookingData]);

  return (
    <div className="m-auto flex flex-col items-center justify-center gap-5">
      <Image
        src="/images/Header/Logo.svg"
        alt="logo"
        width={100}
        height={100}
      />

      {!getBookingPending &&
      ((getBookingData &&
        (getBookingData.paymentStatus === PaymentStatus.Paid ||
          getBookingData.status === BookingStatus.Cancelled)) ||
        getBookingError) ? (
        getBookingData?.paymentStatus === PaymentStatus.Paid ? (
          <>
            <div className="text-center">
              <h4 className="text-3xl font-semibold text-red-950">
                Your booking has been paid!
              </h4>
            </div>

            <Button
              onClick={navigateToHome}
              variant="outline"
              className="min-w-40 border-blue-600 bg-white text-blue-600 hover:bg-blue-100 hover:text-blue-600"
            >
              Back To Homepage
            </Button>
          </>
        ) : getBookingData?.status === BookingStatus.Cancelled ? (
          <>
            <div className="text-center">
              <h4 className="text-3xl font-semibold text-red-950">
                Your booking has been cancelled!
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={navigateToHome}
                variant="outline"
                className="min-w-40 border-blue-600 bg-white text-blue-600 hover:bg-blue-100 hover:text-blue-600"
              >
                Back To Homepage
              </Button>
              <Button
                onClick={navigateToOrder}
                className="min-w-40 bg-blue-600 text-white hover:bg-blue-700"
              >
                Create New Booking
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center">
              <h4 className="text-3xl font-semibold text-red-950">
                Invalid order code or
                <br />
                you cannot access to this order!
              </h4>
            </div>

            <Button
              onClick={navigateToHome}
              variant="outline"
              className="min-w-40 border-blue-600 bg-white text-blue-600 hover:bg-blue-100 hover:text-blue-600"
            >
              Back To Homepage
            </Button>
          </>
        )
      ) : (
        <FaSpinner className="size-10 animate-spin" />
      )}
    </div>
  );
}

export default PaymentCancelled;
