import * as z from "zod";

const adminCustomerSchema = z.object({
  profilePictureFile: z.instanceof(File),
  gender: z.string(),
  fullName: z.string().max(150),
  dateOfBirth: z.string(),
  idCardFile: z.instanceof(File),
  address: z.string().max(255),
  phoneNumber: z.string().max(20),
  numberOfViolation: z.number(),
  notificationToken: z.string(),
  email: z.string().max(255),
});

const partialAdminCustomerSchema = adminCustomerSchema.partial();

export type adminUpdateCustomerData = z.infer<
  typeof partialAdminCustomerSchema
>;

const customerSchema = z.object({
  profilePictureFile: z.instanceof(File),
  gender: z.string(),
  fullName: z.string().max(150),
  dateOfBirth: z.string(),
  idCardFile: z.instanceof(File),
  address: z.string().max(255),
  phoneNumber: z.string().max(20),
  email: z.string().max(255),
});

const partialCustomerSchema = customerSchema.partial();

export type updateCustomerData = z.infer<typeof partialCustomerSchema>;

export {
  adminCustomerSchema,
  partialAdminCustomerSchema,
  customerSchema,
  partialCustomerSchema,
};
