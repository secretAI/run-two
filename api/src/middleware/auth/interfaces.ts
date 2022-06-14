import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UserDto } from "../../database";

export interface IAuthedReq extends Request {
  user: JwtPayload|string;
}

export interface IJwtPayload {
  dto: {
    id: string;
    email: string;
    activated: boolean;
    created_at: Date;
  };
  iat: number;
  exp: number;
}
