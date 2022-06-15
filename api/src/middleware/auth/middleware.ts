import { ApplicationError, HTTPStatus } from "../../utils/etc";
import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { getDotEnv } from "../../utils/env";
import { AuthService } from "../../service/auth/";
import { JwtTokenPair } from "../../router/auth/interfaces";
import { RefreshToken, TokenInstance } from "../../database";
import { testAcc } from "../../test/unit/";

export async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    switch(!!authHeader) {
      case true:
        const accessToken: JwtTokenPair["access"] = authHeader.split(" ")[1];
        const validation: string|jwt.JwtPayload = AuthService.validateToken(accessToken, getDotEnv("jwt_secret_access"));
        if(!validation) 
          console.log("Access Token is not validated");
        console.log("Took token from Auth-Header*");

        req.app.locals.tokens.access = validation;
      case false: 
        const refreshToken: RefreshToken = await TokenInstance.getRefreshTokenByEmail(testAcc.email) || req.cookies["reToken"];
        const _validation: string|jwt.JwtPayload = AuthService.validateToken(refreshToken.token, getDotEnv("jwt_secret_refresh"));
        if(!_validation) 
          console.log("Refresh token is not validated");
        console.log("Took token from Server Cookies");

        req.app.locals.tokens.refresh = _validation;
      default: 
        return next(new ApplicationError(HTTPStatus.UNAUTHORIZED, "Auth to proceed"));
    } 
  } finally {
    next();
  }
}