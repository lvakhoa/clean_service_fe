import bookingAction from '@/apis/booking.action';
import { CreateBookingRequest } from '@/types/booking';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import * as zustand from 'zustand';

type State = {
  booking: DeepPartial<CreateBookingRequest> | null;
};

type Action = {
  setBooking: (booking: DeepPartial<CreateBookingRequest> | null) => void;
};

export const useBookingStore = zustand.create<State & Action>((set) => ({
  booking: null,
  setBooking: (booking: DeepPartial<CreateBookingRequest> | null) =>
    set({ booking }),
}));

export const useCreateBooking = () =>
  useMutation<
    CreateBookingResponse | undefined,
    AxiosError<CleanErrorResponseWrapper, any>,
    CreateBookingRequest
  >({
    mutationFn: (booking) => bookingAction.createBooking(booking),
    onSuccess(data, variables, context) {
      if (data?.paymentLink) {
        window.location.href = data?.paymentLink;
      }
    },
  });

export const useCancelPayment = () =>
  useMutation({
    mutationFn: (orderCode: number) => bookingAction.cancelPayment(orderCode),
  });
