import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UserDto } from "../../database";

export interface IAuthedReq extends Request {
  user: JwtPayload|string;
}

export interface IJwtPayload extends UserDto {
  id: string;
  email: string;
  activated: boolean;
  created_at: Date;
}
