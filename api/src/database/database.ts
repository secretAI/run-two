import { Pool, QueryResult } from "pg";
import { IDatabaseConstructorConfig } from ".";
import { getDotEnv } from "../utils/env-var";
import { ApplicationError, HTTPStatus } from "../utils/etc";

class Database {
  private readonly pool: Pool;

  constructor(config: IDatabaseConstructorConfig) {
    this.pool = new Pool({
      /* Have to use docker-container name as host for production(⬇️) */
      host: getDotEnv("node_env") == "development"||"test" ? "localhost" : "postgres",
      database: config.database,
      user: config.user,
      password: config.password,
      port: config.port
    });
    console.log("[*] PostgreSQL is running..");
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

export default new Database({
  database: getDotEnv("postgres_db"),
  user: getDotEnv("postgres_user"),
  port: +getDotEnv("postgres_port"),
  password: getDotEnv("postgres_password")
});
