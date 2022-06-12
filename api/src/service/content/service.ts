import { PostInstance } from "../../database/models/posts/instance";
import { Post } from "../../database/models/posts/interfaces";
import { UserInstance } from "../../database/models/users/instance";
import { User } from "../../database/models/users/interfaces";
import { ApplicationError, HTTPStatus } from "../../utils/etc";
import { ICreatePostData } from "./interfaces";


export class ContentService {
  public static async createNewPost(postData: ICreatePostData): Promise<Post> {
    const author: User = await UserInstance.getUserByEmail(postData.user_email);
    if(!author)
      throw new ApplicationError(HTTPStatus.NOT_FOUND, `User ${postData.user_email} not found..`);
    const post: Post = await PostInstance.createNewPost(postData);

    return post;
  }
}