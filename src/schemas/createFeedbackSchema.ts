import z from "zod";

const createFeedbackSchema = z.object({
  bookingId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  rating: z.number(),
});

export default createFeedbackSchema;
export type CreateFeedbackDto = z.infer<typeof createFeedbackSchema>;
