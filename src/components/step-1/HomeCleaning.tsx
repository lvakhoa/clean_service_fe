'use client';
import { AUTH_ENDPOINTS } from '@/configs/endpoints';
import { RoomType } from '@/configs/enum';
import parseCurrency from '@/helpers/parseCurrency';
import parseRoomCount from '@/helpers/parseRoomCount';
import parseRoomCountReverse from '@/helpers/parseRoomCountReverse';
import { useBookingStore } from '@/hooks/useBooking';
import { useGetAllRoomPricings } from '@/hooks/useRoomPricing';
import useGetAllServiceTypes from '@/hooks/useServiceType';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Button } from '../ui/button';

const HomeCleaning = () => {
  const router = useRouter();

  const booking = useBookingStore((state) => state.booking);
  const setBooking = useBookingStore((state) => state.setBooking);

  // Service type
  const serviceTypes = useGetAllServiceTypes();
  const cleanTypes = serviceTypes.data?.results.map((val) => ({
    id: val.id,
    name: val.name,
    price: parseCurrency(Number(val.basePrice)),
  }));

  const [selectedCleanType, setSelectedCleanType] = useState(
    booking?.serviceTypeId
  );

  // Room count
  const roomPricings = useGetAllRoomPricings(selectedCleanType);
  const numberOfBathroom = roomPricings[0].data?.results.map((val) =>
    parseRoomCount(val.roomCount)
  );
  const numberOfBedroom = roomPricings[1].data?.results.map((val) =>
    parseRoomCount(val.roomCount)
  );
  const numberOfKitchen = roomPricings[2].data?.results.map((val) =>
    parseRoomCount(val.roomCount)
  );
  const numberOfLivingRoom = roomPricings[3].data?.results.map((val) =>
    parseRoomCount(val.roomCount)
  );

  const [selectedNumberOfBathroom, setSelectedNumberOfBathRoom] = useState(
    booking?.bookingDetails?.bathroomCount
  );
  const [selectedNumberOfBedroom, setSelectedNumberOfBedroom] = useState(
    booking?.bookingDetails?.bedroomCount
  );
  const [selectedNumberOfKitchen, setSelectedNumberOfKitchen] = useState(
    booking?.bookingDetails?.kitchenCount
  );
  const [selectedNumberOfLivingRoom, setSelectedNumberOfLivingRoom] = useState(
    booking?.bookingDetails?.livingRoomCount
  );

  const handleSelectRoomCount = (count: number, type: RoomType): void => {
    if (type === RoomType.Bathroom) {
      setSelectedNumberOfBathRoom(count);
    } else if (type === RoomType.Bedroom) {
      setSelectedNumberOfBedroom(count);
    } else if (type === RoomType.Kitchen) {
      setSelectedNumberOfKitchen(count);
    } else if (type === RoomType.LivingRoom) {
      setSelectedNumberOfLivingRoom(count);
    }
  };

  const handleSelectCleanType = (id: string): void => {
    setSelectedCleanType(id);
  };

  const canNextStep =
    !!selectedCleanType &&
    selectedNumberOfBathroom != undefined &&
    selectedNumberOfBedroom != undefined &&
    selectedNumberOfKitchen != undefined &&
    selectedNumberOfLivingRoom != undefined;

  const handleNextStep = () => {
    setBooking({
      ...booking,
      serviceTypeId: selectedCleanType,
      bookingDetails: {
        ...booking?.bookingDetails,
        bedroomCount: selectedNumberOfBedroom,
        bathroomCount: selectedNumberOfBathroom,
        kitchenCount: selectedNumberOfKitchen,
        livingRoomCount: selectedNumberOfLivingRoom,
      },
    });
  };

  const renderRoomOptions = (
    heading: string,
    items: string[],
    type: RoomType,
    selectedItem?: number
  ) => (
    <div>
      <span className="font-Averta-Semibold text-[#9FA7B0] text-[14px] leading-[17px]">
        {heading}
      </span>
      <div className="mt-4 flex flex-row flex-wrap gap-2 justify-center">
        {items.map((item) => (
          <div
            key={item}
            onClick={() =>
              handleSelectRoomCount(parseRoomCountReverse(item), type)
            }
            className={`cursor-pointer flex px-[38px] py-[15px] rounded-[10px] bg-white justify-center items-center border-[2px] transition ${
              selectedItem != undefined &&
              selectedItem === parseRoomCountReverse(item)
                ? 'border-[#1A78F2] text-[#1A78F2]'
                : 'border-[#D3D8DD] text-[#4F6071] hover:border-[#1A78F2] hover:text-[#1A78F2]'
            }`}
          >
            <span className="font-Averta-Semibold text-[20px] leading-[26px]">
              {item}
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
    selectedItemId?: string
  ) => (
    <div className="flex flex-row flex-wrap gap-2 justify-center">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => handleSelectCleanType(item.id)}
          className={`flex flex-col gap-[10px] items-center cursor-pointer`}
        >
          <div
            className={`flex px-[38px] py-[15px] rounded-[10px] bg-white justify-center items-center border-[2px] transition ${
              selectedItemId && selectedItemId === item.id
                ? 'border-[#1A78F2] text-[#1A78F2]'
                : 'border-[#D3D8DD] text-[#4F6071] hover:border-[#1A78F2] hover:text-[#1A78F2]'
            }`}
          >
            <span className="font-Averta-Semibold text-[20px] leading-[26px]">
              {item.name}
            </span>
          </div>
          <span className="text-[#88939D] text-[14px] leading-[19px]">
            {item.price}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="relative w-full h-[500px] mt-[80px]">
        <div className="flex flex-col absolute inset-0 items-center">
          <p className="font-Averta-Bold text-center text-[38px] mb-8">
            Customize Your Requirements
          </p>
          <div className="space-y-4 text-center">
            <div className="space-y-4">
              <span className="font-Averta-Semibold text-[#9FA7B0] text-[14px] leading-[17px]">
                CLEAN TYPE
              </span>
              {!serviceTypes.isLoading && cleanTypes ? (
                renderServiceOptions(cleanTypes, selectedCleanType)
              ) : (
                <div>Loading...</div> // Skeleton
              )}
            </div>

            {selectedCleanType && (
              <div className="space-y-11">
                {!roomPricings[0].isLoading && numberOfBathroom ? (
                  renderRoomOptions(
                    'NUMBER OF BATHROOMS',
                    numberOfBathroom,
                    RoomType.Bathroom,
                    selectedNumberOfBathroom
                  )
                ) : (
                  <div>Loading...</div> // Skeleton
                )}

                {!roomPricings[1].isLoading && numberOfBedroom ? (
                  renderRoomOptions(
                    'NUMBER OF BEDROOMS',
                    numberOfBedroom,
                    RoomType.Bedroom,
                    selectedNumberOfBedroom
                  )
                ) : (
                  <div>Loading...</div> // Skeleton
                )}

                {!roomPricings[2].isLoading && numberOfKitchen ? (
                  renderRoomOptions(
                    'NUMBER OF KITCHENS',
                    numberOfKitchen,
                    RoomType.Kitchen,
                    selectedNumberOfKitchen
                  )
                ) : (
                  <div>Loading...</div> // Skeleton
                )}

                {!roomPricings[3].isLoading && numberOfLivingRoom ? (
                  renderRoomOptions(
                    'NUMBER OF LIVINGROOMS',
                    numberOfLivingRoom,
                    RoomType.LivingRoom,
                    selectedNumberOfLivingRoom
                  )
                ) : (
                  <div>Loading...</div> // Skeleton
                )}
              </div>
            )}
          </div>

          <Button
            disabled={!canNextStep}
            className={`mt-8 w-[165px] h-[55px] bg-[#1A78F2] text-lg text-white font-Averta-Semibold ${
              !canNextStep && 'cursor-not-allowed bg-gray-400'
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

export default HomeCleaning;
