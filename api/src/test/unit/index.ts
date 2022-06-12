import { Axios } from "axios";
import { getDotEnv } from "../../utils/env";

const port = getDotEnv("app_port");
export const http = new Axios({
  baseURL: `http://localhost:${port}/api`,
  headers: {
    "Content-type": "application/json"
  }
});

export const testAcc = {
  email: getDotEnv("test_acc"),
  password: getDotEnv("test_pass")
};