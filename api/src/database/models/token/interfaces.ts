import { User } from "../users/interfaces";

export type RefreshToken = {
  id: string;
  user_email: string;
  token: string;
  created_at: Date;
}

export interface ISaveTokenData {
  user_email: User["email"];
  token: string;
}