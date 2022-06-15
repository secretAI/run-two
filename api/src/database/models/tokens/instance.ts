import { Database } from "../../";
import { ISaveTokenData, RefreshToken } from "./interfaces";

export class TokenInstance {
  private static readonly pool = Database;

  static async deleteToken(email: string): Promise<RefreshToken> {
    const deleted = (await this.pool.createQuery(`
      DELETE FROM tokens
      WHERE user_email = '${email}'
      RETURNING *;
    `))[0];

    return deleted;
  }

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