export type User = {
  id: string;
  email: string;
  password: string;
  activated: boolean;
  created_at: Date;
  aid: string;
}

export interface ICreateUserData {
  email: string;
  password: string;
  aid: string;
  activated?: boolean;
}

export interface ILoginEventData extends ICreateUserData {};
