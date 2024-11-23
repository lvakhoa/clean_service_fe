import z from "zod";

const UpdateBookingSchema = z
  .object({
    status: z.number(),
    cancellationReason: z.string(),
    helperRating: z.number(),
  })
  .partial();

export default UpdateBookingSchema;

export type UpdateBookingDto = z.infer<typeof UpdateBookingSchema>;
