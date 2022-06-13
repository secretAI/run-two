import bodyParser from "body-parser";
import { App } from "./app/index";
import { AuthRouter } from "./router/auth/index";
import { ContentRouter } from "./router/content/index";
import { getDotEnv } from "./utils/env";
import cookieParser from "cookie-parser";

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

app.start()
