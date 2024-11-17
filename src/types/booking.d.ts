// API-related types
type CreateBookingRequest = {
  serviceTypeId: string;
  location: string;
  scheduledStartTime: string;
  scheduledEndTime: string;
  paymentMethod?: string;
  contractContent: string;
  bookingDetails: {
    durationPriceId: string;
    bedroomCount: number;
    bathroomCount: number;
    kitchenCount: number;
    livingRoomCount: number;
    specialRequirements?: string;
  };
};

type CreateBookingResponse = {
  paymentLink: string;
};

// UI-related types
type SelectedDay = {
  day: number;
  month: number;
  year: number;
};

type SelectedTime = {
  hour: number;
  minute: number;
};
