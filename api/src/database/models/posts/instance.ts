import { Database } from "../../";
import { ICreatePostData, Post } from "../../";


export class PostInstance {
  private static readonly pool = Database;

  public static async getAllPosts(): Promise<Post[]> {
    const posts: Post[] = await this.pool.createQuery(`
      SELECT *
      FROM posts
      ORDER BY user_email ASC;
    `);

    return posts;
  }

  public static async createNewPost(postData: ICreatePostData): Promise<Post> {
    const post: Post = (await this.pool.createQuery(`
      INSERT INTO posts (${Object.keys(postData)
        .join(", ")})
      VALUES (${Object.values(postData)
        .map(value => `'${value}'`)
        .join(", ")})
      RETURNING *;
    `))[0];

    return post;
  } 

  public static async getPostById(post_id: string): Promise<Post> {
    const post: Post = (await this.pool.createQuery(`
      SELECT * FROM posts
      WHERE id = '${post_id}';
    `))[0];

    return post;
  }
}