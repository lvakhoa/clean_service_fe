import { updateServiceTypeData } from "@/schemas/serviceTypeSchema";
import { cleanApi } from "@/services/HttpClient";

const serviceTypeAction = {
  async getServiceTypes(categoryId?: string, page?: number, limit?: number) {
    const response = await cleanApi.get<
      CleanSuccessResponseWrapper<
        PaginationResponseWrapper<ServiceTypeResponse>
      >
    >("/serviceType/all", {
      params: {
        categoryId,
        page,
        limit,
      },
    });
    return response.data.data;
  },
  async updateServiceType(id: string, data: updateServiceTypeData) {
    const response = await cleanApi.patch<CleanSuccessResponseWrapper>(
      `/serviceType/update/${id}`,
      data,
    );
    return response.data.data;
  },
};

export default serviceTypeAction;
