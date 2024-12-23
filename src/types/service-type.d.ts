type ServiceTypeResponse = {
  id: string;
  categoryId: string;
  name: string;
  description?: string;
  basePrice: number; // decimal
  createdAt: string;
  isActive: boolean;
  category: {
    id: string;
    name: string;
    description?: string;
    createdAt: string;
    isActive: boolean;
  };
  roomPricing: {
    id: string;
    serviceTypeId: string;
    roomType: string;
    roomCount: int;
    additionalPrice: number; // decimal
    createdAt: string;
  };
  durationPrice: {
    id: string;
    serviceTypeId: string;
    durationHours: int;
    priceMultiplier: number; // decimal
    createdAt: string;
  };
};
