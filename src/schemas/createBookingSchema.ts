import { z } from 'zod';

const createBookingSchema: z.ZodType<CreateBookingRequest> = z.object({
  serviceTypeId: z.string(),
  location: z.string(),
  scheduledStartTime: z.string(),
  scheduledEndTime: z.string(),
  paymentMethod: z.string().optional(),
  contractContent: z.string(),
  bookingDetails: z.object({
    durationPriceId: z.string(),
    bedroomCount: z.number(),
    bathroomCount: z.number(),
    kitchenCount: z.number(),
    livingRoomCount: z.number(),
    specialRequirements: z.string().optional(),
  }),
});
