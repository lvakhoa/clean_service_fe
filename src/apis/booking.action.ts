import { cleanApi } from '@/services/HttpClient';

const bookingAction = {
  async createBooking(booking: CreateBookingRequest) {
    const response = await cleanApi.post<
      CleanSuccessResponseWrapper<CreateBookingResponse>
    >('/booking/create', booking);
    return response.data.data;
  },
};

export default bookingAction;
