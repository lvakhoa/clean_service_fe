'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { CreateRefundDto } from '@/schemas/createRefundSchema';
import { useRefund } from '@/hooks/useRefund';

interface QuickPopupReturnProps {
    toggle: () => void;
    booking: Booking;
    closeParentPopup: () => void;
}
const CreateRefundPopup: React.FC<QuickPopupReturnProps> = ({ toggle,
    booking,
    closeParentPopup, }) => {
        const {queryClient, createRefund} = useRefund();

        const [reason, setReason] = useState<string>("");
        const [creating, setCreating] = useState(false);

        const formatSchedule = (startTime: string, endTime: string): JSX.Element => {
            const startDate = new Date(startTime);
            const endDate = new Date(endTime);
        
            const timeFormatter = new Intl.DateTimeFormat("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            });
        
            const start = timeFormatter.format(startDate);
            const end = timeFormatter.format(endDate);
        
            const day = startDate.getDate().toString().padStart(2, "0");
            const month = (startDate.getMonth() + 1).toString().padStart(2, "0");
            const year = startDate.getFullYear();
        
            const formattedDate = `${day}/${month}/${year}`;
        
            return (
              <div className="flex flex-col divide-y-2 h-full">
                <p className="text-[#1d2c4c] opacity-50 text-sm leading-[19px] tracking-tight font-Averta-Semibold">
                  <span className="text-[#677482]">{start}</span> -{" "}
                  <span className="text-[#677482]">{end}</span>
                </p>
                <p className="text-[#1d2c4c] opacity-50 text-sm leading-[19px] tracking-tight font-Averta-Semibold text-center">
                  {formattedDate}
                </p>
              </div>
            );
          };
          const handleSubmit = async () => {
            if (reason === "") {
              toast.error("Please provide a reason.");
              return;
            }
        
            const refundData: CreateRefundDto = {
              bookingId: booking.id,
              reason: reason,
            };
        
            setCreating(true);
            try {
               await createRefund.mutateAsync(refundData);
              toast.success("Refund submitted successfully!");

        
              toggle();
              closeParentPopup();
              queryClient.invalidateQueries({ queryKey: ["currentBooking"] });
        
              setReason("");
            } catch (error) {
              toast.error("Failed to submit refund");
            } finally {
              setCreating(false);
            }
          };

  return (
    <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={toggle}>
      <div className="relative flex flex-col bg-white rounded-lg shadow-lg p-[20px] md:px-[50px] md:py-[30px] w-fit xl:w-[50%] h-fit max-h-[95%] gap-[10px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" 
      onClick={(e) => e.stopPropagation()}>
        <div className='absolute h-[10%] top-5 right-5'>
            <button
            className="ml-auto p-2 rounded-full hover:bg-gray-200 hover:shadow-md transition duration-200 ease-in-out"
            onClick={toggle}>
              <Image src='/images/ProgressBar/Group.svg' alt='exitButton' width={20} height={20}/>
            </button>
        </div>
        <div className='flex flex-col justify-center items-center text-[28px] lg:text-[32px]'>
            <p className='text-[#1a78f2] font-Averta-Bold leading-[62px] self-start'>
            - We’re Here to Make Things Right
            </p>
            <p className='text-[#170f49] text-xl font-Averta-Regular leading-[30px] self-start'>
            “Let us know what went wrong, and we’ll work with you to resolve it promptly.”
            </p>
            <p className='text-[#170f49] font-Averta-Bold leading-[62px]'>
            Fill the form to submit your refund request
            </p>
        </div>
        <div className='flex flex-col w-[90%] justify-center items-center mx-auto'>
          <div className='flex flex-col w-full h-fit gap-[11px] px-[16px] py-[13px]'>
            <p className='text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight'>order selection</p>
            <div className='flex flex-row h-fit justify-between p-[13px] border-[#d3d8dd] border-2 rounded-lg'>
                <div className='flex flex-row gap-[10px] items-center justify-center'>
                  <Image src='/images/About/Google.png' alt='avatar' width={20} height={20} className='max-lg:hidden'/>
                  <p className='text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight'>{booking.helper.user.fullName}</p>
                </div>
              {formatSchedule(
                booking.scheduledStartTime,
                booking.scheduledEndTime
              )}
              <div className='bg-[#1a78f2] bg-opacity-20 py-2 px-3 rounded-md flex justify-center items-center'>
                <p className='text-[#1a78f2] text-xs font-bold'>Home Cleaning</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col w-full h-fit gap-[11px] p-[16px]'>
            <p className='text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight'>Complaint Reason</p>
            <textarea
            onChange={(e) => setReason(e.target.value)}
            placeholder='Type your complaint content'
            className='text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight border-[#d3d8dd] border-2 rounded-lg min-h-[150px] md:min-h-[200px] px-[10px] py-[16px] resize-none'/>
          </div>
          <Button
          onClick={handleSubmit}
          className="w-[30%] h-[55px] bg-[#1A78F2] text-lg text-white font-Averta-Semibold my-3">Submit</Button>
        </div>
      </div>
   </div>
  )
}

export default CreateRefundPopup