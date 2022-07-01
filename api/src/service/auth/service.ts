import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import * as uuid from "uuid";
import { User, UserDto, UserInstance, TokenInstance, Database } from "../../database/";
import { getDotEnv } from "../../utils/env";
import { ApplicationError, HTTPStatus } from "../../utils/etc";
import { IAuthData, IJwtPayload, JwtTokenPair } from "./interfaces";
import { MailService } from "../mail/";
import { App } from "../../app";

export class AuthService {
  static async createNewAccount(userData: IAuthData): Promise<User> {
    const isTaken: User|null = await UserInstance.getUserByEmail(userData.email);
    if(isTaken)
      throw new ApplicationError(HTTPStatus.FORBIDDEN, `Email ${userData.email} is taken..`);
    const _password = bcrypt.hashSync(userData.password, +getDotEnv("salt_rnds"));
    const aid: string = uuid.v4();
    const mailer = new MailService();
    await mailer.sendActivationMail({
      to: userData.email,
      aid
    });
    const user: User = await UserInstance.createUser({
      email: userData.email,
      password: _password,
      aid,
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
    if(!user.activated) 
      throw new ApplicationError(HTTPStatus.BAD_REQUEST, "Activate your account first");
    const isPasswordOK: boolean = bcrypt.compareSync(password, user.password);
    if(!isPasswordOK)
      throw new ApplicationError(HTTPStatus.FORBIDDEN, "Password is incorrect");
    const dto = new UserDto(user);
    const tokens: JwtTokenPair = {
      access: jwt.sign({ dto: { email: dto.email } } as jwt.JwtPayload, getDotEnv("jwt_secret_access"), {
        expiresIn: 1000 * 60 * 15
        /* 15m. */
      }),
      refresh: jwt.sign({ dto } as jwt.JwtPayload, getDotEnv("jwt_secret_refresh"), {
        expiresIn: 1000 * 60 * 60 * 24
        /* 1d. */
      })
    };
    const validation: IJwtPayload = AuthService.validateToken(tokens.refresh, getDotEnv("jwt_secret_refresh"));
    await TokenInstance.saveUserRefreshToken({
      user_email: user.email,
      token: tokens.refresh,
      /* ToDo: fix expires at Value */
      expires_at: new Date(validation.exp).toISOString()
    });

    return tokens;
  }

  public static validateToken(token: string, secret: string): IJwtPayload {
    const validation: IJwtPayload = jwt.verify(token, secret) as IJwtPayload;
    if(!validation)
      throw new ApplicationError(HTTPStatus.UNAUTHORIZED, "Invalid token");

      return validation;
  }

  public static async activateAccount(aid: string): Promise<string> {
    const user: User = (await Database.createQuery(`
      SELECT * FROM users
      WHERE aid = '${aid}'::uuid;
    `))[0];
    if(!user) 
      throw new ApplicationError(HTTPStatus.NOT_FOUND, `User with ActivationID ${aid} not found`);
    const activated = await Database.createQuery(`
      UPDATE users
      SET activated = true 
      WHERE email = '${user.email}'
      RETURNING *;
    `);
    if(!activated) 
      throw new ApplicationError(HTTPStatus.INTERNAL, "Error during account activation");

    return `Account ${user.email} has been activated`;
  }
}