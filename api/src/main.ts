import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { App } from "./app/";
import { AuthRouter } from "./router/auth/";
import { ContentRouter } from "./router/content/";
import { getDotEnv } from "./utils/env";

const port = +getDotEnv("app_port");

const app = new App({
  port,
  baseUrl: "/api",
  middlewares: [
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json(),
    cookieParser()
  ],
  routers: [
    new AuthRouter("/auth"),
    new ContentRouter("/posts")
  ]
});

app.start();
