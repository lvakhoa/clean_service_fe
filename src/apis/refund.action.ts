import { cleanApi } from "@/services/HttpClient";

const refundAction = {
  async getAllRefunds() {
    const res = await cleanApi.get<CleanSuccessGetAllResponseWrapper<Refund>>(
      "/manage/refunds"
    );
    return res.data;
  },
  async getRefundById(id: string) {
    const res = await cleanApi.get(`/manage/refunds/${id}`);
    return res.data;
  },
  async deleteRefund(id: string) {
    const res = await cleanApi.delete(`/manage/refunds/${id}`);
    return res.data;
  },
  async updateRefund(id: string, data: any) {
    const res = await cleanApi.put(`/manage/refunds/${id}`, data);
    return res;
  },
};

export default refundAction;
