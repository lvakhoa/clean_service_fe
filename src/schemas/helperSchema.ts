import z from "zod";

const adminHelperSchema = z.object({
  experienceDescription: z.string(),
  resumeUploadedFile: z.instanceof(File),
  // servicesOffered: z.string(),
  hourlyRate: z.string(),
});

const partialAdminHelperSchema = adminHelperSchema.partial();

export type updateAdminHelperData = z.infer<
  ReturnType<typeof adminHelperSchema.partial>
>;

const helperSchema = z.object({
  experienceDescription: z.string(),
  resumeUploadedFile: z.instanceof(File),
  // servicesOffered: z.string(),
});

const partialHelperSchema = helperSchema.partial();

export type updateHelperData = z.infer<typeof partialHelperSchema>;

export {
  adminHelperSchema,
  partialAdminHelperSchema,
  helperSchema,
  partialHelperSchema,
};
