import { getDotEnv } from "../../utils/env-var";
import { ApplicationError, HTTPStatus } from "../../utils/etc";
import { ISendMailData, Styles } from "./interfaces";


export class TemplateBuilder {
  private readonly html: string;
  private readonly styles: Styles;

  public static activationMail(aid: string) {
    const styles = {
      letter: `
        width: 600px;
        text-align: center;
        padding: 0 15px;
        color: white;
        background-color: teal;
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
    }; 
      
    return `<table class="letter" style="${styles.letter}">
      <tr class="title" style="${styles.title}">
        Account Activation
      </tr>
      <tr class="body" style="${styles.body}">
        Welcome to the RUN-2! I hope that your experience of using our product will be enjoyable, bro. In order to activate your free account follow this link:
      </tr>
      <tr>
        <a href="${this.createRedirectURL(aid)}" target="_blank" class="link" style="${styles.link}">
          LINK
        </a>
      </tr>
    </table>`; /* Have to use tables as mail API doesn't recognize flexbox */
  }

  private static createRedirectURL(code: ISendMailData["aid"]): string {
    /* ToDo: Modify port to client's for production */ 
    return `http://localhost:${getDotEnv("app_port")}/api/auth/activate/${code}`;
  }
}