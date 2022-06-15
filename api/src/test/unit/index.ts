import { Database } from "../../database/";
import { getDotEnv } from "../../utils/env";

export const testAcc = {
  email: getDotEnv("test_acc_email"),
  password: getDotEnv("test_acc_pass")
};

export const testData = {
  title: "Hola",
  body: "?",
}

export async function removeTestData() {
  await Database.createQuery(`
    BEGIN;

    DELETE FROM users
    WHERE email = '${testAcc.email}';

    DELETE FROM tokens
    WHERE user_email = '${testAcc.email}';

    DELETE FROM posts
    WHERE user_email = '${testAcc.email}';

    END;
  `);
}