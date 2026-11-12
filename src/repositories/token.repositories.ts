import type { IToken } from "../interfaces/token.interfaces.js";
import { Token } from "../models/tokens.model.js";

class TokenRepository {
  public async create(dto: Partial<IToken>): Promise<IToken> {
    return await Token.create(dto);
  }

  public async findByParams(params: Partial<IToken>): Promise<IToken | null> {
    return await Token.findOne(params);
  }
  public async getByRefreshToken(refreshToken: string) {
    return await Token.findOne({ refreshToken });
  }

  public async deleteByRefreshToken(refreshToken: string): Promise<void> {
    await Token.deleteOne({ refreshToken });
  }
}

export const tokenRepository = new TokenRepository();
