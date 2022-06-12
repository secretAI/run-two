import { Request, Response, Router } from "express";
import { HTTPStatus } from "../../utils/etc";
import { PostInstance, Post } from "../../database/index";
import { ContentService } from "../../service/content/index";
import { ICreatePostReq } from "./interfaces";
import { authMiddleware } from "../../middleware/auth/index";

export class ContentRouter {
  private readonly router: Router;
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.router = Router();
    this.baseUrl = baseUrl;
    this.initRoutes();
  }

  private initRoutes(): void {  
    this.router.use(authMiddleware);
    this.router.get(this.baseUrl, this.getAllPosts);
    this.router.post(`${this.baseUrl}/new`, this.createNewPost);
  }

  private async getAllPosts(req: Request, res: Response): Promise<void> {
    const response: Post[] = await PostInstance.getAllPosts();

    res.status(HTTPStatus.SUCCESS)
      .json(response);
  }

  private async createNewPost(req: Request, res: Response): Promise<void> {
    const response: Post = await ContentService.createNewPost(req.body as ICreatePostReq);

    res.status(HTTPStatus.SUCCESS)
      .json(response);
  }
};
