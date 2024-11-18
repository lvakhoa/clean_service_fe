import { BookingStatus } from "@/configs/enum";
import { Gender } from "./enum";

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

type Booking = {
  id: string
  customerId: string
  helperId: string
  serviceTypeId: string
  location: string
  scheduledStartTime: string
  scheduledEndTime: string
  status: BookingStatus
  totalPrice: number
  paymentStatus: string
  paymentMethod: ?string
  helperRating: ?number
  createdAt: string
  updatedAt: string
  customer: {
    id: string
    gender: Gender
    fullName: string
    identityCard: ?string
    address: string
    phoneNumber: string
    email: string
    createdAt: string
    updatedAt: string
  }
  helper: {
    id: string
    experienceDescription: ?string
    servicesOffered: []
    hourlyRate: number
    averageRating: number
    user: {
      id: string
      gender: Gender
      fullName: string
      identityCard: ?string
      address: ?string
      phoneNumber: string
      email: string
      createAt: string
      updatedAt: string
    }
  }
  serviceType: {
    id: string
    categoryId: string
    name: string
    description: ?string
    basePrice: number
    createdAt: string
  },
  bookingDetails: {
    id: string
    bookingId: string
    durationPriceId: string
    bedroomCount: number
    bathroomCount: number
    kitchenCount: number
    livingRoomCount: number
    specialRequirements: ?string
    createdAt: string
  },
  feedbacks: [],
  refunds: []
}
