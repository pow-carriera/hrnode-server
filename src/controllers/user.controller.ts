import { db } from "../utils/database";
import { User, Profile } from "@prisma/client";
import {
  userCreate,
  usersSelectParam,
  userUniqueSelectParam
} from "../utils/localtypes";
import bcrypt from "bcrypt";

export const getUsers = async (
  query: usersSelectParam
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

export const getUniqueUser = async (query: userUniqueSelectParam) => {
  const { id, profile, attendance } = query;
  let user = db.user.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      username: true,
      profile
    }
  });
  return user;
};

export const createUser = async (input: userCreate): Promise<User> => {
  let user = db.user.create({
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
    },
    include: {
      profile: true
    }
  });
};
