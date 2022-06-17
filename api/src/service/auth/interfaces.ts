export interface IAuthData {
  email: string;
  password: string;
}

export type JwtTokenPair = {
  access: string;
  refresh: string;
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

export interface IActivateAccData {
  email: string;
  code: string;
}
