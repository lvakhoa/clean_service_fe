import { UpdateHelperDto } from "@/schemas/updateHelperSchema";
import { UpdateUserDto } from "@/schemas/updateUserSchema";
import { cleanApi, cleanClient } from "@/services/HttpClient";

const helperAction = {
  async getAllHelpers(page?: number, limit?: number) {
    const res = await cleanApi.get<
      CleanSuccessResponseWrapper<PaginationResponseWrapper<Helper>>
    >("/manage/helpers", {
      params: {
        page,
        limit,
      },
    });
    return res.data;
  },
  async getHelperById(id: string) {
    const res = await cleanApi.get<CleanSuccessResponseWrapper<Helper>>(
      `/manage/helpers/${id}`
    );
    return res.data;
  },
  async updateUserHelper(id: string, data: UpdateUserDto) {
    const res = await cleanApi.patch<CleanSuccessResponseWrapper>(
      `/auth/user/${id}`,
      data
    );
    return res.data.data;
  },
  async updateHelper(id: string, data: UpdateHelperDto) {
    const res = await cleanApi.patch<CleanSuccessResponseWrapper>(
      `/auth/helper/${id}`,
      data
    );
    return res.data.data;
  },
  async updateHelperIdCard(id: string, data: any) {
    const res = await cleanApi.patch<CleanSuccessResponseWrapper>(
      `/manage/users/${id}/id-card`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  },
  async updateHelperProfilePicture(id: string, data: any) {
    const res = await cleanApi.patch<CleanSuccessResponseWrapper>(
      `/manage/users/${id}/profile-picture`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
  async updateHelperResume(id: string, data: any) {
    const res = await cleanApi.patch<CleanSuccessResponseWrapper>(
      `/manage/helpers/${id}/resume`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
  async getCurrentHelper() {
    const res = await cleanApi.get<CleanSuccessResponseWrapper<Helper>>(
      "/manage/helpers/me"
    );
    return res.data;
  },
};

export default helperAction;
