import { removeTestData, testAcc, testData } from "..";
import { Post, PostInstance} from "../../../database/";
import { AuthService } from "../../../service/auth/";

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
