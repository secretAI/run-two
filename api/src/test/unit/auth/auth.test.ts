import { removeTestData, testAcc } from "..";
import { Database, UserInstance } from "../../../database";
import { User } from "../../../database/models/users/interfaces";
import { AuthService, IJwtPayload, JwtTokenPair } from "../../../service/auth";
import { getDotEnv } from "../../../utils/env";

describe("Auth Test", () => {
  afterAll(async () => {
    await removeTestData();
    await Database.closeConnection();
    console.info("[Test:Auth] AfterAll hook - success");
  });

  it("Should create a new User", async () => {
    const user: User = await AuthService.createNewAccount(testAcc);    
    await AuthService.activateAccount(user.aid);
  
    expect(user).toBeTruthy();
    expect(user.password).not.toBe(testAcc.password); 
    /* Password in db is encrypted */
  });

  it("Should login into test account & validate 2 JWTs", async () => {
    const tokens: JwtTokenPair = await AuthService.loginIntoAccount(testAcc);
    const validation: IJwtPayload[] = [
      AuthService.validateToken(tokens.access, getDotEnv("jwt_secret_access")),
      AuthService.validateToken(tokens.refresh, getDotEnv("jwt_secret_refresh"))
    ];
    
    expect(tokens).toBeTruthy();
    expect(Object.values(tokens)).toHaveLength(2);
    validation.forEach(payload => {
      expect(payload).toBeTruthy();
      expect(payload.dto.email).toBe(testAcc.email);
    });
  });
});
