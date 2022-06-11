import Database from "../../index"
import { ICreateUserData, User } from "./interfaces";

export class UserInstance {
  private static readonly pool = Database;

  static async getAllUsers(): Promise<User[]> {
    const users = await this.pool.createQuery(`
      SELECT * FROM users
      ORDER BY created_at DESC;
    `);

    return users;
  }

  static async createUser(userData: ICreateUserData): Promise<User> {
    const user = (await this.pool.createQuery(`
      INSERT INTO users (${Object.keys(userData)
        .join(", ")})
      VALUES (${Object.values(userData)
        .map(value => `'${value}'`)
        .join(", ")})
      RETURNING *;
    `))[0];

    return user;
  }

  static async getUserByEmail(email: string): Promise<User> {
    const user = (await this.pool.createQuery(`
    SELECT email, password, activated
    FROM users
    WHERE email = ${email};
  `))[0];

    return user;
  }
}