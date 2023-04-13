import { db } from "../utils/database";
import { User, Profile } from "@prisma/client";
import {
  userCreate,
  userSelect,
  userSelectParam,
  UserJwt
} from "../utils/localtypes";
import bcrypt from "bcrypt";

export const getUsers = async (
  query: userSelectParam
): Promise<Omit<User[] | null, "password">> => {
  if (query.sortBy === undefined) {
    query.sortBy = "lastName";
  }
  const sortObj = {
    profile: {
      [query.sortBy]: query.sort
    }
  };

  const users = db.user.findMany({
    select: {
      id: true,
      username: true,
      profile: query.profile
    },
    orderBy: sortObj
  });
  return users;
};

export const createUser = async (input: userCreate): Promise<User> => {
  const { user } = input;
  let hashString: string;
  const hash = bcrypt.hashSync(user.password, 10);

  let data = db.user.create({
    data: {
      username: user.username,
      password: hash,
      profile: {
        create: input.profile
      }
    }
  });

  return data;
};
export const updateUser = async (
  id: string,
  data: userCreate
): Promise<User | null> => {
  return db.user.update({
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

export const deleteUser = async (id: string): Promise<User | null> => {
  return db.user.delete({
    where: {
      id
    }
  });
};
