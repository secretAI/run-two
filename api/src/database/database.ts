import { Pool, QueryResult } from "pg";
import { getDotEnv } from "../utils/env";
import { ApplicationError, HTTPStatus } from "../utils/etc";

class Database {
  private readonly pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: "localhost",
      database: getDotEnv("postgres_db"),
      user: getDotEnv("postgres_user"),
      port: +getDotEnv("postgres_port"),
      password: getDotEnv("postgres_password")
    });
    console.log("PostgreSQL is running..");
  }

  public async createQuery(sql: string): Promise<QueryResult["rows"]> {
    const result = await this.pool.query(sql);
    if(!result)
      throw new ApplicationError(HTTPStatus.BAD_REQUEST, "Database couldn't resolve the query");

    return result.rows;
  }

  public async closeConnection(): Promise<void> {
    await this.pool.end()
  }
}

export default new Database();
