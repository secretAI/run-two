import { UserDto } from "../../../database/index";
import { AuthService, IJwtPayload, JwtTokenPair } from "../../../service/auth/index";
import { getDotEnv } from "../../../utils/env";
import { ApplicationError, HTTPStatus } from "../../../utils/etc";
import { removeTestData, testAcc } from "..";

describe("Jwt test", () => {
  beforeAll(async () => {
    await removeTestData();
    await AuthService.createNewAccount(testAcc);
  });

  afterAll(async () => {
    await removeTestData();
  })

  it("Should verify both JWT", async () => {
    const tokens: JwtTokenPair = await AuthService.loginIntoAccount(testAcc);
    const validation: IJwtPayload[] = [
      AuthService.validateToken(tokens.access, getDotEnv("jwt_secret_access")),
      AuthService.validateToken(tokens.refresh, getDotEnv("jwt_secret_refresh"))
    ];
    validation.forEach(payload => {
      expect(payload).toBeTruthy();
      expect(payload.dto.email).toBe(testAcc.email);
    });
  });
})