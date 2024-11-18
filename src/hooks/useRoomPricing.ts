import roomPricingAction from '@/apis/room-pricing.action';
import { RoomType } from '@/configs/enum';
import { useQueries } from '@tanstack/react-query';

export const useGetAllRoomPricings = (serviceTypeId?: string) =>
  useQueries({
    queries: [
      {
        queryKey: ['roomPricings', RoomType.Bathroom],
        queryFn: () => roomPricingAction.getAllRoomPricings(RoomType.Bathroom),
        enabled: !!serviceTypeId,
      },
      {
        queryKey: ['roomPricings', RoomType.Bedroom],
        queryFn: () => roomPricingAction.getAllRoomPricings(RoomType.Bedroom),
        enabled: !!serviceTypeId,
      },
      {
        queryKey: ['roomPricings', RoomType.Kitchen],
        queryFn: () => roomPricingAction.getAllRoomPricings(RoomType.Kitchen),
        enabled: !!serviceTypeId,
      },
      {
        queryKey: ['roomPricings', RoomType.LivingRoom],
        queryFn: () =>
          roomPricingAction.getAllRoomPricings(RoomType.LivingRoom),
        enabled: !!serviceTypeId,
      },
    ],
  });
