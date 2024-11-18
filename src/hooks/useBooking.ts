import bookingAction from '@/apis/booking.action';
import { CreateBookingRequest } from '@/types/booking';
import { useMutation } from '@tanstack/react-query';
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
  useMutation({
    mutationFn: (booking: CreateBookingRequest) =>
      bookingAction.createBooking(booking),
  });
