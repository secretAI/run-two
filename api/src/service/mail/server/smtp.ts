import { SMTPServer } from "smtp-server";
import { IMailServerConstructorConfig } from "..";
import { getDotEnv } from "../../../utils/env-var";
import { ApplicationError, HTTPStatus } from "../../../utils/etc";

export class SMTPModule {
  private readonly server: SMTPServer;

  constructor(config: IMailServerConstructorConfig) {
    this.server = new SMTPServer({
      secure: true,
      key: config.key,
      cert: config.cert,
      authMethods: [ "PLAIN" ],
      onAuth(auth, session, callback) {
        if(auth.username !== getDotEnv("smtp_address") || auth.password !== getDotEnv("smtp_pass")) 
          return callback(new ApplicationError(HTTPStatus.FORBIDDEN, "Incorrect SMTP Server Login Data"));
      }
    });

    this.server.listen(config.port, () => {
      console.log("[*] SMTP Server is running..");
    });
  }
}