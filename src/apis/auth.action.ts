import { cleanApi, cleanClient } from "@/services/HttpClient";
import { AxiosRequestConfig } from "axios";

type SignupAccountDto = {
  email: string;
  fullName: string;
  phoneNumber: string;
  password: string;
  userType: string;
};

const authAction = {
  async logOut(config?: AxiosRequestConfig) {
    const res = await cleanApi.delete<CleanSuccessResponseWrapper>(
      "/auth/logout",
      config,
    );
    return res.data;
  },
  async decodeCookie(config?: AxiosRequestConfig) {
    const res = await cleanApi.post<CleanSuccessResponseWrapper<DecodedToken>>(
      "/auth/decode",
      {},
      config,
    );
    return res.data;
  },
  async getProfile(config?: AxiosRequestConfig) {
    const res = await cleanApi.get<CleanSuccessResponseWrapper<Profile>>(
      "/auth/me",
      config,
    );
    return res.data.data;
  },
  async signup(data: SignupAccountDto, config?: AxiosRequestConfig) {
    const res = await cleanApi.post<CleanSuccessResponseWrapper>(
      "/auth/signup/mobile",
      data,
      config,
    );
    return res.data;
  },
};

export default authAction;
