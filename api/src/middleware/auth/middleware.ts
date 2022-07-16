import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ApplicationError, HTTPStatus } from "../../utils/etc";
import { getDotEnv } from "../../utils/env-var";
import { AuthService } from "../../service/auth/";
import { JwtTokenPair } from "../../service/auth/";
import { RefreshTokenInstance } from "../../database";

export async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    
    switch(!!authHeader) {
      case true:
        const accessToken: JwtTokenPair["access"] = authHeader.split(" ")[1];
        const validation: string|jwt.JwtPayload = AuthService.validateToken({
          token: accessToken,
          secret: getDotEnv("jwt_secret_access")
        });
        if(!validation) 
          console.error("Access Token is not validated");
        
        req.app.locals.accToken = validation;
      case false: 
        const refreshToken: JwtTokenPair["refresh"] = req.cookies["RETOKEN"];
        const _validation: string|jwt.JwtPayload = AuthService.validateToken({
          token: refreshToken,
          secret: getDotEnv("jwt_secret_refresh")
        });
        if(!_validation) 
          console.error("Refresh token is not validated");
        
        req.app.locals.reToken= _validation;
    } 

    next();
  } catch {
    return next(new ApplicationError(HTTPStatus.UNAUTHORIZED, "Auth to proceed"));
  }
}