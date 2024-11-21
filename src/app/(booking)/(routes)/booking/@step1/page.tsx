'use client';

import React, { useEffect } from 'react';
import HomeCleaning from '@/components/step-1/HomeCleaning';
import OtherServices from '@/components/step-1/OtherServices';
import { useRouter, useSearchParams } from 'next/navigation';
import { ServiceCategory } from '@/configs/enum';
import Image from 'next/image';
import { PUBLIC_ENDPOINTS } from '@/configs/endpoints';
import { useBookingStore } from '@/hooks/useBooking';

const NotFoundCategory = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace(PUBLIC_ENDPOINTS.landing);
    }, 5000);
    return () => clearTimeout(timeout);
  });

  return (
    <div className="flex m-auto flex-col gap-5 items-center justify-center">
      <Image
        src="/images/Header/Logo.svg"
        alt="logo"
        width={100}
        height={100}
      />

      <div className="text-center space-y-3">
        <h4 className="text-3xl font-semibold">
          Oops, something went wrong while choosing a category!
        </h4>
        <div className="space-y-1">
          <p className="text-sm">
            We will redirect you to the service category page shortly.
          </p>
        </div>
      </div>
    </div>
  );
};

const Step_1 = () => {
  const serviceCategory = useBookingStore((state) => state.serviceCategory);

  let category: React.ReactNode = null;
  switch (serviceCategory) {
    case ServiceCategory.HomeCleaning:
      category = <HomeCleaning />;
      break;
    case ServiceCategory.OtherServices:
      category = <OtherServices />;
      break;
    default:
      category = <NotFoundCategory />;
  }

  return (
    <>
      <div>{category}</div>
    </>
  );
};

export default Step_1;
