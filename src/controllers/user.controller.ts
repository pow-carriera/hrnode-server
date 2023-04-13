import { db } from "../utils/database";

import { User } from "@prisma/client";
import { userCreate, userSelect, userSelectParam } from "../utils/localtypes";

export const getUsers = async (
  query: userSelectParam
): Promise<User[] | null> => {
  if (query.sortBy === undefined) {
    query.sortBy = "lastName";
  }
  const sortObj = {
    profile: {
      [query.sortBy]: query.sort,
    },
  };
  return db.user.findMany({
    orderBy: sortObj,
    include: {
      profile: query.profile,
    },
  });
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
