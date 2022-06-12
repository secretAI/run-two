export interface ISignUpData {
  email: string;
  password: string;
}

export interface ILoginData extends ISignUpData {}

export type JwtTokenPair = {
  access: string;
  refresh: string;
}
