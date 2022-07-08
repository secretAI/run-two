import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { App } from "./app/";
import { AuthRouter } from "./router/auth/";
import { ContentRouter } from "./router/content/";
import { getDotEnv } from "./utils/env-var";
import { HTTPStatus } from "./utils/etc";

const port = +getDotEnv("app_port");

const app = new App({
  port,
  baseUrl: "/api",
  middlewares: [
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json({
      limit: "1mb"
    }),
    cookieParser(),
    cors({
      origin: getDotEnv("client_url"),
      optionsSuccessStatus: HTTPStatus.SUCCESS
    })
  ],
  routers: [
    new AuthRouter("/auth"),
    new ContentRouter("/posts")
  ]
});

app.start();
