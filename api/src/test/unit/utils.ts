import axios, { Axios } from "axios";
import { Database } from "../../database/index";
import { getDotEnv } from "../../utils/env";

const port = getDotEnv("app_port");
export const http = axios.create({
  baseURL: `http://localhost:${port}/api`,
  headers: {
    "Content-type": "application/json"
  }
});

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

    END;
  `);
}