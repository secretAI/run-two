import { Transporter, createTransport } from "nodemailer";
import { getDotEnv } from "../../utils/env-var";
import { ISendMailData, ISentMail, ITransportConstructorConfig} from "./";
import { TemplateBuilder } from "./template-builder";

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
    const mail: ISentMail = await this.transporter.sendMail({
      from: getDotEnv("smtp_address"),
      to: emailData.to,
      subject: "RUN-2 Account Activation",
      html: TemplateBuilder.activationMail(emailData.aid)
    });

    return mail;
  }
}
