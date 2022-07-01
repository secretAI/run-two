import { PostInstance, UserInstance, Post } from "../../database/";
import { User } from "../../database/models/users/interfaces";
import { ApplicationError, HTTPStatus } from "../../utils/etc";
import { ICreatePostData } from "./interfaces";


export class ContentService {
  public static async getAllPosts(): Promise<Post[]> {
    const posts: Post[] = await PostInstance.getAllPosts();

    return posts;
  }

  public static async createNewPost(postData: ICreatePostData): Promise<Post> {
    const author: User = await UserInstance.getUserByEmail(postData.user_email);
    if(!author)
      throw new ApplicationError(HTTPStatus.NOT_FOUND, `User ${postData.user_email} does not exist`);
    const post: Post = await PostInstance.createNewPost(postData);

    return post;
  }
}