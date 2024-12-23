import durationPricingAction from "@/apis/duration-pricing.action";
import { updateDurationPriceData } from "@/schemas/durationPriceSchema";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllDurationPrices = (serviceTypeId?: string) =>
  useQuery({
    queryKey: ["durationPrice", "serviceType", serviceTypeId],
    queryFn: () => durationPricingAction.getAllDurationPrices(serviceTypeId),
    enabled: !!serviceTypeId,
  });

export const useGetDurationPrice = () =>
  useQuery({
    queryKey: ["allDurationPrice"],
    queryFn: () => durationPricingAction.getAllDurationPrices(),
  });

export const useUpdateDurationPrice = () =>
  useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: updateDurationPriceData;
    }) => {
      await durationPricingAction.updateDurationPrice(id, data);
    },
  });
