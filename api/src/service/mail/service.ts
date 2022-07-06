import { config } from "dotenv";
import { Transporter, createTransport } from "nodemailer";
import { getDotEnv } from "../../utils/env-var";
import { IHtmlStyles, ISendMailData, ISentMail, ITransportConstructorConfig} from "./";
import { SMTPModule } from "./smtp";

export class MailService {
  private readonly transporter: Transporter;

    constructor(config: ITransportConstructorConfig) {
    this.transporter = createTransport({
      host: config.host,
      port: config.port,
      secure: true,
      service: config.service,
      auth: {
        user: config.user,
        pass: config.pass
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  public async sendActivationMail(emailData: ISendMailData): Promise<ISentMail> {
    const styles: IHtmlStyles = this.generateHtmlStyles();
    const mail: ISentMail = await this.transporter.sendMail({
      from: getDotEnv("smtp_address"),
      to: emailData.to,
      subject: "RUN-2 Account Activation",
      html: `
        <table class="letter" style="${styles.letter}">
          <tr class="title" style="${styles.title}">
            Account Activation
          </tr>
          <tr class="body" style="${styles.body}">
            Welcome to the RUN-2! I hope that your experience of using our product will be enjoyable, bro. In order to activate your free account follow this link:
          </tr>
          <tr>
            <a href="${this.createRedirectURL(emailData.aid)}" target="_blank" class="link" style="${styles.link}">
              LINK
            </a>
          </tr>
        </div>
      ` /* Have to use tables as mail API doesn't recognize flexbox */
    });

    return mail;
  }

  private generateHtmlStyles(): IHtmlStyles {
    return {
      letter: `
        width: 600px;
        text-align: center;
        padding: 0 15px;
        color: white;
        background-color:#4cbfa6;
        border-radius: 8px;
        box-sizing: border-box;
      `,
      title: `
        font-family: Arial;
        font-size: 36px;
        letter-spacing: -0.5px;
        margin: 15px ;
      `,
      body: `
        font-family: Verdana;
        font-size: 20px;
        margin: 12px;
        line-height: 95%;
        letter-spacing: -0.3px;
      `,
      link: `
        font-family: monospace;
        font-size: 26px;
        color: white;
        cursor: pointer;
        letter-spacing: -1.5px;
      `
    }
  }

  private createRedirectURL(code: ISendMailData["aid"]): string {
    /* ToDo: Modify port to client's for production */ 
    return `http://localhost:${getDotEnv("app_port")}/api/auth/activate/${code}`;
  }
}
