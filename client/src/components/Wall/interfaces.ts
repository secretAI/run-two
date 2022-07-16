export type Post = {
  id: string;
  user_email: string;
  title: string;
  body: string;
  media?: null;
  created_at: Date;
};

export type WallProps = {
  post: Post;
  // children?: JSX.Element|JSX.Element[];
}
