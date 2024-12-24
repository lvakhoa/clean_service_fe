import {
  adminUpdateCustomerData,
  updateCustomerData,
} from "@/schemas/customerSchema";
import { cleanApi } from "@/services/HttpClient";

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
      `/manage/customers/${id}`,
    );
    return res.data;
  },
  async updateUser(id: string, data: adminUpdateCustomerData) {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value == null) return;

      if (value instanceof File) {
        formData.append(key, value);
      } else if (typeof value === "number") {
        formData.append(key, (value as number).toString());
      } else {
        formData.append(key, value);
      }
    });

    const res = await cleanApi.patch<CleanSuccessResponseWrapper>(
      `/manage/users/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return res.data;
  },
  async updateCurrentUser(data: updateCustomerData) {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value == null) return;

      if (value instanceof File) {
        formData.append(key, value);
      } else if (typeof value === "number") {
        formData.append(key, (value as number).toString());
      } else {
        formData.append(key, value);
      }
    });

    const res = await cleanApi.patch<CleanSuccessResponseWrapper>(
      `/auth/me`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
  },
  async getCurrentCustomerBooking(page?: number, limit?: number) {
    const res = await cleanApi.get<
      CleanSuccessResponseWrapper<PaginationResponseWrapper<Booking>>
    >("/scheduler/current", {
      params: {
        page,
        limit,
      },
    });
    return res.data;
  },
  async getCurrentCustomer() {
    const res =
      await cleanApi.get<CleanSuccessResponseWrapper<Customer>>("/auth/me");
    return res.data;
  },
};

export default customerAction;
