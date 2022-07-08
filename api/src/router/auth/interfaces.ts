import { Request } from "express";

export interface IAuthReq extends Request{
  email: string;
  password: string;
}

export type JwtTokenPair = {
  access: string;
  refresh: string;
}

export interface ICheckActivationReq extends Request {
  email: string;
}
