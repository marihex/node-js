import { ApiError } from "../errors/api.errors.js";
import type { UpdateUserDto } from "../interfaces/updatedUser.interface.js";
import type { IUser } from "../interfaces/user.interface.js";
import { User } from "../models/user.model.js";
import { userRepository } from "../repositories/user.repository.js";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }

  private async assertEmailIsFree(email: string, excludeId?: string) {
    const filter: any = { email };
    if (excludeId) filter._id = { $ne: excludeId };

    const exists = await User.exists(filter);
    if (exists) {
      throw new ApiError("Email вже зайнятий", 409);
    }
  }

  // public async create(dto: Partial<IUser>): Promise<IUser> {
  //   await this.assertEmailIsFree(<string>dto.email);
  //   const password = await passwordService.hashPassword(<string>dto.password);
  //   return await userRepository.create({ ...dto, password });
  // }

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
    // const { name, email, password } = dto;

    const user = await userRepository.update(userId, dto);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }

  public async patchUser(
    userId: string,
    dto: Partial<UpdateUserDto>,
  ): Promise<IUser | null> {
    return await userRepository.patchUser(userId, dto);
  }
}

export const userService = new UserService();
