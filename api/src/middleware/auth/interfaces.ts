import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface IAuthedReq extends Request {
  user: JwtPayload|string;
}

export interface IJwtPayload {
  id: string;
  email?: string;
  activated?: boolean;
  created_at?: Date;
}
