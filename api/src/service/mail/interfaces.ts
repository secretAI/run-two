export interface ISendMailData {
  to: string;
  aid: string;
}

export interface IActivationMailStyles {
  letter: string;
  link: string;
  title: string;
  body: string;
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

export interface ITransportConstructorConfig {
  port: number;
  host: string;
  user: string;
  pass: string;
  service: string;
}
