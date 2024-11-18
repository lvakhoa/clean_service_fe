const parseRoomCount = (roomCount: number): string => {
  if (roomCount === 0) return 'Studio';
  return roomCount.toString();
};

export default parseRoomCount;
