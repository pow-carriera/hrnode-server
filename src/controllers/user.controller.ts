import { db } from "../utils/database";

import { User } from "@prisma/client";
import { userCreator, userUpdater } from "../utils/localtypes";

export const getUsers = async (): Promise<User[] | null> => {
  return db.user.findMany();
};

export const createUser = async (input: userCreator): Promise<User> => {
  return db.user.create({
    data: {
      ...input.user,
      profile: {
        create: input.profile,
      },
    },
  });
};
export const updateUser = async (input: userUpdater): Promise<User | null> => {
  return db.user.delete({
    where: {
      ...input.user,
    },
  });
};
