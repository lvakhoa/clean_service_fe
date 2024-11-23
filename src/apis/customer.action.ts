import { cleanApi } from "@/services/HttpClient";
import { Customer } from "@/types/customer";

const customerAction = {
  async getAllCustomer(page?: number, limit?: number) {
    const res = await cleanApi.get<
      CleanSuccessResponseWrapper<PaginationResponseWrapper<Customer>>
    >("/manage/customers", {
      params: {
        page,
        limit,
      },
    });
    return res.data;
  },
  async getCustomerById(id: string) {
    const res = await cleanApi.get<CleanSuccessResponseWrapper<Customer>>(
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
  async updateCustomerIdCard(id: string, data: any) {
    const res = await cleanApi.patch<CleanSuccessResponseWrapper>(
      `/manage/users/${id}/id-card`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  },
  async updateCustomerProfile(id: string, data: any) {
    const res = await cleanApi.patch<CleanSuccessResponseWrapper>(
      `/manage/users/${id}/profile-picture`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
  async getCurrentCustomer() {
    const res = await cleanApi.get<CleanSuccessResponseWrapper<Customer>>(
      "/manage/customers/me"
    );
    return res.data;
  },
};

export default customerAction;
