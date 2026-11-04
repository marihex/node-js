import { ApiError } from "../errors/api.errors.js";
import type {
  ITokenPair,
  ITokenPayload,
} from "../interfaces/token.interfaces.js";
import type { ISignIn, IUser } from "../interfaces/user.interface.js";
import { tokenRepository } from "../repositories/token.repositories.js";
import { userRepository } from "../repositories/user.repository.js";
import { passwordService } from "./password.service.js";
import { tokenService } from "./token.service.js";

class AuthService {
  public async signUp(
    dto: Partial<IUser>,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    await this.isEmailExistOrThrow(<string>dto.email);
    const password = await passwordService.hashPassword(<string>dto.password);
    const user = await userRepository.create({ ...dto, password });

    const tokens = tokenService.generateTokens({
      userId: user._id!,
      role: user.role,
    });

    await tokenRepository.create({ ...tokens, _userId: user._id! });

    return { user, tokens };
  }

  public async signIn(
    dto: ISignIn,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    const user = await userRepository.getByEmail(dto.email);
    if (!user) {
      throw new ApiError("user not found", 404);
    }

    const ifPasswordCorrect = await passwordService.comparePassword(
      dto.password,
      user.password,
    );
    if (!ifPasswordCorrect) {
      throw new ApiError("password incorrect", 401);
    }

    const tokens = tokenService.generateTokens(<ITokenPayload>{
      userId: user._id,
      role: user.role,
    });
    await tokenRepository.create({ ...tokens, _userId: user._id! });
    return { user, tokens };
  }

  private async isEmailExistOrThrow(email: string): Promise<void> {
    const user = await userRepository.getByEmail(email);
    if (user) {
      throw new ApiError("Email already exist", 409);
    }
  }
}

export const authService = new AuthService();
