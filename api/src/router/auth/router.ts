import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { ApplicationError, HTTPStatus } from "../../utils/etc";
import { IAuthReq, ICheckActivationReq, JwtTokenPair } from "./";
import { User } from "../../database/";
import { AuthService } from "../../service/auth/";

export class AuthRouter {
  private readonly router: Router;
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.router = Router();
    this.baseUrl = baseUrl;
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.post(
      `${this.baseUrl}/signup`, 
      body("email").isEmail(),
      body("password").isLength({ min: 4, max: 48 }),
      this.createNewAccount
    );
    this.router.post(`${this.baseUrl}/login`, this.loginIntoAccount);
    this.router.get(`${this.baseUrl}/activate/:aid`, this.activateAccount);
    this.router.post(`${this.baseUrl}/logout`, this.logOut);
    this.router.post(`${this.baseUrl}/check/activation`, this.checkActivation);
  }

  private async activateAccount(req: Request, res: Response): Promise<void> {
    try {
      const response: string = await AuthService.activateAccount(req.params["aid"] as string);
  
      res.status(HTTPStatus.SUCCESS)
        .json(response);
    } catch(err: any|ApplicationError) {
      console.error(err);
      res.status(err.status)
        .json(err.message);
    }
  } 

  private async createNewAccount(req: Request, res: Response): Promise<void> {
    try {
      for(const err of validationResult(req).array()) {
        switch(err.param) { /* Track which param from above is incorrect */
          case("email"):
            throw new ApplicationError(HTTPStatus.BAD_REQUEST, `Incorrect email "${err.value}". Try again`);
          case("password"):
            throw new ApplicationError(HTTPStatus.BAD_REQUEST, "Password has to be between 4 & 48 symbols");
          default:
            throw new ApplicationError(HTTPStatus.INTERNAL, "Unexpected server error");
        } 
      }
      const response: User = await AuthService.createNewAccount(req.body as IAuthReq);
  
      res.status(HTTPStatus.SUCCESS)
        .json(response);
    } catch(err: any|ApplicationError) {
      console.error(err);
      res.status(err.status)
        .json(err.message);
    }
  }

  private async loginIntoAccount(req: Request, res: Response): Promise<void> {
    try {
      const response: JwtTokenPair = await AuthService.loginIntoAccount(req.body as IAuthReq);

      res.status(HTTPStatus.SUCCESS)
        .cookie("RETOKEN", response.refresh as JwtTokenPair["refresh"], {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 /* 1 day */
        })
        .json(response);
    } catch(err: any|ApplicationError) {
      console.error(err);
      res.status(err.status)
        .json(err.message);
    }
  }

  private async logOut(req: Request, res: Response) {
    try {
      await AuthService.logOut(req.body as User["email"]);
  
      res.status(HTTPStatus.SUCCESS)
        .clearCookie("RETOKEN")
        .json(`User ${req.body} successfully logged out`);
    } catch(err: any|ApplicationError) {
      console.error(err);
      res.status(err.status)
        .json(err.message);
    }
  }

  private async checkActivation(req: Request, res: Response) {
    try {
      const isActivated: boolean = await AuthService.checkActivation(req.body as ICheckActivationReq);

      res.status(HTTPStatus.SUCCESS)
        .json(isActivated)
    } catch(err: any|ApplicationError) {
      console.error(err);
      res.status(err.status)
        .json(err.message);
    }
  }
};

