import { User } from "../users/interfaces";

export type Post = {
  id: string;
  user_email: string;
  title: string;
  body: string;
  media?: Buffer;
  created_at: Date;
}

export interface ICreatePostData {
  user_email: User["email"];
  title: string;
  body: string;
  media?: Buffer;
}
