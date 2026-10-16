import { ApiError } from "../errors/api.errors.js";
import type { UpdateUserDto } from "../interfaces/updetedUser.interface.js";
import type { IUser } from "../interfaces/user.interface.js";
import { userRepository } from "../repositories/user.repository.js";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }

  public async create(dto: Partial<IUser>): Promise<IUser> {
    if (!dto.name || dto.name.length < 3) {
      throw new ApiError(
        "Name is required and should be at least 3 characters long",
        400,
      );
    }
    if (!dto.email || !dto.email.includes("@")) {
      throw new ApiError("Email is required and should be valid", 400);
    }
    if (!dto.password || dto.password.length < 6) {
      throw new ApiError(
        "Password is required and should be at least 6 characters long",
        400,
      );
    }
    return await userRepository.create(dto);
  }

  public async getById(userId: string): Promise<IUser> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }

  public async delete(userId: string): Promise<void> {
    await userRepository.delete(userId);
  }

  public async update(
    userId: string,
    dto: UpdateUserDto,
  ): Promise<IUser | null> {
    const { name, email, password } = dto;

    if (typeof name !== "string" || name.length < 3) {
      throw new ApiError("Incorrect name", 400);
    }

    if (typeof email !== "string" || !email.includes("@")) {
      throw new ApiError("Incorrect email", 400);
    }

    if (typeof password !== "string" || password.length < 6) {
      throw new ApiError("Incorrect password", 400);
    }

    return await userRepository.update(userId, dto);
  }

  // public async patchUser(
  //   userId: string,
  //   dto: Partial<UpdateUserDto>,
  // ): Promise<IUser> {
  //   if (
  //     dto.name !== undefined &&
  //     (typeof dto.name !== "string" || dto.name.length < 3)
  //   ) {
  //     throw new ApiError("Name must contain at least 3 characters", 400);
  //   }
  //
  //   if (
  //     dto.email !== undefined &&
  //     (typeof dto.email !== "string" || !dto.email.includes("@"))
  //   ) {
  //     throw new ApiError("Incorrect email", 400);
  //   }
  //
  //   if (
  //     dto.password !== undefined &&
  //     (typeof dto.password !== "string" || dto.password.length < 6)
  //   ) {
  //     throw new ApiError("Password must contain at least 6 characters", 400);
  //   }
  //
  //   return await userRepository.patchUser(userId, dto);
  // }
}

export const userService = new UserService();
