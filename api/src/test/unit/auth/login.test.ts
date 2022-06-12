import { testAcc } from "..";
import pg from "../../../database/index";
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

    expect(tokens).toBeDefined();
    expect(Object.values(tokens)).toHaveLength(2);
  });
})