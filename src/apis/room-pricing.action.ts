import { RoomType } from "@/configs/enum";
import { updateRoomPricingData } from "@/schemas/roomPricingSchema";
import { cleanApi } from "@/services/HttpClient";

const roomPricingAction = {
  async getAllRoomPricings(
    roomType?: RoomType,
    serviceTypeId?: string,
    page?: number,
    limit?: number,
  ) {
    const response = await cleanApi.get<
      CleanSuccessResponseWrapper<
        PaginationResponseWrapper<RoomPricingResponse>
      >
    >("/manage/room-pricing", {
      params: {
        page,
        limit,
        roomType,
        serviceTypeId,
      },
    });
    return response.data.data;
  },
  async updateRoomPricing(id: string, data: updateRoomPricingData) {
    const response = await cleanApi.patch<CleanSuccessResponseWrapper>(
      `/manage/room-pricing/${id}`,
      data,
    );
    return response.data.data;
  },
};

export default roomPricingAction;
