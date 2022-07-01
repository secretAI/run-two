import { readFileSync } from "fs";
import SMTPConnection from "nodemailer/lib/smtp-connection";
import { SMTPServer } from "smtp-server";
import { getDotEnv } from "../../utils/env";
import { ApplicationError, HTTPStatus } from "../../utils/etc";

export class SMTPModule {
  private readonly server: SMTPServer;
  private readonly connection: SMTPConnection;

  constructor() {
    this.server = new SMTPServer({
      secure: true,
      key: readFileSync("../server.key"),
      cert: readFileSync("../server.crt"),
      authMethods: [ "PLAIN" ],
      onAuth(auth, session, callback) {
        if(auth.username !== getDotEnv("smtp_address") || auth.password !== getDotEnv("smtp_pass")) 
          return callback(new ApplicationError(HTTPStatus.FORBIDDEN, "Incorrect SMTP Server Login Data"));
      }
    });

    this.server.listen(+getDotEnv("smtp_port"), () => {
      console.log("SMTP Server is running..");
    });
  }
}