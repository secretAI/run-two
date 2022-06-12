import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { User, UserDto, UserInstance, TokenInstance } from "../../database/index";
import { getDotEnv } from "../../utils/env";
import { ApplicationError, HTTPStatus } from "../../utils/etc";
import { IAuthData, JwtTokenPair } from "./interfaces";


export class AuthService {
  static async createNewAccount(userData: IAuthData): Promise<User> {
    const isTaken = await UserInstance.getUserByEmail(userData.email);
    if(isTaken)
      throw new ApplicationError(HTTPStatus.FORBIDDEN, `Email ${userData.email} is taken..`);
    const _password = bcrypt.hashSync(userData.password, +getDotEnv("salt_rnds"));
    const user: User = await UserInstance.createUser({
      email: userData.email,
      password: _password
    });

    return user;
  }

  static async loginIntoAccount(userData: IAuthData): Promise<JwtTokenPair> {
    const { 
      email, 
      password
    } = userData;
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
    await TokenInstance.saveUserRefreshToken({
      user_email: user.email,
      token: tokens.refresh
    });

    return tokens;
  }
}