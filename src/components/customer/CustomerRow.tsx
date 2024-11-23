'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { Skeleton } from '../skeleton/skeleton';

const CustomerRow: React.FC<CustomerRowProps> = ({
  stt,
  id,
  name,
  address,
  phone,
  email,
  isLoading,
}) => {
  const router = useRouter();
  return (
    <div className="transition flex flex-wrap gap-3 w-full border-b border-gray-200 bg-white hover:bg-[#f4f7ff] h-auto items-start md:items-center px-5 py-2.5 cursor-pointer">
      <div className="w-full md:w-[8%] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224] font-semibold">
          <span className="md:hidden font-bold">STT: </span>
          {isLoading ? <Skeleton className="h-4 w-14 rounded-lg" /> : stt}
        </div>
      </div>

      <div className="w-full md:w-[20%] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224] font-semibold">
          <span className="md:hidden font-bold">NAME: </span>
          {isLoading ? <Skeleton className="h-4 w-24 rounded-lg" /> : name}
        </div>
      </div>

      <div className="w-full md:w-[26%] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224] font-semibold">
          <span className="md:hidden font-bold">ADDRESS: </span>
          {isLoading ? <Skeleton className="h-4 w-56 rounded-lg" /> : address}
        </div>
      </div>

      <div className="w-full md:w-[11%] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224cc]">
          <span className="md:hidden font-bold">PHONE: </span>
          {isLoading ? <Skeleton className="h-4 w-24 rounded-lg" /> : phone}
        </div>
      </div>

      <div className="w-full md:w-[20%] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224cc] truncate">
          <span className="md:hidden font-bold">EMAIL: </span>
          {isLoading ? <Skeleton className="h-4 w-36 rounded-lg" /> : email}
        </div>
      </div>

      <div className="w-full  md:w-[10%] flex items-center md:py-6">
        {isLoading ? (
          <Skeleton className="h-4 w-24 rounded-lg" />
        ) : (
          <button
            onClick={() => router.push(`/dashboard/customer/${id}`)}
            className="transition ml-auto px-4 py-1.5 bg-[#6896d1] text-[#12153a] bg-opacity-20 text-xs rounded-[4.5px] font-semibold hover:bg-opacity-50"
          >
            <span>More Info</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomerRow;
