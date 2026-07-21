import jwt from "jsonwebtoken";
import { SECRET } from "../config/config";

export type JWTPayload = {
  userId: string;
  role: string;
  banned?: boolean;
};

export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JWTPayload {
  return jwt.verify(token, SECRET) as JWTPayload;
}
