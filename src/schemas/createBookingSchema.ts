import { z } from 'zod';

const createBookingSchema: z.ZodType<CreateBookingRequest> = z.object({
  serviceTypeId: z.string(),
  location: z.string(),
  scheduledStartTime: z.string(),
  scheduledEndTime: z.string(),
  paymentMethod: z.string().optional(),
  contractContent: z.string(),
  bookingDetails: z.object({
    durationPriceId: z.string().optional(),
    bedroomCount: z.number().default(0),
    bathroomCount: z.number().default(0),
    kitchenCount: z.number().default(0),
    livingRoomCount: z.number().default(0),
    specialRequirements: z.string().optional(),
  }),
});

export default createBookingSchema;
