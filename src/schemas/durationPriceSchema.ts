import z from "zod";

const durationPriceSchema = z.object({
  serviceTypeId: z.string().min(1, "Service type must be selected"),
  durationHours: z.coerce
    .number()
    .nonnegative("Multiply price must be non-negative"),
  priceMultiplier: z.coerce
    .number()
    .nonnegative("Multiply price must be non-negative"),
  createdAt: z.coerce.date(),
});

const partialDurationPriceSchema = durationPriceSchema.partial();

export type createDurationPriceData = z.infer<typeof durationPriceSchema>;
export type updateDurationPriceData = z.infer<
  typeof partialDurationPriceSchema
>;

export { durationPriceSchema, partialDurationPriceSchema };
