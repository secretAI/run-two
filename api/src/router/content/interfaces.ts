import { User } from "../../database/models/users/interfaces";

export interface ICreatePostReq {
  user_email: User["email"],
  title: string;
  body: string;
  media?: Buffer;
}