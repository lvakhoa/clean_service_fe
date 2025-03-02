'use client';

import { useBookingStore } from '@/hooks/useBooking';
import React from 'react';

const BookingStepLayout = (props: {
  step0: React.ReactNode;
  step1: React.ReactNode;
  step2: React.ReactNode;
  step3: React.ReactNode;
  step4: React.ReactNode;
  step5: React.ReactNode;
}) => {
  const booking = useBookingStore((state) => state.booking);
  const serviceCategory = useBookingStore((state) => state.serviceCategory);

  let children = props.step0;
  if (serviceCategory) {
    if (booking) {
      if (
        ((booking.bookingDetails?.bathroomCount != undefined &&
          booking.bookingDetails?.bedroomCount != undefined &&
          booking.bookingDetails?.kitchenCount != undefined &&
          booking.bookingDetails?.livingRoomCount != undefined) ||
          booking.bookingDetails?.durationPriceId) &&
        booking.serviceTypeId
      ) {
        children = props.step2;
      }

      if (booking.scheduledStartTime) {
        children = props.step3;
      }

      if (booking.scheduledEndTime) {
        children = props.step4;
      }
    } else {
      children = props.step1;
    }
  }

  return <div>{children}</div>;
};

export default BookingStepLayout;
