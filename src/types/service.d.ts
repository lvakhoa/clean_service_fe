type DurationPrice = {
  id: string;
  serviceTypeId: string;
  serviceTypeName: string;
  durationHours: number;
  priceMultiplier: string;
};

type DurationPriceRowProps = {
  id: string;
  serviceTypeId: string;
  serviceTypeName: string;
  durationHours: number;
  priceMultiplier: number; // decimal
  onRowClick: (id: string) => void;
  isLoading?: boolean;
};

type RoomPricingRowProps = {
  id: string;
  serviceTypeId: string;
  serviceTypeName: string;
  roomCount: number;
  roomType: RoomType;
  additionalPrice: number;
  createdAt: string;
  onRowClick: (id: string) => void;
  isLoading?: boolean;
};

type RoomPricing = {
  id: string;
  serviceTypeId: string;
  title: string;
  additionalPrice: number;
  multiplyPrice: number;
  serviceType?: {
    name: string;
  };
};

type ServiceCategory = {
  id: string;
  name: string;
  description?: string;
  isActive?: boolean;
  createdAt?: string;
};

type ServiceType = {
  id: string;
  categoryId: string;
  name: string;
  description?: string;
  basePrice: number;
  createdAt: string;
  isActive: boolean;
};

type ServiceTypeRowProps = {
  id: string;
  categoryId: string;
  name: string;
  description?: string;
  basePrice: number;
  createdAt: string;
  isActive: boolean;
  onRowClick: (id: string) => void;
  isLoading?: boolean;
  category: {
    id: string;
    name: string;
    description?: string;
    createdAt: string;
    isActive: boolean;
  };
};
