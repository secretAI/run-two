import { testAcc } from "..";
import pg from "../../../database/index";
import { TokenInstance } from "../../../database/models/token/instance";
import { RefreshToken } from "../../../database/models/token/interfaces";
import { AuthService } from "../../../service/auth";
import { JwtTokenPair } from "../../../service/auth/interfaces";


describe("Login Demo", () => {  

  afterAll(async () => {
    await pg.createQuery(`
      DELETE FROM users
      WHERE email = '${testAcc.email}';
    `);
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