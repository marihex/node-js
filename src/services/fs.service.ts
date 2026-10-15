import fs from "node:fs/promises";
import path from "node:path";

import type { IUser } from "../interfaces/user.interface.js";

const read = async (): Promise<IUser[]> => {
  try {
    const pathToFile = path.join(process.cwd(), "db.json");
    const data = await fs.readFile(pathToFile, "utf-8");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    if (e instanceof Error) {
      console.log("Ошибка чтения файла:", e.message);
    } else {
      console.log("Неизвестная ошибка:", e);
    }

    throw e;
  }
};

const write = async (users: IUser[]): Promise<void> => {
  try {
    const pathToFile = path.join(process.cwd(), "db.json");
    await fs.writeFile(pathToFile, JSON.stringify(users));
  } catch (e) {
    if (e instanceof Error) {
      console.log("Ошибка чтения файла:", e.message);
    } else {
      console.log("Неизвестная ошибка:", e);
    }

    throw e;
  }
};

export { read, write };
