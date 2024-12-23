import { BookingStatus } from '@/configs/enum';
import React from 'react'

interface ChartRowProps {
    service_name: string;
    location: string;
    date_time: string;
    service_fee: number;
    status: string;
}

export const ChartRow: React.FC<ChartRowProps> = ({service_name, location, date_time, service_fee, status}) => {
    
    const bgColor = status === BookingStatus.Completed ? 'bg-[#b3fcf1]' : 
                status === BookingStatus.InProgress ? 'bg-[#cab5fc]' : 
                status === BookingStatus.Pending ? 'bg-[#f8e0c9]' : 
                status === BookingStatus.Confirmed ? 'bg-[#dbbeec]' : 
                status === BookingStatus.Cancelled ? 'bg-[#FDE0E0]' : '';

const textColor = status === BookingStatus.Completed ? 'text-[#00B69B]' : 
                  status === BookingStatus.InProgress ? 'text-[#6226EF]' :
                  status === BookingStatus.Pending ? 'text-[#FF8C00]' : 
                  status === BookingStatus.Confirmed ? 'text-[#6a1b9a]' :
                  status === BookingStatus.Cancelled ? 'text-[#D32F2F]' : '';
  return (
    <>
        <div className='flex flex-col sm:flex-row h-fit sm:h-[80px] p-[10px] gap-[10px]'>
            <div className='w-full sm:w-[20.5%] pl-[12px] sm:m-auto'>
                <div className='text-[#202224] opacity-80 text-sm font-semibold'><span className='md:hidden text-base font-bold uppercase'>service name: </span>{service_name}</div>
            </div>
            <div className='w-full sm:w-[22.5%] pl-[12px] sm:m-auto'>
                <div className='text-[#202224] opacity-80 text-sm font-semibold'><span className='md:hidden text-base font-bold uppercase'>location: </span>{location}</div>
            </div>
            <div className='w-full sm:w-[25.8%] pl-[12px] sm:m-auto'>
                <div className='text-[#202224] opacity-80 text-sm font-semibold'><span className='md:hidden text-base font-bold uppercase'>date time: </span>{date_time}</div>
            </div>
            <div className='w-full sm:w-[16%] pl-[12px] sm:m-auto'>
                <div className='text-[#202224] opacity-80 text-sm font-semibold'><span className='md:hidden text-base font-bold uppercase'>service fee: </span>{service_fee}</div>
            </div>
            <div className='w-full sm:w-[15.2%] pl-[12px] sm:m-auto py-[26.5] pr-[50px]'>
                <div className='flex flex-row gap-4 '>
                    <span className='md:hidden font-bold uppercase text-[#202224] opacity-80'>status: </span>
                    <div className={`${bgColor} h-[30px] rounded-lg w-[90px] px-3`}>
                        <div className={`${textColor} text-xs font-bold flex items-center justify-center h-full`}>{status}</div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
