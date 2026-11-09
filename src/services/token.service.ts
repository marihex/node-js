import jwt from "jsonwebtoken";

import { config } from "../configs/config.js";
import { TokenTypeEnum } from "../enums/token-type.enum.js";
import { ApiError } from "../errors/api.errors.js";
import type {
  ITokenPair,
  ITokenPayload,
} from "../interfaces/token.interfaces.js";

class TokenService {
  public generateTokens(payload: ITokenPayload): ITokenPair {
    const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET as string, {
      expiresIn: config.JWT_ACCESS_EXPIRATION as any,
    });

    const refreshToken = jwt.sign(
      payload,
      config.JWT_REFRESH_SECRET as string,
      {
        expiresIn: config.JWT_REFRESH_EXPIRATION as any,
      },
    );

    return { accessToken, refreshToken };
  }

  public verifyToken(token: string, type: TokenTypeEnum): ITokenPayload {
    let secret: any;
    try {
      switch (type) {
        case TokenTypeEnum.ACCESS:
          secret = config.JWT_ACCESS_SECRET;
          break;
        case TokenTypeEnum.REFRESH:
          secret = config.JWT_REFRESH_SECRET;
          break;
      }
      return jwt.verify(token, secret) as ITokenPayload;
    } catch {
      throw new ApiError("Invalid JWT token", 401);
    }
  }
}

export const tokenService = new TokenService();
