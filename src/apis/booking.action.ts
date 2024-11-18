import { cleanApi } from '@/services/HttpClient';
import { CreateBookingRequest } from '@/types/booking';

const bookingAction = {
  async createBooking(booking: CreateBookingRequest) {
    try {
      const response = await cleanApi.post<
        CleanSuccessResponseWrapper<CreateBookingResponse>
      >('/booking/create', booking, {
        raw: true,
      });
      return response.data.data;
    } catch (err) {
      throw err;
    }
  },
  async cancelPayment(orderCode: number) {
    const response = await cleanApi.patch<CleanSuccessResponseWrapper>(
      `/payment/cancel/${orderCode}`
    );
    return response.data;
  },
};

export default bookingAction;
