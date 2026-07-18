import type User from "./User";

export interface RoomDTO {
  startTime: Date;
  endTime: Date;
}

export default interface Room extends RoomDTO {
  _id: string;
  id: number;
  userId: User;
  createdAt: Date;
  UpdatedAt: Date;
}
