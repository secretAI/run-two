export interface ISendMailData {
  to: string;
  aid: string;
}

export interface IHtmlStyles {
  root: string;
  link: string;
  btn: string;
}

export interface ISentMail {
  accepted: string[],
  rejected: string[],
  envelopeTime: number,
  messageTime: number,
  messageSize: number,
  response: string,
  envelope: { 
    from: string, 
    to: string[] 
  },
  messageId: string
}

export interface IMailServerConstructorConfig {
  key: Buffer;
  cert: Buffer;
  port: number;
}
