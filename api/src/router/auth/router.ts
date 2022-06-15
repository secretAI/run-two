import { Request, Response, Router } from "express";
import { HTTPStatus } from "../../utils/etc";
import { IAuthReq, JwtTokenPair } from "./interfaces";
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
    this.router.get(this.baseUrl, this.handshake);
    this.router.post(`${this.baseUrl}/signup`, this.createNewAccount);
    this.router.post(`${this.baseUrl}/login`, this.loginIntoAccount);
  }

  private handshake(req: Request, res: Response): void {
    res.status(HTTPStatus.SUCCESS)
      .send("Hii!");
  }

  private async createNewAccount(req: Request, res: Response): Promise<void> {
    const response: User = await AuthService.createNewAccount(req.body as IAuthReq);

    res.status(HTTPStatus.SUCCESS)
      .json(response);
  }

  private async loginIntoAccount(req: Request, res: Response): Promise<void> {
    const response: JwtTokenPair = await AuthService.loginIntoAccount(req.body as IAuthReq);

    res.status(HTTPStatus.SUCCESS)
      .cookie("reToken", response.refresh as JwtTokenPair["refresh"], {
        httpOnly: true
      })
      .json(response);  
  }
};
