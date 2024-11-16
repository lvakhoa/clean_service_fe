type Refund = {
  id: string;
  helperId?: string;
  helperName?: string;
  customerId: string;
  customerName: string;
  reason: string;
  status: string;
  createdAt: string;
  resolvedAt?: string;
};
