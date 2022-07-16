export interface IPost {
  title: string;
  body: string;
  user_email: string;
  created_at?: Date;
  media?: null|string;
}