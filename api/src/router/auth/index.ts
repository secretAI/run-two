import { Request, Response, Router } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { ApplicationError, HTTPStatus } from "../../utils/etc";
import { UserInstance } from "../../database/models/users/instance";
import { ILogInreq, ISignUpReq, JwtTokenPair } from "./interfaces";
import { getDotEnv } from "../../utils/env";
import { User } from "../../database/models/users/interfaces";
import { UserDto } from "../../database/models/users/dto";

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
    const {
      email, 
      password
    }: ISignUpReq = req.body;
    const _password = bcrypt.hashSync(password, +getDotEnv("salt_rnds"));
    const response: User = await UserInstance.createUser({
      email: email,
      password: _password
    });

    res.status(HTTPStatus.SUCCESS)
      .json(response);
  }

  private async loginIntoAccount(req: Request, res: Response) {
    const { 
      email, 
      password
    }: ILogInreq = req.body;
    const user: User = await UserInstance.getUserByEmail(email);
    if(!user)
      throw new ApplicationError(HTTPStatus.NOT_FOUND, `User ${email} not found`);
    const isPasswordOK: boolean = bcrypt.compareSync(password, user.password);
    if(!isPasswordOK)
      throw new ApplicationError(HTTPStatus.FORBIDDEN, "Password is incorrect");
    const dto = new UserDto(user);
    const tokens: JwtTokenPair = {
      access: jwt.sign({id: dto.id} as jwt.JwtPayload, getDotEnv("jwt_secret_access"), {
        expiresIn: 1000 * 60 * 60 * 2 
        /* 2h. */
      }),
      refresh: jwt.sign({dto} as jwt.JwtPayload, getDotEnv("jwt_secret_refresh"), {
        expiresIn: 1000 * 60 * 60 * 24
        /* 1d. */
      })
    };

    res.status(HTTPStatus.SUCCESS)
      .json(tokens);  
  }
};
