import z from "zod";

const createRefundSchema = z.object({
  bookingId: z.string(),
  reason: z.string(),
});

export default createRefundSchema;
export type CreateRefundDto = z.infer<typeof createRefundSchema>;
