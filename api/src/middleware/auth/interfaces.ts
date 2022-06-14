export interface IJwtPayload {
  dto: {
    id: string;
    email: string;
    activated: boolean;
    created_at: Date;
  };
  iat: number;
  exp: number;
}
