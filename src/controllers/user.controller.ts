import { db } from "../utils/database";
import { User, Profile } from "@prisma/client";
import {
  UserCreate,
  UsersSelectParam,
  UserUniqueSelectParam
} from "../utils/localtypes";
import bcrypt from "bcrypt";

export const getManyUsers = async (
  query: UsersSelectParam
): Promise<Omit<User[] | null, "password">> => {
  if (query.sortBy === undefined) {
    query.sortBy = "lastName";
  }

  return await db.user.findMany({
    select: {
      id: true,
      username: true,
      profile: query.profile,
      role: true
    },
    orderBy: {
      profile: {
        [query.sortBy]: query.sort
      }
    }
  });
};

export const getUniqueUser = async (query: UserUniqueSelectParam) => {
  const { id, profile, timeRecord, transaction } = query;

  return await db.user.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      username: true,
      role: true,
      profile,
      timeRecord,
      transaction
    }
  });
};

export const createOneUser = async (input: UserCreate): Promise<User> => {
  let user = await db.user.create({
    data: {
      username: input.user.username,
      password: bcrypt.hashSync(input.user.password, 10),
      role: input.user.role,
      profile: {
        create: input.profile
      }
    }
  });

  return user;
};
export const updateOneUser = async (
  id: string,
  data: UserCreate
): Promise<User | null> => {
  return await db.user.update({
    where: {
      id
    },
    data: {
      ...data.user,
      profile: {
        update: data.profile
      }
    }
  });
};

export const deleteOneUser = async (id: string): Promise<User | null> => {
  return await db.user.delete({
    where: {
      id
    },
    include: {
      profile: true
    }
  });
};
