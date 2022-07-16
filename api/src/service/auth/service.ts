import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import * as uuid from "uuid";
import { User, UserDto, UserInstance, RefreshTokenInstance, Database, RefreshToken } from "../../database/";
import { getDotEnv } from "../../utils/env-var";
import { ApplicationError, HTTPStatus } from "../../utils/etc";
import { IAuthData, ICheckActivationData, IJwtPayload, ILogOutData, IValidateTokenData, JwtTokenPair } from "./";
import { MailService } from "../mail/";

export class AuthService {
  static async createNewAccount(userData: IAuthData): Promise<User> {
    const isTaken: User|null = await UserInstance.getUserByEmail(userData.email);
    if(isTaken)
      throw new ApplicationError(HTTPStatus.FORBIDDEN, `Email ${userData.email} is taken..`);
    const _password = bcrypt.hashSync(userData.password, +getDotEnv("salt_rnds"));
    const aid: string = uuid.v4();
    const mailer = new MailService({
      host: "localhost",
      port: +getDotEnv("smtp_port"),
      service: "gmail",
      user: getDotEnv("smtp_address"),
      pass: getDotEnv("smtp_pass")
    });
    await mailer.sendActivationMail({
      to: userData.email,
      aid
    }); /* uncomment */
    const user: User = await UserInstance.createUser({
      email: userData.email,
      password: _password,
      aid
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
      throw new ApplicationError(HTTPStatus.NOT_FOUND, `User ${email} does not exist`);
    if(!user.activated) 
      throw new ApplicationError(HTTPStatus.BAD_REQUEST, "Activate your account first");
    const isPasswordOK: boolean = bcrypt.compareSync(password, user.password);
    if(!isPasswordOK)
      throw new ApplicationError(HTTPStatus.FORBIDDEN, "Password is incorrect");
    const dto = new UserDto(user);
    const tokens: JwtTokenPair = {
      access: jwt.sign({ dto: { email: dto.email } } as jwt.JwtPayload, getDotEnv("jwt_secret_access"), {
        expiresIn: "15min"
        /* 15m. */
      }),
      refresh: jwt.sign({ dto } as jwt.JwtPayload, getDotEnv("jwt_secret_refresh"), {
        expiresIn: "1d"
        /* 1d. */
      })
    };
    const validation: IJwtPayload = AuthService.validateToken({
      token: tokens.refresh,
      secret: getDotEnv("jwt_secret_refresh")
    });
    await RefreshTokenInstance.saveUserRefreshToken({
      user_email: user.email,
      token: tokens.refresh,
      /* ToDo: fix expires at Value */
      expires_at: new Date(validation.exp).toISOString()
    });

    return tokens;
  }

  public static validateToken(tokenData: IValidateTokenData): IJwtPayload {
    const validation: IJwtPayload = jwt.verify(tokenData.token, tokenData.secret) as IJwtPayload;
    if(!validation)
      throw new ApplicationError(HTTPStatus.UNAUTHORIZED, "Invalid token or secret");

      return validation;
  }

  public static async activateAccount(aid: string): Promise<string> {
    const user: User = (await Database.createQuery(`
      SELECT * FROM users
      WHERE aid = '${aid}'::uuid;
    `))[0];
    if(!user) 
      throw new ApplicationError(HTTPStatus.NOT_FOUND, `User with ActivationID ${aid} not found`);
    if(user.activated)
      throw new ApplicationError(HTTPStatus.BAD_REQUEST, "Link has expired");
    const activated: User["activated"] = (await Database.createQuery(`
      UPDATE users
      SET activated = true 
      WHERE email = '${user.email}'
      RETURNING activated;
    `))[0];
    if(!activated) 
      throw new ApplicationError(HTTPStatus.INTERNAL, "Error during account activation");

    return `Account ${user.email} has been activated`;
  }

  public static async getRefreshTokenByEmail(email: string): Promise<RefreshToken> {
    const reToken: RefreshToken = await RefreshTokenInstance.getRefreshToken({
      param: "user_email",
      value: email
    });

    return reToken;
  }

  public static async logOut(data: ILogOutData): Promise<string> {
    await RefreshTokenInstance.deleteToken({
      param: "token",
      value: data.reToken
    });
      
    return `User successfully logged out`;
  }

  public static async checkActivation(data: ICheckActivationData): Promise<boolean> {
    const user: User = (await Database.createQuery(`
      SELECT * FROM users
      WHERE email = '${data.email}';
    `))[0];
    if(!user)
      throw new ApplicationError(HTTPStatus.NOT_FOUND, `User ${data.email} doesn't exist`)

    return user.activated;
  }
}