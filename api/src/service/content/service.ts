import { readdir, readFile } from "fs";
import path from "path";
import { PostInstance, UserInstance, Post } from "../../database/";
import { User } from "../../database/models/users/interfaces";
import { ApplicationError, HTTPStatus } from "../../utils/etc";
import { ICreatePostData, IHandleMediaData } from "./";


export class ContentService {
  public static async getAllPosts(): Promise<Post[]> {
    const posts: Post[] = await PostInstance.getAllPosts();

    return posts;
  }

  public static async createNewPost(postData: ICreatePostData): Promise<Post> {
    const author: User = await UserInstance.getUserByEmail(postData.user_email);
    if(!author)
      throw new ApplicationError(HTTPStatus.NOT_FOUND, `User ${postData.user_email} does not exist`);
    if(!author.activated)
      throw new ApplicationError(HTTPStatus.FORBIDDEN, "Activate your account first");
    const post: Post = await PostInstance.createNewPost(postData);

    return post;
  }

  public static async handlePostMedia(postData: IHandleMediaData) { /* Finish file handling */
    const post = await PostInstance.getPostById(postData.post_id);
    if(!post)
      throw new ApplicationError(HTTPStatus.NOT_FOUND, `Post with id ${postData.post_id} not found`);
    const media = readdir(path.resolve("src", `_media/${postData.files_path}`), (files) => {
      for(const name of files.name) {
        console.info(`File ${name} was saved to DB`);
      }
    });
  }
}