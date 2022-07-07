import { MailService } from "./service";
import { SMTPModule } from "./smtp";
import { 
  ISendMailData, 
  IActivationMailStyles,
  ISentMail, 
  IMailServerConstructorConfig, 
  ITransportConstructorConfig, 
  Styles
} from "./interfaces";

export { 
  MailService, ISendMailData, ISentMail, ITransportConstructorConfig,
  Styles, IActivationMailStyles, 
  SMTPModule, IMailServerConstructorConfig
};