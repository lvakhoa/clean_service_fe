import bookingAction from "@/apis/booking.action";
import customerAction from "@/apis/customer.action";
import { UpdateBookingDto } from "@/schemas/updateBookingSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useScheduler = (page?: number, limit?: number) => {
  const queryClient = useQueryClient();

  const getCurrentCustomerBooking = useQuery({
    queryKey: ["currentBooking"],
    queryFn: () => {
      return customerAction.getCurrentCustomerBooking(page, limit);
    },
  });

  const updateBooking = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBookingDto }) =>
      bookingAction.updateBooking(id, data),
  });

  return {
    getCurrentCustomerBooking,
    updateBooking,
    queryClient,
  };
};
