type ServiceTypeResponse = {
  id: string;
  categoryId: string;
  name: string;
  description?: string;
  basePrice: string; // decimal
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
    additionalPrice: string; // decimal
    createdAt: string;
  };
  durationPrice: {
    id: string;
    serviceTypeId: string;
    durationHours: int;
    priceMultiplier: string; // decimal
    createdAt: string;
  };
};
