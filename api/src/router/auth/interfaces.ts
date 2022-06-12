import { Request } from "express";
import { Jwt } from "jsonwebtoken";

export interface IAuthReq extends Request{
  email: string;
  password: string;
}

export type JwtTokenPair = {
  access: string;
  refresh: string;
}
