import { removeTestData, testAcc } from "../utils";
import { Database, RefreshToken, RefreshTokenInstance, UserInstance } from "../../../database";
import { User } from "../../../database/models/users/interfaces";
import { AuthService, IJwtPayload, JwtTokenPair } from "../../../service/auth";
import { getDotEnv } from "../../../utils/env-var";

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
      AuthService.validateToken({
        token: tokens.access, 
        secret: getDotEnv("jwt_secret_access")
      }),
      AuthService.validateToken({
        token: tokens.refresh, 
        secret: getDotEnv("jwt_secret_refresh")
      })
    ];
    
    expect(tokens).toBeTruthy();
    expect(Object.values(tokens)).toHaveLength(2);
    validation.forEach(payload => {
      expect(payload).toBeTruthy();
      expect(payload.dto.email).toBe(testAcc.email);
    });
  });

  it("Should return activation status",async () => {
    const status: boolean = await AuthService.checkActivation({
      email: testAcc.email
    });

    expect(status).toBe(true);
  });

  it("Should log out (Delete token from Database)", async () => {
    const reToken: RefreshToken = await AuthService.getRefreshTokenByEmail(testAcc.email);
    const statusMessage: string = await AuthService.logOut({
      reToken: reToken.token
    }); /* Logout then check that token is gone */
    const doesTokenExist: boolean = !!(await AuthService.getRefreshTokenByEmail(testAcc.email));
    
    expect(statusMessage).toBe(`User successfully logged out`);
    expect(doesTokenExist).toBe(false);
  });
});
