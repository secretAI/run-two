import { removeTestData, testAcc } from "../utils";
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

  it("Should throw a custom error as account doesn't exist", async () => {
    try {
      await ContentService.createNewPost({
        user_email: "not@here.com",
        title: "title",
        body: "body"
      });
    } catch(err: any) {
      expect(err).toBeInstanceOf(ApplicationError);
      expect(err.status).toBe(HTTPStatus.NOT_FOUND);
      expect(err.message).toBe("User not@here.com does not exist");
    }
  });

  /* ToDo: 
    1. Tests for saving media's buffer into db and getting it back correctly
  */
})
