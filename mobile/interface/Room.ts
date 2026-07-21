import { ImagePickerAsset } from "expo-image-picker";

export type RoomType =
  | "single bed"
  | "double bed"
  | "family"
  | "deluxe"
  | "suite";

export type RoomStatus = "available" | "busy" | "maintenance";

export default interface Room {
  _id: string;
  number: number;
  type: RoomType;
  photo: string[];
  capacity: number;
  price: number;
  status: RoomStatus;
}

export type RoomDTO = {
  number?: number;
  type?: RoomType;
  photo?: ImagePickerAsset[];
  capacity?: number;
  price?: number;
  status?: RoomStatus;
};
