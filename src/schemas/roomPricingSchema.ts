import { create } from "domain";
import z from "zod";

const roomPricingSchema = z.object({
  serviceTypeId: z.string().min(1, "Service type must be selected"),
  roomType: z.string().min(1, "Room type must be selected"),
  roomCount: z.coerce.number().nonnegative("Room count must be non-negative"),
  title: z.string().min(1, "Title cannot be empty"),
  additionalPrice: z.coerce
    .number()
    .nonnegative("Additional price must be non-negative"),
  createdAt: z.coerce.date(),
});

const partialRoomPricingSchema = roomPricingSchema.partial();

export type createRoomPricingData = z.infer<typeof roomPricingSchema>;
export type updateRoomPricingData = z.infer<typeof partialRoomPricingSchema>;

export { roomPricingSchema, partialRoomPricingSchema };
