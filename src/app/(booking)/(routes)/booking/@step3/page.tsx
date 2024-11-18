'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useBookingStore } from '@/hooks/useBooking';
import { SelectedTime } from '@/types/booking';

const days = [
  { dayInMonth: '1', active: true },
  { dayInMonth: '2', active: false },
  { dayInMonth: '3', active: false },
  { dayInMonth: '4', active: false },
  { dayInMonth: '5', active: false },
  { dayInMonth: '6', active: false },
  { dayInMonth: '7', active: false },
  { dayInMonth: '8', active: false },
  { dayInMonth: '9', active: false },
  { dayInMonth: '10', active: false },
  { dayInMonth: '11', active: false },
  { dayInMonth: '12', active: false },
  { dayInMonth: '13', active: false },
  { dayInMonth: '14', active: false },
  { dayInMonth: '15', active: false },
  { dayInMonth: '16', active: false },
  { dayInMonth: '17', active: false },
  { dayInMonth: '18', active: false },
  { dayInMonth: '19', active: false },
  { dayInMonth: '20', active: false },
  { dayInMonth: '21', active: false },
  { dayInMonth: '22', active: false },
  { dayInMonth: '23', active: false },
  { dayInMonth: '24', active: false },
  { dayInMonth: '25', active: false },
  { dayInMonth: '26', active: false },
  { dayInMonth: '27', active: false },
  { dayInMonth: '28', active: false },
  { dayInMonth: '29', active: false },
  { dayInMonth: '30', active: false },
  { dayInMonth: '31', active: false },
];

const availableTimes = [
  { time: '08:00am', hour: 8, minute: 0, active: false },
  { time: '08:30am', hour: 8, minute: 30, active: false },
  { time: '09:00am', hour: 9, minute: 0, active: false },
  { time: '09:30am', hour: 9, minute: 30, active: false },
  { time: '10:00am', hour: 10, minute: 0, active: false },
  { time: '02:00pm', hour: 14, minute: 0, active: false },
  { time: '02:30pm', hour: 14, minute: 30, active: false },
  { time: '03:00pm', hour: 15, minute: 0, active: false },
  { time: '03:30pm', hour: 15, minute: 30, active: false },
  { time: '04:00pm', hour: 16, minute: 0, active: false },
];

const Step_3 = () => {
  const booking = useBookingStore((state) => state.booking);
  const setBooking = useBookingStore((state) => state.setBooking);

  const scheduledStartTime = useMemo(
    () =>
      booking?.scheduledStartTime
        ? new Date(booking?.scheduledStartTime)
        : null,
    [booking?.scheduledStartTime]
  );

  const [selectedTime, setSelectedTime] = React.useState<SelectedTime | null>(
    booking &&
      scheduledStartTime &&
      scheduledStartTime.getHours() !== 0 &&
      scheduledStartTime.getMinutes() !== 0
      ? {
        hour: scheduledStartTime.getHours(),
        minute: scheduledStartTime.getMinutes(),
      }
      : null
  );

  const [api, setApi] = React.useState<CarouselApi>();
  useEffect(() => {
    if (!api || !scheduledStartTime) {
      return;
    }
    api.scrollTo(scheduledStartTime.getDate() - 1);
  }, [api, scheduledStartTime]);

  const displayDays = days.map((day) => {
    return (
      <CarouselItem className="basis-auto pl-4" key={day.dayInMonth}>
        <Card>
          <CardContent
            className={`flex justify-center items-center pt-[23px] bg-white h-[55px] w-[132px] rounded-[10px] font-Averta-Semibold text-xl border transition duration-100 ${scheduledStartTime &&
                scheduledStartTime.getDate() === parseInt(day.dayInMonth)
                ? 'text-[#1A78F2] border-[#1A78F2]'
                : 'text-[#4f6071] border-[#d3d8dd]'
              } hover:text-white hover:bg-[#1A78F2]`}
          >
            {day.dayInMonth}
          </CardContent>
        </Card>
      </CarouselItem>
    );
  });

  const displayTimes = availableTimes.map((time) => {
    return (
      <CarouselItem className="basis-1/3" key={time.time}>
        <Card>
          <CardContent
            onClick={() =>
              setSelectedTime({ hour: time.hour, minute: time.minute })
            }
            className={`flex justify-center items-center pt-[23px] bg-white h-[73px] w-[400px] rounded-[10px] font-Averta-Semibold text-base leading-[23px] tracking-tight text-[#88929c] border border-[#d3d8dd] transition duration-100 ${selectedTime &&
                selectedTime.hour === time.hour &&
                selectedTime.minute === time.minute
                ? 'text-[#1A78F2] border-[#1A78F2]'
                : 'text-[#4f6071] border-[#d3d8dd]'
              } hover:text-white hover:bg-[#1A78F2]`}
          >
            {time.time}
          </CardContent>
        </Card>
      </CarouselItem>
    );
  });

  const canNextStep = !!selectedTime;

  const handleNextStep = () => {
    if (selectedTime && scheduledStartTime) {
      scheduledStartTime.setHours(selectedTime.hour);
      scheduledStartTime.setMinutes(selectedTime.minute);
      setBooking({
        ...booking,
        scheduledStartTime: scheduledStartTime.toISOString(),
        scheduledEndTime: new Date(
          scheduledStartTime.getTime() + 2 * 60 * 60 * 1000
        ).toISOString(),
      });
    }
  };

  return (
    <div className="h-full w-full">
      <div className="w-1/2 m-auto">
        <div className="justify-center h-[80px]">
          <p className="text-4xl text-center font-Averta-Bold mb-2 mt-[50px] ">
            Book Timing
          </p>
          <p className="text-[20px] text-center text-[#88939D] font-Averta-Regular leading-[25px]">
            Save even more by booking off-peak dates and times.
          </p>
        </div>
      </div>
      <Carousel
        className="w-full max-w-6xl mx-auto"
        setApi={setApi}
        opts={{
          align: 'center',
        }}
      >
        <CarouselContent>{displayDays}</CarouselContent>
      </Carousel>

      <Carousel
        className="w-3/4 max-w-6xl m-auto grid justify-center mt-20 mb-20"
        orientation="vertical"
        opts={{ active: true }}
      >
        <CarouselContent className="h-80">{displayTimes}</CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="flex justify-center items-center mt-[35px]">
        <Button
          disabled={!canNextStep}
          onClick={handleNextStep}
          className={`w-[165px] h-[55px] bg-[#1A78F2] text-lg text-white font-Averta-Semibold ${!canNextStep && 'cursor-not-allowed bg-gray-400'
            }`}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step_3;
