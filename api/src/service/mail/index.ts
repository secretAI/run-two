import { MailService } from "./service";
import { SMTPModule } from "./smtp";
import { 
  ISendMailData, 
  IHtmlStyles, 
  ISentMail, 
  IMailServerConstructorConfig, 
  ITransportConstructorConfig } from "./interfaces";

export { 
  MailService, ISendMailData, ISentMail, ITransportConstructorConfig,
  IHtmlStyles, 
  SMTPModule, IMailServerConstructorConfig
};