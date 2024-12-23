import { RoomType } from "@/configs/enum";
import { updateDurationPriceData } from "@/schemas/durationPriceSchema";
import { cleanApi } from "@/services/HttpClient";

const durationPricingAction = {
  async getAllDurationPrices(
    serviceTypeId?: string,
    page?: number,
    limit?: number,
  ) {
    const response = await cleanApi.get<
      CleanSuccessResponseWrapper<
        PaginationResponseWrapper<DurationPriceResponse>
      >
    >("/manage/duration-price", {
      params: {
        page,
        limit,
        serviceTypeId,
      },
    });
    return response.data.data;
  },
  async updateDurationPrice(id: string, data: updateDurationPriceData) {
    const response = await cleanApi.patch<CleanSuccessResponseWrapper>(
      `/manage/duration-price/${id}`,
      data,
    );
    return response.data.data;
  },
};

export default durationPricingAction;
