import { Transporter, createTransport } from "nodemailer";
import { getDotEnv } from "../../utils/env";
import { ISendMailData } from "./interfaces";

export class MailService {
  private readonly transporter: Transporter;

  /* ToDo: add google OAuth2  */
  constructor() {
    this.transporter = createTransport({
      host: "smtp.google.com",
      port: +getDotEnv("smtp_port"),
      auth: {
        user: getDotEnv("smtp_address"),
        pass: getDotEnv("smtp_password")
      }
    });
  }

  public async sendActivationMail(data: ISendMailData) {
    const mail: any = this.transporter.sendMail({
      from: getDotEnv("smtp_address"),
      to: data.to,
      subject: "RUN-2 Account Activation",
      html: 
      `
        <style>
          body {
            display: flex;
            flex-direction: column;
            align-items: center;
            user-select: none;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          .title {
            font-family: monospace;
            letter-spacing: -1.75px;
            margin: 5px;
            opacity: 30%;
          }
          
          .btn {
            font-family: monospace;
            letter-spacing: -3px;
            font-size: 30px;
            height: 100px;
            width: 350px;
            padding: 14px;
            color: white;
            border: 3px solid rgb(0,128,128);
            border-radius: 10px;
            background: rgb(0,128,128);
            transition-duration: 160ms;
            cursor: pointer;
          }
          
          .link {
              color: white;
              text-decoration: none;
          }
          
          .btn:hover {
            background-color: rgb(0,90,90);
            color: white;
            border: 3px solid rgb(0,90,90);
          }
        </style>

        <h2 class="title">
          RUN-2
        </h2>
        <button class="btn">
          <a href="${this.createRedirectURL(data.code)}" target="_blank" class="link">
            Activate
          </a>
        </button>
      `
    });

    return mail;
  }

  private createRedirectURL(code: ISendMailData["code"]): string {
    /* ToDo: Modify port to client's for production */ 
    return `http://localhost:${getDotEnv("app_port")}/auth/?aid=${code}`;
  }
}
