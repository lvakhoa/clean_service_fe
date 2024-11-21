import serviceTypeAction from '@/apis/service-type.action';
import { useQuery } from '@tanstack/react-query';

const useGetAllServiceTypes = (
  categoryId?: string,
  page?: number,
  limit?: number,
  enable: boolean | null = true
) =>
  useQuery({
    queryKey: ['serviceTypes', categoryId, page, limit],
    queryFn: () => serviceTypeAction.getServiceTypes(categoryId, page, limit),
    enabled: !!enable,
    placeholderData: (previousData) => previousData,
  });

export default useGetAllServiceTypes;
