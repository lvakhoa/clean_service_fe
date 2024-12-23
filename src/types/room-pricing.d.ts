type RoomPricingResponse = {
  id: string;
  serviceTypeId: string;
  serviceTypeName: string;
  roomCount: number;
  roomType: RoomType;
  additionalPrice: number; // decimal
  createdAt: string;
};
