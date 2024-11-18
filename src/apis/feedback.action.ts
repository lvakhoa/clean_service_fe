import { cleanApi } from "@/services/HttpClient";

const feedbackAction = {
  async getAllFeedbacks(page?: number, limit?: number) {
    const res = await cleanApi.get<
      CleanSuccessResponseWrapper<PaginationResponseWrapper<Feedback>>
    >("/manage/feedbacks", {
      params: {
        page,
        limit,
      },
    });
    return res.data;
  },
  async getFeedbackById(id: string) {
    const res = await cleanApi.get(`/manage/feedbacks/${id}`);
    return res.data;
  },
  async getFeedBackOfCurrentUser(page?: number, limit?: number) {
    const res = await cleanApi.get<
      CleanSuccessResponseWrapper<PaginationResponseWrapper<Feedback>>
    >("/manage/feedbacks/customer", {
      params: {
        page,
        limit,
      },
    });
    return res.data;
  },
  async deleteFeedback(id: string) {
    const res = await cleanApi.delete(`/manage/feedbacks/${id}`);
    return res.data;
  },
};

export default feedbackAction;
