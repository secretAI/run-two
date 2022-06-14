import { http, removeTestData, testAcc, testData } from "../utils";
import { Database, Post, PostInstance, TokenInstance, UserDto } from "../../../database/index";
import { ContentService } from "../../../service/content/index";
import { AuthService } from "../../../service/auth/index";
import { JwtTokenPair } from "../../../router/auth/interfaces";
import { getDotEnv } from "../../../utils/env";
import { ICreatePostData } from "../../../service/content/interfaces";
import { AxiosResponse } from "axios";
import { JwtPayload } from "jsonwebtoken";
import { ApplicationError, HTTPStatus } from "../../../utils/etc";

describe("Post service Demo", () => {
  beforeAll(async () => {
    removeTestData();
    await AuthService.createNewAccount(testAcc);
  });

  afterAll(async () => {
    removeTestData();
  })

  it("Should create a new post by existing user", async () => {
    const post: Post = await PostInstance.createNewPost({
      user_email: testAcc.email,
      title: testData.title,
      body: testData.body
    });

    expect(post).toBeTruthy();
    expect(post.user_email).toBe(testAcc.email);
    expect(post.media).toBeNull();
  });

})
