import { Database } from "../../";
import { ISaveTokenData, RefreshToken } from "../../";

export class TokenInstance {
  private static readonly pool = Database;

  static async deleteTokenByEmail(email: string): Promise<RefreshToken> {
    const deleted = (await this.pool.createQuery(`
      DELETE FROM tokens
      WHERE user_email = '${email}'
      RETURNING *;
    `))[0];

    return deleted;
  }

  static async saveUserRefreshToken(tokenData: ISaveTokenData): Promise<RefreshToken> {
    const doesExist = (await this.pool.createQuery(`
      SELECT * FROM tokens
      WHERE user_email = '${tokenData.user_email}';
    `))[0];
    if(doesExist) {
      return (await this.pool.createQuery(`
        UPDATE tokens 
        SET token = '${tokenData.token}'
        WHERE user_email = '${tokenData.user_email}';
      `))[0];
    } else {
      return (await this.pool.createQuery(`
        INSERT INTO tokens (${Object.keys(tokenData)
        .join(", ")})
        VALUES (${Object.values(tokenData)
        .map(value => `'${value}'`)
        .join(", ")})
        RETURNING *;
      `))[0];
    }
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