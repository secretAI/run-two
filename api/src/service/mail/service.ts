import { Transporter, createTransport } from "nodemailer";
import { getDotEnv } from "../../utils/env";
import { IHtmlStyles, ISendMailData } from "./";
import { SMTPModule } from "./smtp";

export class MailService {
  private readonly transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: getDotEnv("smtp_host"),
      port: +getDotEnv("smtp_port"),
      secure: true,
      service: "gmail",
      auth: {
        user: getDotEnv("smtp_address"),
        pass: getDotEnv("smtp_pass")
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  public async sendActivationMail(emailData: ISendMailData) {
    const mail = this.transporter.sendMail({
      from: getDotEnv("smtp_address"),
      to: emailData.to,
      subject: "RUN-2 Account Activation",
      html: 
      `
        <div style="${this.generateHtmlStyle().root}">
          <button style="${this.generateHtmlStyle().btn}">
            <a href="${this.createRedirectURL(emailData.code)}" target="_blank" style="${this.generateHtmlStyle().link}">
              Activate
            </a>
          </button>
        </div>
      `
    });

    return mail;
  }

  private generateHtmlStyle(): IHtmlStyles {
    return {
      root: `
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        user-select: none;
        margin: 10px 0;
        padding: 0;
        box-sizing: border-box;
      `,
      btn: `
        font-family: monospace;
        letter-spacing: -3px;
        font-size: 30px;
        height: 80px;
        width: 320px;
        padding: 14px;
        color: white;
        border: 3px solid rgb(0,128,128);
        border-radius: 10px;
        background: rgb(0,128,128);
        cursor: pointer;
      `,
      link: `
        color: white;
        text-decoration: none;
        width: 100%;
        height: 100%;
      `
    }
  }

  private createRedirectURL(code: ISendMailData["code"]): string {
    /* ToDo: Modify port to client's for production */ 
    return `http://localhost:${getDotEnv("app_port")}/api/auth/activate/${code}`;
  }
}
