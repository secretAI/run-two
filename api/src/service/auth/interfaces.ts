export interface IAuthData {
  email: string;
  password: string;
}

export type JwtTokenPair = {
  access: string;
  refresh: string;
}
