'use client';

import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AUTH_ENDPOINTS } from '@/configs/endpoints';
import { ServiceCategory } from '@/configs/enum';
import { useBookingStore } from '@/hooks/useBooking';

const Step_0 = () => {
  const setServiceCategory = useBookingStore(
    (state) => state.setServiceCategory
  );

  const navigateToHomeCleaning = () => {
    setServiceCategory(ServiceCategory.HomeCleaning);
  };
  const navigateToOtherServices = () => {
    setServiceCategory(ServiceCategory.OtherServices);
  };

  const [selectService, setSelectService] = useState('');

  return (
    <div className="w-full h-screen">
      <div className="h-full flex flex-col justify-center gap-6">
        <div className="w-full h-fit">
          <h1 className="text-[#12153a] text-4xl font-Averta-Semibold leading-[65px] text-center">
            Find the Perfect Service for You!
          </h1>
        </div>
        <div className="w-full h-fit text-center">
          <h5 className="text-[#2b3641] text-xl font-normal font-Averta-Regular leading-[25px]">
            Choose the service that suits you best.
            <br />
            What we have to offer:
          </h5>
        </div>
        <div className="w-[80%] h-[450px] flex flex-row items-center justify-center divide-x-2 divide-dashed mx-auto border-2 rounded-2xl p-[20px] shadow-xl">
          <div
            className="w-[50%] h-full flex flex-col items-center justify-center gap-[10px] hover:cursor-pointer"
            onMouseEnter={() => setSelectService(ServiceCategory.HomeCleaning)}
            onMouseLeave={() => setSelectService('')}
            onClick={navigateToHomeCleaning}
          >
            <div className="relative size-[200px]">
              <Image
                src="/images/BookingPage/step-0/house_unselect.png"
                alt="home_service"
                width={200}
                height={200}
                className="absolute top-0 left-0"
              />
              <Image
                src="/images/BookingPage/step-0/house_select.png"
                alt="home_service"
                width={200}
                height={200}
                className="absolute top-0 left-0 transition-opacity duration-300"
                style={{
                  opacity:
                    selectService !== ServiceCategory.HomeCleaning ? 0 : 1,
                }}
              />
            </div>
            <div className="w-full h-[40%] flex flex-col items-center gap-[5px]">
              <div className="text-[#1d2c4c] text-[34px] font-Averta-Semibold leading-[42px]">
                Home Cleaning
              </div>
              <div className="text-[#12153a] text-base font-Averta-Regular leading-[23px] tracking-tight text-center">
                Professional home cleaning services take the burden off your
                shoulders,
                <br /> ensuring every corner shines while you focus on what
                matters most.
                <br />
                <span className="font-Averta-Semibold">
                  {' '}
                  It's not just cleaning; it’s peace of mind delivered.
                </span>
              </div>
            </div>
          </div>
          <div
            className="w-[50%] h-full flex flex-col items-center justify-center gap-[10px] hover:cursor-pointer"
            onMouseEnter={() => setSelectService(ServiceCategory.OtherServices)}
            onMouseLeave={() => setSelectService('')}
            onClick={navigateToOtherServices}
          >
            <div className="relative h-[200px] w-[280px]">
              <>
                <Image
                  src="/images/BookingPage/step-0/other1_unselect.png"
                  alt="other_service_01"
                  width={133.3}
                  height={133.3}
                  className="absolute top-0 left-0"
                />
                <Image
                  src="/images/BookingPage/step-0/other1_select.png"
                  alt="other_service_01"
                  width={133.3}
                  height={133.3}
                  className="absolute top-0 left-0 transition-opacity duration-300"
                  style={{
                    opacity:
                      selectService !== ServiceCategory.OtherServices ? 0 : 1,
                  }}
                />
              </>
              <>
                <Image
                  src="/images/BookingPage/step-0/other2_unselect.png"
                  alt="other_service_02"
                  width={133.3}
                  height={133.3}
                  className="absolute bottom-0 right-0"
                />
                <Image
                  src="/images/BookingPage/step-0/other2_select.png"
                  alt="other_service_02"
                  width={133.3}
                  height={133.3}
                  className="absolute bottom-0 right-0 transition-opacity duration-300"
                  style={{
                    opacity:
                      selectService !== ServiceCategory.OtherServices ? 0 : 1,
                  }}
                />
              </>
            </div>
            <div className="w-full h-[40%] flex flex-col items-center gap-[5px]">
              <div className="text-[#1d2c4c] text-[34px] font-Averta-Semibold leading-[42px]">
                Other Services
              </div>
              <div className="text-[#12153a] text-base font-Averta-Regular leading-[23px] tracking-tight text-center">
                Services like babysitting, housekeeping, and caretaking are
                designed to
                <br /> provide care, comfort, and support exactly when you need
                it, allowing
                <br /> you to focus on your priorities.
                <br />
                <span className="font-Averta-Semibold">
                  {' '}
                  It’s not just assistance—it’s personalized care that makes
                  life easier
                  <br /> and more manageable.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step_0;
