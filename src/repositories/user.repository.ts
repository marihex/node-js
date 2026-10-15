import { ApiError } from "../errors/api.errors.js";
import type { UpdateUserDto } from "../interfaces/updetedUser.interface.js";
import type { IUser } from "../interfaces/user.interface.js";
import { read, write } from "../services/fs.service.js";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await read();
  }

  public async create(dto: Partial<IUser>): Promise<IUser> {
    const users = await read();

    if (
      typeof dto.name !== "string" ||
      typeof dto.email !== "string" ||
      typeof dto.password !== "string"
    ) {
      throw new ApiError("Name, email and password are required", 400);
    }

    const lastUser = users.at(-1);

    const newUser: IUser = {
      id: lastUser ? lastUser.id + 1 : 1,
      name: dto.name,
      email: dto.email,
      password: dto.password,
    };

    users.push(newUser);
    await write(users);

    return newUser;
  }

  public async getById(userId: number): Promise<IUser | undefined> {
    const users = await read();
    return users.find((user) => user.id === userId);
  }

  public async delete(userId: number): Promise<void> {
    const users = await read();
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
      throw new ApiError("User does not exist", 404);
    }
    users.splice(userIndex, 1);
    await write(users);
  }

  public async update(userId: number, dto: UpdateUserDto): Promise<IUser> {
    const users = await read();

    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      throw new ApiError("User does not exist", 404);
    }

    const updatedUser: IUser = {
      ...dto,
      id: userId,
    };

    users[userIndex] = updatedUser;

    await write(users);

    return updatedUser;
  }

  public async patchUser(
    userId: number,
    dto: Partial<UpdateUserDto>,
  ): Promise<IUser> {
    const users = await read();
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
      throw new ApiError("User does not exist", 404);
    }
    const user = users[userIndex];

    if (!user) {
      throw new ApiError("User does not exist", 404);
    }
    const updatedUser: IUser = {
      ...user,
      ...dto,
      id: userId,
    };
    users[userIndex] = updatedUser;

    await write(users);

    return updatedUser;
  }
}

export const userRepository = new UserRepository();
