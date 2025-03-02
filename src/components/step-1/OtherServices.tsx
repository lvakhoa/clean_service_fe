"use client";

import parseCurrency from "@/helpers/parseCurrency";
import { useBookingStore } from "@/hooks/useBooking";
import { useGetAllDurationPrices } from "@/hooks/useDurationPrice";
import useGetAllServiceTypes from "@/hooks/useServiceType";
import React, { useState } from "react";
import { Skeleton } from "../skeleton/skeleton";
import { Button } from "../ui/button";

const OtherServices = () => {
  const booking = useBookingStore((state) => state.booking);
  const setBooking = useBookingStore((state) => state.setBooking);

  const serviceTypes = useGetAllServiceTypes(
    "78e980bb-f1f6-4906-a7ad-19ea6f67cc03",
  );
  const otherTypes = serviceTypes.data?.results.map((val) => ({
    id: val.id,
    name: val.name,
    price: parseCurrency(Number(val.basePrice)),
  }));
  const [selectedOtherType, setSelectedOtherType] = useState(
    booking?.serviceTypeId,
  );
  const handleSelectOtherType = (id: string) => setSelectedOtherType(id);

  const durationPrices = useGetAllDurationPrices(selectedOtherType);
  const durations = durationPrices.data?.results
    .map((val) => ({
      id: val.id,
      duration: val.durationHours,
      priceMultiplier: val.priceMultiplier,
      serviceTypeId: val.serviceTypeId,
    }))
    .filter((val) => val.serviceTypeId === selectedOtherType);
  const [selectedDuration, setSelectedDuration] = useState<string | undefined>(
    booking?.bookingDetails?.durationPriceId,
  );
  const handleSelectDuration = (id: string) => setSelectedDuration(id);

  const canNextStep = !!selectedOtherType && !!selectedDuration;

  const handleNextStep = () => {
    setBooking({
      ...booking,
      serviceTypeId: selectedOtherType,
      bookingDetails: {
        ...booking?.bookingDetails,
        durationPriceId: selectedDuration,
      },
    });
  };

  const renderDurationOptions = (
    heading: string,
    items: {
      id: string;
      duration: number;
      priceMultiplier: number;
    }[],
    selectedItem?: string,
  ) => (
    <div>
      <span className="font-Averta-Semibold text-[14px] leading-[17px] text-[#9FA7B0]">
        {heading}
      </span>
      <div className="mt-4 flex flex-row flex-wrap justify-center gap-2">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => handleSelectDuration(item.id)}
            className={`flex cursor-pointer items-center justify-center rounded-[10px] border-[2px] bg-white px-[38px] py-[15px] transition ${
              selectedItem != undefined && selectedItem === item.id
                ? "border-[#1A78F2] text-[#1A78F2]"
                : "border-[#D3D8DD] text-[#4F6071] hover:border-[#1A78F2] hover:text-[#1A78F2]"
            }`}
          >
            <span className="font-Averta-Semibold text-[20px] leading-[26px]">
              {item.duration} {item.duration > 1 ? "hours" : "hour"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderServiceOptions = (
    items: {
      id: string;
      name: string;
      price: string;
    }[],
    selectedItemId?: string,
  ) => (
    <div className="flex flex-row flex-wrap justify-center gap-2">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => handleSelectOtherType(item.id)}
          className={`flex cursor-pointer flex-col items-center gap-[10px]`}
        >
          <div
            className={`flex items-center justify-center rounded-[10px] border-[2px] bg-white px-[38px] py-[15px] transition ${
              selectedItemId && selectedItemId === item.id
                ? "border-[#1A78F2] text-[#1A78F2]"
                : "border-[#D3D8DD] text-[#4F6071] hover:border-[#1A78F2] hover:text-[#1A78F2]"
            }`}
          >
            <span className="font-Averta-Semibold text-[20px] leading-[26px]">
              {item.name}
            </span>
          </div>
          <span className="text-[14px] leading-[19px] text-[#88939D]">
            {item.price}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="relative mt-[80px] h-[500px] w-full">
        <div className="absolute inset-0 flex flex-col items-center">
          <p className="mb-8 text-center font-Averta-Bold text-[38px]">
            Customize Your Requirements
          </p>

          <div className="space-y-4 text-center">
            <div className="space-y-4">
              <span className="font-Averta-Semibold text-[14px] leading-[17px] text-[#9FA7B0]">
                SERVICE DETAILS
              </span>
              {!serviceTypes.isLoading && otherTypes ? (
                renderServiceOptions(otherTypes, selectedOtherType)
              ) : (
                <div className="flex items-center gap-2">
                  <Skeleton className="h-16 w-72" />
                  <Skeleton className="h-16 w-72" />
                  <Skeleton className="h-16 w-72" />
                </div>
              )}
            </div>

            {selectedOtherType &&
              (!durationPrices.isLoading && durations ? (
                renderDurationOptions(
                  "FOR HOW LONG?",
                  durations,
                  selectedDuration,
                )
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <Skeleton className="mb-4 h-4 w-60" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-16 w-24" />
                    <Skeleton className="h-16 w-24" />
                    <Skeleton className="h-16 w-24" />
                  </div>
                </div>
              ))}
          </div>

          <Button
            disabled={!canNextStep}
            className={`mt-8 h-[55px] w-[165px] bg-[#1A78F2] font-Averta-Semibold text-lg text-white ${
              !canNextStep && "cursor-not-allowed bg-gray-400"
            }`}
            onClick={handleNextStep}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default OtherServices;
