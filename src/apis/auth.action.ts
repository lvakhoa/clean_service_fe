import { cleanApi, cleanClient } from "@/services/HttpClient";
import { AxiosRequestConfig } from "axios";

const authAction = {
  async logOut(config?: AxiosRequestConfig) {
    const res = await cleanApi.delete<CleanSuccessResponseWrapper>(
      "/auth/logout",
      config
    );
    return res.data;
  },
  async decodeCookie(config?: AxiosRequestConfig) {
    const res = await cleanApi.post<CleanSuccessResponseWrapper<DecodedToken>>(
      "/auth/decode",
      {},
      config
    );
    return res.data;
  },
  async getProfile(config?: AxiosRequestConfig) {
    const res = await cleanApi.get<CleanSuccessResponseWrapper<Profile>>(
      "/auth/me",
      config
    );
    return res.data.data;
  }
};

export default authAction;
