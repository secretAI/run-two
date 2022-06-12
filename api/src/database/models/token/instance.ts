import Database from "../../index";
import { ISaveTokenData, RefreshToken } from "./interfaces";

export class TokenInstance {
  private static readonly pool = Database;

  static async saveUserRefreshToken(tokenData: ISaveTokenData): Promise<RefreshToken> {
    const refreshToken: RefreshToken = (await this.pool.createQuery(`
      INSERT INTO tokens (${Object.keys(tokenData)
      .join(", ")})
      VALUES (${Object.values(tokenData)
      .map(value => `'${value}'`)
      .join(", ")})
      RETURNING *;
    `))[0];

    return refreshToken;
  }

  static async getRefreshTokenByEmail(email: string): Promise<RefreshToken> {
    const refreshToken: RefreshToken = (await this.pool.createQuery(`
      SELECT * 
      FROM tokens
      WHERE user_email = '${email}';
    `))[0];

    return refreshToken;
  }
}