import { CreateRefundDto } from "@/schemas/createRefundSchema";
import { cleanApi } from "@/services/HttpClient";

const refundAction = {
  async getAllRefunds(page?: number, limit?: number) {
    const res = await cleanApi.get<
      CleanSuccessResponseWrapper<PaginationResponseWrapper<Refund>>
    >("/manage/refunds", {
      params: {
        page,
        limit,
      },
    });
    return res.data;
  },
  async getRefundById(id: string) {
    const res = await cleanApi.get<CleanSuccessResponseWrapper<Refund>>(
      `/manage/refunds/${id}`
    );
    return res.data;
  },
  async getRefundOfCurrentUser(page?: number, limit?: number) {
    const res = await cleanApi.get<
      CleanSuccessResponseWrapper<PaginationResponseWrapper<Refund>>
    >("/manage/refunds/customer", {
      params: {
        page,
        limit,
      },
    });
    return res.data;
  },
  async deleteRefund(id: string) {
    const res = await cleanApi.delete<CleanSuccessResponseWrapper>(
      `/manage/refunds/${id}`
    );
    return res.data;
  },
  async updateRefund(id: string, data: any) {
    const res = await cleanApi.patch<CleanSuccessResponseWrapper>(
      `/manage/refunds/${id}`,
      data
    );
    return res;
  },
  async createRefund(data: CreateRefundDto) {
    const res = await cleanApi.post<CleanSuccessResponseWrapper>(
      "/booking/refund",
      data
    )
    return res
  }
};

export default refundAction;
