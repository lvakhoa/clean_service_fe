import durationPricingAction from '@/apis/duration-pricing.action';
import { useQuery } from '@tanstack/react-query';

export const useGetAllDurationPrices = (serviceTypeId?: string) =>
  useQuery({
    queryKey: ['durationPrice', 'serviceType', serviceTypeId],
    queryFn: () => durationPricingAction.getAllDurationPrices(serviceTypeId),
    enabled: !!serviceTypeId,
  });
