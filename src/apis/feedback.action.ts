import { cleanApi } from "@/services/HttpClient";

const feedbackAction = {
  async getAllFeedbacks() {
    const res = await cleanApi.get<CleanSuccessGetAllResponseWrapper<Feedback>>(
      "/manage/feedbacks"
    );
    return res.data;
  },
  async getFeedbackById(id: string) {
    const res = await cleanApi.get(`/manage/feedbacks/${id}`);
    return res.data;
  },
  async getFeedBackOfCurrentUser() {
    const res = await cleanApi.get<CleanSuccessGetAllResponseWrapper<Feedback>>(
      "/manage/feedbacks/customer"
    );
    return res.data;
  },
  async deleteFeedback(id: string) {
    const res = await cleanApi.delete(`/manage/feedbacks/${id}`);
    return res.data;
  },
};

export default feedbackAction;
