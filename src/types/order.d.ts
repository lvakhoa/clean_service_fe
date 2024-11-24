type Order = {
  id: string;
  customerName: string;
  helperName: string;
  location: string;
  scheduledStartTime: Date;
  scheduledEndTime: Date;
  helperRating?: number | null;
  totalPrice: number;
  status: "Pending" | "In Progress" | "Cancelled" | "Completed";
};

type OrderRowProps = {
  // id: string;
  // customerName: string;
  // helperName: string;
  // location: string;
  // scheduledStartTime: Date;
  // scheduledEndTime: Date;
  // helperRating?: number | null;
  // totalPrice: number;
  // status: 'Pending' | 'In Progress' | 'Cancelled' | 'Completed';
  booking: Booking;
};
