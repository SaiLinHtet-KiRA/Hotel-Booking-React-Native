export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface PopulatedRoom {
  _id: string;
  number: number;
  type: string;
  capacity: number;
  price: number;
  photo: string[];
}

export default interface Booking {
  _id: string;
  user: string;
  room: PopulatedRoom;
  startDate: string;
  endDate: string;
  status: BookingStatus;
  price: number;
}

export type BookingDTO = {
  room?: string;
  startDate?: Date;
  endDate?: Date;
  status?: BookingStatus;
};
