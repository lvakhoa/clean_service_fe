// API-related types
type CreateBookingRequest = {
  serviceTypeId: string;
  location: string;
  scheduledStartTime: string;
  scheduledEndTime: string;
  paymentMethod?: string;
  contractContent: string;
  bookingDetails: {
    durationPriceId?: string;
    bedroomCount?: number;
    bathroomCount?: number;
    kitchenCount?: number;
    livingRoomCount?: number;
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

type Booking = {
  id: string;
  customerId: string;
  helperId: string;
  serviceTypeId: string;
  location: string;
  scheduledStartTime: string;
  scheduledEndTime: string;
  status: "Pending" | "Confirmed" | "InProgress" | "Completed" | "Cancelled";
  cancellationReason: ?string;
  totalPrice: number;
  paymentStatus: "Pending" | "Paid" | "Refunded";
  paymentMethod: ?string;
  helperRating: ?number;
  createdAt: string;
  updatedAt: string;
  customer: {
    id: string;
    gender: "Male" | "Female" | "Other";
    fullName: string;
    identityCard: ?string;
    address: string;
    phoneNumber: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
  helper: {
    id: string;
    experienceDescription: ?string;
    servicesOffered: [];
    hourlyRate: number;
    averageRating: number;
    user: {
      id: string;
      gender: "Male" | "Female" | "Other";
      fullName: string;
      identityCard: ?string;
      address: ?string;
      phoneNumber: string;
      email: string;
      createAt: string;
      updatedAt: string;
    };
  };
  serviceType: {
    id: string;
    categoryId: string;
    name: string;
    description: ?string;
    basePrice: number;
    createdAt: string;
  };
  bookingDetails: {
    id: string;
    bookingId: string;
    durationPriceId: string;
    bedroomCount: number;
    bathroomCount: number;
    kitchenCount: number;
    livingRoomCount: number;
    specialRequirements: ?string;
    createdAt: string;
  };
  feedbacks: {
    id: string;
    bookingId: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  }[];
  refunds: [];
};
