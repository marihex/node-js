import type { UpdateUserDto } from "../interfaces/updetedUser.interface.js";
import type { IUser } from "../interfaces/user.interface.js";
import { User } from "../models/user.model.js";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await User.find({});
  }

  public async create(dto: Partial<IUser>): Promise<IUser> {
    return await User.create(dto);
  }

  public async getById(userId: string): Promise<IUser | null> {
    return await User.findById(userId);
  }

  public async delete(userId: string): Promise<void> {
    await User.deleteOne({ _id: userId });
  }

  public async update(
    userId: string,
    dto: UpdateUserDto,
  ): Promise<IUser | null> {
    return await User.findByIdAndUpdate(userId, dto, {
      returnDocument: "after",
    });
  }

  // public async patchUser(
  //   userId: string,
  //   dto: Partial<UpdateUserDto>,
  // ): Promise<IUser> {
  //   return {} as IUser;
  // }
}

export const userRepository = new UserRepository();
