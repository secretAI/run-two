import { User } from "../users/interfaces";
import { Moment } from "moment";

export type RefreshToken = {
  id: string;
  user_email: string;
  token: string;
  created_at: Date;
}

export interface ISaveTokenData {
  user_email: User["email"];
  token: string;
  expires_at: string;
}