import { Gender } from "./enum";

type CustomerRowProps = {
  stt: string;
  id: string;
  name: string;
  address: string;
  phone: string;
  email?: string;
  isLoading: boolean;
};

type Customer = {
  id: string;
  userType: UserType;
  profilePicture?: string;
  gender?: string;
  fullName: string;
  dateOfBirth: string;
  address?: string;
  phoneNumber?: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type { CustomerRowProps, Customer };
