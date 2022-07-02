import { Database } from "../../database";
import { getDotEnv } from "../../utils/env";

export const testAcc = {
  email: getDotEnv("test_acc_email"),
  password: getDotEnv("test_acc_pass")
};

export async function removeTestData() {
  await Database.createQuery(`
    DELETE FROM users
    WHERE email = '${testAcc.email}';
  `); /* Update and Delete are cascade for both Posts and Tokens tables */
};