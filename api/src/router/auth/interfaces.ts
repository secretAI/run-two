import { Request } from "express";

export interface ISignUpReq extends Request{
  email: string;
  password: string;
}

export interface ILogInreq extends ISignUpReq {}
