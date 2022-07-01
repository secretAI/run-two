import { removeTestData, testAcc } from "..";
import { Database, Post, PostInstance} from "../../../database/";
import { AuthService } from "../../../service/auth/";

describe("Post service Demo", () => {
  beforeAll(async () => {
    await removeTestData();
    await AuthService.createNewAccount(testAcc);
  });

  afterAll(async () => {
    await removeTestData();
    await Database.closeConnection();
  })

  it("Should create a new post by existing user", async () => {
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
