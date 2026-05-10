export type BookingType = "viewing" | "test-drive" | "rental" | "inquiry";
export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export type Booking = {
  id: string;
  type: BookingType;
  status: BookingStatus;
  vehicleSlug: string;
  dealerId: string;
  userId: string;
  from: string;
  to?: string;
  notes?: string;
  createdAt: string;
};
