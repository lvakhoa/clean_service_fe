import bookingAction from "@/apis/booking.action";
import customerAction from "@/apis/customer.action";
import { ServiceCategory } from "@/configs/enum";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import * as zustand from "zustand";

type State = {
  booking: DeepPartial<CreateBookingRequest> | null;
  serviceCategory: ServiceCategory | null;
};

type Action = {
  setBooking: (booking: DeepPartial<CreateBookingRequest> | null) => void;
  setServiceCategory: (serviceCategory: ServiceCategory | null) => void;
};

export const useBookingStore = zustand.create<State & Action>((set) => ({
  booking: null,
  setBooking: (booking: DeepPartial<CreateBookingRequest> | null) =>
    set({ booking }),
  serviceCategory: null,
  setServiceCategory: (serviceCategory: ServiceCategory | null) =>
    set({ serviceCategory }),
}));

export const useGetBookingByOrderCode = (orderCode: number | null) =>
  useQuery({
    queryKey: ["booking", "orderCode", orderCode],
    queryFn: () => {
      if (!orderCode) throw new Error("Order code is invalid");
      return bookingAction.getBookingByOrderCode(orderCode);
    },
  });

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

export const useGetBookingOfCurrentCustomer = (page: number, limit: number) =>
  useQuery({
    queryKey: ["currentCustomerBooking", page, limit],
    queryFn: () => customerAction.getCurrentCustomerBooking(page, limit),
    placeholderData: (previous) => previous,
  });

export const useCreatePayment = () =>
  useMutation({
    mutationFn: (orderCode: number) => bookingAction.createPayment(orderCode),
  });

export const useCancelPayment = (refetchBooking: () => void) =>
  useMutation({
    mutationFn: (orderCode: number) => bookingAction.cancelPayment(orderCode),
    onSuccess: refetchBooking,
  });
