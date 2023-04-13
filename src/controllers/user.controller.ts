import { db } from "../utils/database";

import { User } from "@prisma/client";
import { userCreate, userSelect, userSelectParam } from "../utils/localtypes";

export const getUsers = async (
  query: userSelectParam
): Promise<Omit<User[] | null, "password">> => {
  if (query.sortBy === undefined) {
    query.sortBy = "lastName";
  }
  const sortObj = {
    profile: {
      [query.sortBy]: query.sort,
    },
  };

  const users = db.user.findMany({
    select: {
      id: true,
      username: true,
      profile: query.profile,
    },
    orderBy: sortObj,
  });
  return users;
};

export const createUser = async (input: userCreate): Promise<User> => {
  return db.user.create({
    data: {
      ...input.user,
      profile: {
        create: input.profile,
      },
    },
  });
};
export const updateUser = async (input: userSelect): Promise<User | null> => {
  return db.user.delete({
    where: {
      ...input.user,
    },
  });
};
