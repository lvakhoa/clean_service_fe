import { cleanApi } from '@/services/HttpClient';
import { CreateBookingRequest } from '@/types/booking';

const bookingAction = {
  async createBooking(booking: CreateBookingRequest) {
    const response = await cleanApi.post<
      CleanSuccessResponseWrapper<CreateBookingRequest>
    >('/booking/create', booking);
    return response.data.data;
  },
};

export default bookingAction;
