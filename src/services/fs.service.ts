import fs from "node:fs/promises";
import path from "node:path";

import type { IUser } from "../interfaces/user.interface.js";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const read = async (): Promise<IUser[]> => {
  try {
    const pathToFile = path.join(process.cwd(), "db.json");
    const data = await fs.readFile(pathToFile, "utf-8");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    console.log("Ошибка записи", e.message);
  }
};

const write = async (users: IUser[]): Promise<void> => {
  try {
    const pathToFile = path.join(process.cwd(), "db.json");
    await fs.writeFile(pathToFile, JSON.stringify(users));
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    console.log("Ошибка записи", e.message);
  }
};

export { read, write };
