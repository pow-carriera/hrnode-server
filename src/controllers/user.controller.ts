import { type } from 'os';
import { db } from '../utils/database';
import { User, Profile } from '@prisma/client';

export const getUsers = async ():Promise<User[] | null> => {
  return db.user.findMany();
};

export const createUser = async (input: userData):Promise<User> => {
  return db.user.create({
    data: {
      ...input.user,
      profile: {
        create: input.profile
      }
    }
  });
};

export const updateUser = async(input: userData):Promise<User | null> => {
  return db.user.delete({
    where: {
      id: input.user.id
    }
  });
};

type userData = {
  user: User,
  profile: Profile
};