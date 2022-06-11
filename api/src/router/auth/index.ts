import { Request, Response, Router } from "express";
import * as bcrypt from "bcrypt";
import { ApplicationError, HTTPStatus } from "../../utils/etc";
import { UserInstance } from "../../database/models/users/instance";
import { ILogInreq, ISignUpReq } from "./interfaces";
import { getDotEnv } from "../../utils/env";
import { User } from "../../database/models/users/interfaces";

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
    this.router.post(`${this.baseUrl}/sign`, this.signUp);
    this.router.post(`${this.baseUrl}/login`, this.logIn);
  }

  private handshake(req: Request, res: Response): void {
    res.status(HTTPStatus.SUCCESS)
      .send("Hii!");
  }

  private async signUp(req: Request, res: Response): Promise<void> {
    const {
      email, 
      password
    }: ISignUpReq = req.body;
    const _password = await bcrypt.hash(password, getDotEnv("salt_rnds"));
    const response: User = await UserInstance.createUser({
      email: email,
      password: _password
    });

    res.status(HTTPStatus.SUCCESS)
      .json(response);
  }

  private async logIn(req: Request, res: Response) {
    const { 
      email, 
      password
    }: ILogInreq = req.body;
    const user: User = await UserInstance.getUserByEmail(email);
    const isPasswordOK: boolean = await bcrypt.compare(password, user.password);
    if(!isPasswordOK)
      throw new ApplicationError(HTTPStatus.FORBIDDEN, "Password is incorrect");
    const response = "Login SUCCESS<3"

    res.status(HTTPStatus.SUCCESS)
      .json(response);
  }
}