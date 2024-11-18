import { RoomType } from '@/configs/enum';
import { cleanApi } from '@/services/HttpClient';

const roomPricingAction = {
  async getAllRoomPricings(roomType?: RoomType, page?: number, limit?: number) {
    const response = await cleanApi.get<
      CleanSuccessResponseWrapper<
        PaginationResponseWrapper<RoomPricingResponse>
      >
    >('/manage/room-pricing', {
      params: {
        page,
        limit,
        roomType,
      },
    });
    return response.data.data;
  },
};

export default roomPricingAction;
