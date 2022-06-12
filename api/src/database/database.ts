import { Pool, QueryResult } from "pg";
import { getDotEnv } from "../utils/env";
import { ApplicationError, HTTPStatus } from "../utils/etc";

class Database {
  private readonly pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: "localhost",
      database: getDotEnv("db_name"),
      user: getDotEnv("db_user"),
      port: +getDotEnv("db_port")
    });
  }

  public async createQuery(sql: string): Promise<QueryResult["rows"]> {
    const result = await this.pool.query(sql);
    if(!result)
      throw new ApplicationError(HTTPStatus.BAD_REQUEST, "Database couldn't resolve the query");

    return result.rows;
  }
}

export default new Database();
