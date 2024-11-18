import serviceTypeAction from '@/apis/service-type.action';
import { useQuery } from '@tanstack/react-query';

const useGetAllServiceTypes = (
  page?: number,
  limit?: number,
  enable: boolean | null = true
) =>
  useQuery({
    queryKey: ['serviceTypes', page, limit],
    queryFn: () => serviceTypeAction.getServiceTypes(page, limit),
    enabled: !!enable,
    placeholderData: (previousData) => previousData,
  });

export default useGetAllServiceTypes;
