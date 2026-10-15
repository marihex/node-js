import { ApiError } from "../errors/api.errors.js";
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
}

export const userRepository = new UserRepository();
