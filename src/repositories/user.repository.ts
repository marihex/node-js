// import type { IUser } from "../interfaces/user.interface.js";
// import { read, write } from "../services/fs.service.js";
//
// class UserRepository {
//   public async getList(): Promise<IUser[]> {
//     return await read();
//   }
//
//   public async create(dto: Partial<IUser>): Promise<{
//     id: number;
//     name: string | undefined;
//     email: string | undefined;
//     password: string | undefined;
//   }> {
//     const users = await read();
//
//     const newUser = {
//       id: users.length ? users[users.length - 1]?.id + 1 : 1,
//       name: dto.name,
//       email: dto.email,
//       password: dto.password,
//     };
//     users.push(newUser);
//     await write(users);
//
//     return newUser;
//   }
//
//   public async getById(userId: number): Promise<IUser | null> {
//     const users = await read();
//     return users.find((user) => user.id === userId);
//   }
// }
//
// export const userRepository = new UserRepository();
