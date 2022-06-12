import { Request, Response, Router } from "express";
import { HTTPStatus } from "../../utils/etc";
import { User } from "../../database/models/users/interfaces";
import { AuthService } from "../../service/auth";
import { PostInstance } from "../../database/models/posts/instance";
import { Post } from "../../database/models/posts/interfaces";
import { ContentService } from "../../service/content";
import { ICreatePostReq } from "./interfaces";

export class ContentRouter {
  private readonly router: Router;
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.router = Router();
    this.baseUrl = baseUrl;
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get(this.baseUrl, this.getAllPosts);
    this.router.post(`${this.baseUrl}/new`, this.createNewPost);
  }

  private async getAllPosts(req: Request, res: Response): Promise<void> {
    const response = await PostInstance.getAllPosts();

    res.status(HTTPStatus.SUCCESS)
      .json(response);
  }

  private async createNewPost(req: Request, res: Response): Promise<void> {
    const response: Post = await ContentService.createNewPost(req.body as ICreatePostReq);

    res.status(HTTPStatus.SUCCESS)
      .json(response);
  }
};
