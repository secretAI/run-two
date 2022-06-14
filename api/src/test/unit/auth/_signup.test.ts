import { removeTestData, testAcc } from "../utils";
import { User } from "../../../database/models/users/interfaces";
import { AuthService } from "../../../service/auth";

describe("SignUp Demo", () => {
  beforeAll(async () => {
    await removeTestData();
    console.info("[Test:Signup] BeforeAll hook - success");
  });

  afterAll(async () => {
    await removeTestData();
    console.info("[Test:Signup] AfterAll hook - success");
  });

  it("Should create a new User", async () => {
    const user: User = await AuthService.createNewAccount(testAcc);
  
    expect(user).toBeTruthy();
    expect(user.password).not.toBe(testAcc.password); /* Password should now be encrypted */
  });
});
