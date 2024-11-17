import { cleanApi } from "@/services/HttpClient";
import { AxiosRequestConfig } from "axios";
import { partialCustomerSchema } from "@/schemas/customer";

const customerAction = {
  async getAllCustomer() {
    const res = await cleanApi.get("/manage/customers");
    return res.data;
  },
  async getCustomerById(id: string) {
    const res = await cleanApi.get(`/manage/customers/${id}`);
    return res.data;
  },
  async updateCustomer(id: string, data: any) {
    const res = await cleanApi.patch(`/manage/users/${id}`, data);
    return res.data;
  },
  async getBookingByCustomerId(id: string) {
    const res = await cleanApi.get(`/scheduler?customerId=${id}`);
    //console.log("Bookings", res.data.data.results);
    return res.data.data.results;
  },
  async getCurrentCustomerBooking() {
    const res = await cleanApi.get("/scheduler/current")
    console.log("Current Booking", res.data)
    return res.data.data.results
  }
};

export default customerAction;
