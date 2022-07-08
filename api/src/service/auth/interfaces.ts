export interface IAuthData {
  email: string;
  password: string;
}

export type JwtTokenPair = {
  access: string;
  refresh: string;
}

export interface ICheckActivationData {
  email: string;
}

export interface IJwtPayload {
  email?: string;
  dto?: {
    id: string;
    email: string;
    activated: boolean;
    created_at: Date;
  };
  iat: number;
  exp: number;
}

export interface IValidateTokenData {
  token: JwtTokenPair["access"]|JwtTokenPair["refresh"];
  secret: string;
}
