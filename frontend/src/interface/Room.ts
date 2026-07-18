export interface RoomDTO {
  startTime: Date;
  endTime: Date;
  userId: string;
}

export default interface Room extends RoomDTO {
  _id: string;
  id: number;
  createdAt: Date;
  UpdatedAt: Date;
}
