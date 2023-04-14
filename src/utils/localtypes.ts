import { User, Profile } from "@prisma/client";

export type UserJwt = {
  jwt: string;
};

export type UserCreate = {
  user: Omit<User, "id">;
  profile: Omit<Profile, "userId">;
};

export type UserSelect = {
  user: Omit<User, "username" | "password" | "role">;
};

export type UsersSelectParam = {
  profile: boolean;
  sort: string | undefined;
  sortBy: string | undefined;
};

export type UserUniqueSelectParam = {
  id: string;
  profile: boolean;
  attendance: boolean;
};
