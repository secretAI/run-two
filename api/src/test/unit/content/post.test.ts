import { removeTestData, testAcc } from "..";
import { Database, Post, PostInstance} from "../../../database/";
import { AuthService } from "../../../service/auth/";
import { ContentService } from "../../../service/content";
import { ApplicationError, HTTPStatus } from "../../../utils/etc";

describe("Post service Test", () => {
  afterAll(async () => {
    await removeTestData();
    await Database.closeConnection();
    console.info("[Test:Posts] AfterAll hook - success");
  })

  it("Should create a new post by existing user", async () => {
    await AuthService.createNewAccount(testAcc);
    const post: Post = await ContentService.createNewPost({
      user_email: testAcc.email,
      title: "title",
      body: "body"
    });

    expect(post).toBeTruthy();
    expect(post.user_email).toBe(testAcc.email);
    expect(post.media).toBeNull();
  });

  /* ToDo: 
    1. Tests for saving media's buffer into db and getting it back correctly`
  */
})
