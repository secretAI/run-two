import express, { Application } from "express";
import { SMTPModule } from "../service/mail/";
import { IAppConstructorConfig, Middlewares, Routers } from "./interfaces";

export class App {
  private readonly app: Application;
  private readonly port: number;
  private readonly baseUrl: string;
  private readonly smtpModule: SMTPModule;

  constructor(config: IAppConstructorConfig) {
    this.app = express();
    this.port = config.port;
    this.baseUrl = config.baseUrl;
    this.smtpModule = new SMTPModule();
    this.middleWares(config.middlewares);
    this.routes(config.routers);
  }

  private middleWares(middleWares: Middlewares) {
    middleWares.forEach((middleWare) => {
      this.app.use(middleWare);
    });
  }

  private routes(routes: Routers) {
    routes.forEach((controller) => {
      this.app.use(this.baseUrl, controller.router);
    });
  }

  public start() {
    this.app.listen(this.port, () => {
      console.log(`[**] App is running..\nhttp://localhost:${this.port}${this.baseUrl}`);
    });
  }
}