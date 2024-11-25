import {
  updateAdminHelperData,
  updateHelperData,
} from "@/schemas/helperSchema";
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
      `/manage/helpers/${id}`,
    );
    return res.data;
  },
  async updateHelper(id: string, data: updateAdminHelperData) {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value == null) return;

      if (value instanceof File) {
        formData.append(key, value);
      } else if (typeof value === "number") {
        formData.append(key, (value as number).toString());
      } else {
        formData.append(key, value);
      }
    });

    const res = await cleanApi.patch<CleanSuccessResponseWrapper>(
      `/manage/helpers/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res.data.data;
  },
  async updateCurrentHelper(data: updateHelperData) {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value == null) return;

      if (value instanceof File) {
        formData.append(key, value);
      } else if (typeof value === "number") {
        formData.append(key, (value as number).toString());
      } else {
        formData.append(key, value);
      }
    });

    const res = await cleanApi.patch<CleanSuccessResponseWrapper>(
      "auth/helper/me",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res.data.data;
  },
  async getCurrentHelper() {
    const res =
      await cleanApi.get<CleanSuccessResponseWrapper<Helper>>(
        "/auth/helper/me",
      );
    return res.data;
  },
};

export default helperAction;
