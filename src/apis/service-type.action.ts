import { cleanApi } from '@/services/HttpClient';

const serviceTypeAction = {
  async getServiceTypes(page?: number, limit?: number) {
    const response = await cleanApi.get<
      CleanSuccessResponseWrapper<
        PaginationResponseWrapper<ServiceTypeResponse>
      >
    >('/serviceType/all', {
      params: {
        page,
        limit,
      },
    });
    return response.data.data;
  },
};

export default serviceTypeAction;
