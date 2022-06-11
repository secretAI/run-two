import { AxiosResponse } from "axios";
import * as bcrypt from "bcrypt";
import pg from "../../../database/index";
import { User } from "../../../database/models/users/interfaces";
import { getDotEnv } from "../../../utils/env";
import { http } from "../http";

const testTableName = "users_temp"

describe("SignUp Demo", () => {
  beforeAll(async () => {
    await pg.createQuery(`
    BEGIN;
    DROP TABLE IF EXISTS ${testTableName};
    
    CREATE TEMP TABLE ${testTableName}
    AS SELECT * FROM users
    WITH NO DATA;

    ALTER TABLE ${testTableName}
      ALTER COLUMN id
        SET DEFAULT gen_random_uuid(),
      ADD CONSTRAINT 
        users_temp_pkey PRIMARY KEY(id),
      ADD CONSTRAINT
        users_temp_unique_email UNIQUE(email),
      ALTER COLUMN activated
        SET DEFAULT false,
      ALTER COLUMN created_at
        SET DEFAULT now()::timestamp;

      END;
    `)
  });

  it("Should create a new User in Temporary table", async () => {
    const _password = bcrypt.hashSync("somepass", +getDotEnv("salt_rnds"));
    const response: AxiosResponse<User> = await http.post("/auth/signin", {
      email: "random@box.com",
      password: _password
    });
    
    expect(response.data).toBeTruthy();
    expect(bcrypt.compareSync(response.data.password, "somepass")).toEqual(true);
  })

  afterAll(async () => {
    await pg.createQuery(`
      DROP TABLE ${testTableName};
    `)
  })
})