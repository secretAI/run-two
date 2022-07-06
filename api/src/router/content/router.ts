import { Request, Response, Router } from "express";
import { HTTPStatus } from "../../utils/etc";
import { PostInstance, Post, Database } from "../../database/";
import { ContentService } from "../../service/content/";
import { ICreatePostReq } from "./interfaces";
import { authMiddleware } from "../../middleware/auth/";
import multer, { Multer } from "multer";
import path from "path";

export class ContentRouter {
  private readonly router: Router;
  private readonly baseUrl: string;
  private readonly multer: Multer;

  constructor(baseUrl: string) {
    this.router = Router();
    this.baseUrl = baseUrl;
    this.multer = multer({
      storage: multer.diskStorage({
        destination: path.resolve("src", "_media"),
      })
    });
    this.initRoutes();
  }

  private initRoutes(): void {  
    this.router.get(this.baseUrl, authMiddleware, this.getAllPosts);
    this.router.post(
      `${this.baseUrl}/new`, 
      [authMiddleware, this.multer.array("image")], 
      this.createNewPost
    );
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
