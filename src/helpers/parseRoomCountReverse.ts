const parseRoomCountReverse = (roomType: string): number => {
  if (roomType === 'Studio') return 0;
  return parseInt(roomType);
};

export default parseRoomCountReverse;
