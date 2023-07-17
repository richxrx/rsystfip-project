export interface IPayload {
  userId: number;
  email: string;
  role: string;
  permissions: Array<string>;
  iat: number;
  exp: number;
}
