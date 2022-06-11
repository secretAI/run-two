import { Request } from "express";
import { Jwt } from "jsonwebtoken";

export interface ISignUpReq extends Request{
  email: string;
  password: string;
}

export interface ILogInreq extends ISignUpReq {}

export type JwtTokenPair = {
  access: string;
  refresh: string;
}
