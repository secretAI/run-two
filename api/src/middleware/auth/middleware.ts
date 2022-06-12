import { ApplicationError, HTTPStatus } from "../../utils/etc";
import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { IAuthedReq, IJwtPayload } from "./interfaces";
import { getDotEnv } from "../../utils/env";

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  try {
    const token = req.cookies["reToken"];
    if(!token)
      throw new ApplicationError(HTTPStatus.NOT_FOUND, "Token not found");
    const validation = <IJwtPayload["id"]>jwt.verify(token, getDotEnv("jwt_secret_refresh"));
    if(!validation) 
      return next(new ApplicationError(HTTPStatus.UNAUTHORIZED, "Token isn't validated"));
    req.app.locals["user"] = validation;

    next(); 
  }
  catch(err) {
    return next(new ApplicationError(HTTPStatus.UNAUTHORIZED, "Auth to proceed"));
  }
}