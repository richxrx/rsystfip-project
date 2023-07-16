import { IUser } from "./IUser";

export interface IPayload {
  _id: IUser["id"];
  email: string;
  role: string;
  permissions: Array<string>;
  iat: number;
  exp: number;
}
