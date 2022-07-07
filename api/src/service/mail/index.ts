import { MailService } from "./service";
import { SMTPModule } from "./server/smtp";
import { 
  ISendMailData, 
  IActivationMailStyles,
  ISentMail, 
  IMailServerConstructorConfig, 
  ITransportConstructorConfig, 
} from "./interfaces";

export { 
  MailService, ISendMailData, ISentMail, ITransportConstructorConfig,
  IActivationMailStyles, 
  SMTPModule, IMailServerConstructorConfig
};