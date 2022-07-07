import { 
  ISaveTokenData, 
  RefreshToken, 
  Database, 
  IPostgresQueryData } 
from "../../";

export class TokenInstance {
  private static readonly pool = Database;

  static async deleteToken(data: IPostgresQueryData): Promise<RefreshToken> {
    if(!data.param)
      data.param = "user_email";
    const deleted: RefreshToken = (await this.pool.createQuery(`
      DELETE FROM tokens
      WHERE ${data.param} = '${data.value}'
      RETURNING *;
    `))[0];

    return deleted;
  }

  static async saveUserRefreshToken(tokenData: ISaveTokenData): Promise<RefreshToken> {
    const doesExist: RefreshToken|null = (await this.pool.createQuery(`
      SELECT * FROM tokens
      WHERE user_email = '${tokenData.user_email}';
    `))[0];
    switch(!!doesExist) {
      case true: 
        return (await this.pool.createQuery(`
          UPDATE tokens 
          SET token = '${tokenData.token}'
          WHERE user_email = '${tokenData.user_email}
          RETURNING *';
        `))[0];
      case false:
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

  static async getRefreshToken(data: IPostgresQueryData): Promise<RefreshToken> {
    if(!data.param)
      data.param = "user_email";
    const refreshToken: RefreshToken = (await this.pool.createQuery(`
      SELECT * 
      FROM tokens
      WHERE ${data.param} = '${data.value}';
    `))[0];

    return refreshToken;
  }
}