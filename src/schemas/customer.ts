import * as z from "zod";
import { Gender } from "@/types/enum";

const customerSchema = z.object({
  profilePicture: z.string(),
  gender: z.string(),
  fullName: z.string().max(150),
  dateOfBirth: z.string(),
  identityCard: z.string(),
  address: z.string().max(255),
  phoneNumber: z.string().max(20),
  numberOfViolation: z.number(),
  notificationToken: z.string(),
  email: z.string().max(255),
});

const partialCustomerSchema = customerSchema.partial();

export { customerSchema, partialCustomerSchema };
