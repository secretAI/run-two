import { testAcc } from "../utils";
import { Database } from "../../../database/index";
import { TokenInstance, RefreshToken, UserInstance} from "../../../database/index";
import { AuthService } from "../../../service/auth";
import { JwtTokenPair } from "../../../service/auth/interfaces";


describe("Login Demo", () => {  
  async function removeTestData() {
    await Database.createQuery(`
      BEGIN;

      DELETE FROM users
      WHERE email = '${testAcc.email}';

      DELETE FROM tokens
      WHERE user_email = '${testAcc.email}';

      END;
    `);
  }

  beforeAll(async () => {
    removeTestData();
    await AuthService.createNewAccount(testAcc);
    console.info("[Test:Login] BeforeAll hook - success");
  });

  afterAll(async () => {
    removeTestData();    
    console.info("[Test:Login] AfterAll hook - success");
  });

  it("Should login into test account & return 2 JWTs", async () => {
    const tokens: JwtTokenPair = await AuthService.loginIntoAccount(testAcc);

    expect(tokens).toBeTruthy();
    expect(Object.values(tokens)).toHaveLength(2);
  });

  it("Should contain refresh token saved", async () => {
    const token: RefreshToken = await TokenInstance.getRefreshTokenByEmail(testAcc.email);

    expect(token).not.toBeNull();
    expect(token.user_email).toBe(testAcc.email);
  });
})