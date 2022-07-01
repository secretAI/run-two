import { removeTestData, testAcc } from "..";
import { Database, Post, PostInstance} from "../../../database/";
import { AuthService } from "../../../service/auth/";

describe("Post service Demo", () => {
  afterAll(async () => {
    await removeTestData();
    await Database.closeConnection();
    console.info("[Test:Posts] AfterAll hook - success");
  })

  it("Should create a new post by existing user", async () => {
    await AuthService.createNewAccount(testAcc);
    const post: Post = await PostInstance.createNewPost({
      user_email: testAcc.email,
      title: "title",
      body: "body"
    });

    expect(post).toBeTruthy();
    expect(post.user_email).toBe(testAcc.email);
    expect(post.media).toBeNull();
  });
})
