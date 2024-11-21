import { cleanApi } from '@/services/HttpClient';

const serviceTypeAction = {
  async getServiceTypes(categoryId?: string, page?: number, limit?: number) {
    const response = await cleanApi.get<
      CleanSuccessResponseWrapper<
        PaginationResponseWrapper<ServiceTypeResponse>
      >
    >('/serviceType/all', {
      params: {
        categoryId,
        page,
        limit,
      },
    });
    return response.data.data;
  },
};

export default serviceTypeAction;
