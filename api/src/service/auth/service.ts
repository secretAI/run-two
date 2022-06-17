import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import * as uuid from "uuid";
import { User, UserDto, UserInstance, TokenInstance, Database } from "../../database/";
import { getDotEnv } from "../../utils/env";
import { ApplicationError, HTTPStatus } from "../../utils/etc";
import { IActivateAccData, IAuthData, IJwtPayload, JwtTokenPair } from "./interfaces";
import { MailService } from "../mail/";


export class AuthService {
  static async createNewAccount(userData: IAuthData): Promise<User> {
    const isTaken = await UserInstance.getUserByEmail(userData.email);
    if(isTaken)
      throw new ApplicationError(HTTPStatus.FORBIDDEN, `Email ${userData.email} is taken..`);
    const _password = bcrypt.hashSync(userData.password, +getDotEnv("salt_rnds"));
    const mailer = new MailService();
    const aid: string = uuid.v4();
    await mailer.sendActivationMail({
      to: userData.email,
      code: aid
    });
    const user: User = await UserInstance.createUser({
      email: userData.email,
      password: _password,
      aid: aid
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
    await TokenInstance.deleteTokenByEmail(user.email);
    await TokenInstance.saveUserRefreshToken({
      user_email: user.email,
      token: tokens.refresh,
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

  public static async activateAccount(emailData: IActivateAccData): Promise<string> {
    const code: string = (await Database.createQuery(`
      SELECT code FROM users
      WHERE email = '${emailData.email}';
    `))[0];
    if(code !== emailData.code) 
      throw new ApplicationError(HTTPStatus.FORBIDDEN, "Invalid activation code");
    await Database.createQuery(`
      UPDATE users
      SET activated = true 
      WHERE email = '${emailData.email}';
    `);

    return `Account ${emailData.email} activated`;
  }
}