import bodyParser from "body-parser";
import express from "express";
import { App } from "./app";
import { AuthRouter } from "./router/auth";
import { ContentRouter } from "./router/content";
import { getDotEnv } from "./utils/env";

const port = +getDotEnv("app_port");

const app = new App({
  port,
  baseUrl: "/api",
  middlewares: [
    bodyParser.urlencoded({ extended: true }),
    express.json()
  ],
  routers: [
    new AuthRouter("/auth"),
    new ContentRouter("/posts")
  ]
});

app.start()
