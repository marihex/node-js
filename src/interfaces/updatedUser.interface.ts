import type { IUser } from "./user.interface.js";

export type UpdateUserDto = Omit<IUser, "id">;
