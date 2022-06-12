import { User } from "../../database/models/users/interfaces";

export interface ICreatePostData {
  user_email: User["email"];
  title: string;
  body: string;
  media?: Buffer;
}