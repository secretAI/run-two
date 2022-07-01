import { Request, Response, Router } from "express";
import { HTTPStatus } from "../../utils/etc";
import { IAuthReq, JwtTokenPair } from "./";
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
    this.router.get(`${this.baseUrl}/activate/:aid`, this.activateAccount);
    this.router.post(`${this.baseUrl}/signup`, this.createNewAccount);
    this.router.post(`${this.baseUrl}/login`, this.loginIntoAccount);
  }

  private async activateAccount(req: Request, res: Response): Promise<void> {
    const response: string = await AuthService.activateAccount(req.params.aid as string);

    res.status(HTTPStatus.SUCCESS)
      .json(response);
  } 

  private async createNewAccount(req: Request, res: Response): Promise<void> {
    const response: User = await AuthService.createNewAccount(req.body as IAuthReq);

    res.status(HTTPStatus.SUCCESS)
      .json(response);
  }

  private async loginIntoAccount(req: Request, res: Response): Promise<void> {
    const response: JwtTokenPair = await AuthService.loginIntoAccount(req.body as IAuthReq);

    res.status(HTTPStatus.SUCCESS)
      .cookie("RETOKEN", response.refresh as JwtTokenPair["refresh"], {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 /* 1 day */
      })
      .json(response);  
  }
};
