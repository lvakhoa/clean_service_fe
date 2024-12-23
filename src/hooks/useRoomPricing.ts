import roomPricingAction from "@/apis/room-pricing.action";
import { RoomType } from "@/configs/enum";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { updateRoomPricingData } from "@/schemas/roomPricingSchema";

export const useGetAllRoomPricings = (serviceTypeId?: string) =>
  useQueries({
    queries: [
      {
        queryKey: [
          "roomPricings",
          RoomType.Bathroom,
          "serviceType",
          serviceTypeId,
        ],
        queryFn: () =>
          roomPricingAction.getAllRoomPricings(
            RoomType.Bathroom,
            serviceTypeId,
          ),
        enabled: !!serviceTypeId,
      },
      {
        queryKey: [
          "roomPricings",
          RoomType.Bedroom,
          "serviceType",
          serviceTypeId,
        ],
        queryFn: () =>
          roomPricingAction.getAllRoomPricings(RoomType.Bedroom, serviceTypeId),
        enabled: !!serviceTypeId,
      },
      {
        queryKey: [
          "roomPricings",
          RoomType.Kitchen,
          "serviceType",
          serviceTypeId,
        ],
        queryFn: () =>
          roomPricingAction.getAllRoomPricings(RoomType.Kitchen, serviceTypeId),
        enabled: !!serviceTypeId,
      },
      {
        queryKey: [
          "roomPricings",
          RoomType.LivingRoom,
          "serviceType",
          serviceTypeId,
        ],
        queryFn: () =>
          roomPricingAction.getAllRoomPricings(
            RoomType.LivingRoom,
            serviceTypeId,
          ),
        enabled: !!serviceTypeId,
      },
    ],
  });

export const useGetRoomPricing = () =>
  useQuery({
    queryKey: ["allRoomPricings"],
    queryFn: () => {
      return roomPricingAction.getAllRoomPricings();
    },
  });

export const useUpdateRoomPricing = () =>
  useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: updateRoomPricingData;
    }) => {
      await roomPricingAction.updateRoomPricing(id, data);
    },
  });
