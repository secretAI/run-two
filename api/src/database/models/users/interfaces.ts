export type User = {
  id: string;
  email: string;
  password: string;
  activated: boolean;
  created_at: Date;
}

export interface ICreateUserData {
  email: string;
  password: string;
}

export interface ILoginEventData extends ICreateUserData {};
