import { cleanApi } from '@/services/HttpClient';

const customerAction = {
  async getAllCustomer(page?: number, limit?: number) {
    const res = await cleanApi.get<
      CleanSuccessResponseWrapper<PaginationResponseWrapper<Customer>>
    >('/manage/customers', {
      params: {
        page,
        limit,
      },
    });
    return res.data;
  },
  async getCustomerById(id: string) {
    const res = await cleanApi.get<CleanSuccessResponseWrapper>(
      `/manage/customers/${id}`
    );
    return res.data;
  },
  async updateCustomer(id: string, data: any) {
    const res = await cleanApi.patch<CleanSuccessResponseWrapper>(
      `/manage/users/${id}`,
      data
    );
    return res.data;
  },
  async getCurrentCustomerBooking(page?: number, limit?: number) {
    const res = await cleanApi.get<
      CleanSuccessResponseWrapper<PaginationResponseWrapper<Booking>>
    >('/scheduler/current', {
      params: {
        page,
        limit,
      },
    });
    return res.data;
  },
};

export default customerAction;
