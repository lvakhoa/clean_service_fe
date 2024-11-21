import { cleanApi } from '@/services/HttpClient';

const bookingAction = {
  async getBookingByOrderCode(orderCode: number) {
    const response = await cleanApi.get<CleanSuccessResponseWrapper<Booking>>(
      `/booking/order/${orderCode}`
    );
    return response.data.data;
  },
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
  async createPayment(orderCode: number) {
    const response = await cleanApi.post<
      CleanSuccessResponseWrapper<CreateBookingResponse>
    >(`/payment/create/${orderCode}`);
    return response.data.data;
  },
  async cancelPayment(orderCode: number) {
    const response = await cleanApi.patch<CleanSuccessResponseWrapper>(
      `/payment/cancel/${orderCode}`
    );
    return response.data;
  },
};

export default bookingAction;
