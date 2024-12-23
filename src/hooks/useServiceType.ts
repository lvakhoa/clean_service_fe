import serviceTypeAction from "@/apis/service-type.action";
import { updateServiceTypeData } from "@/schemas/serviceTypeSchema";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGetAllServiceTypes = (
  categoryId?: string,
  page?: number,
  limit?: number,
  enable: boolean | null = true,
) =>
  useQuery({
    queryKey: ["serviceTypes", categoryId, page, limit],
    queryFn: () => serviceTypeAction.getServiceTypes(categoryId, page, limit),
    enabled: !!enable,
    placeholderData: (previousData) => previousData,
  });

export const useUpdateServiceType = () =>
  useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: updateServiceTypeData;
    }) => {
      await serviceTypeAction.updateServiceType(id, data);
    },
  });

export default useGetAllServiceTypes;
