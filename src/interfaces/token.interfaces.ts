import type { RoleEnum } from "../enums/role.enum.js";

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface IToken {
  _id?: string;
  accessToken: string;
  refreshToken: string;
  _userId: string;
}

export interface ITokenPayload {
  userId: string;
  role: RoleEnum;
}
