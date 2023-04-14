import { User, Profile } from "@prisma/client";

export type UserJwt = {
  jwt: string;
};

export type userCreate = {
  user: Omit<User, "id">;
  profile: Omit<Profile, "userId">;
};

export type userSelect = {
  user: Omit<User, "username" | "password" | "role">;
};

export type usersSelectParam = {
  profile: boolean;
  sort: string | undefined;
  sortBy: string | undefined;
};

export type userUniqueSelectParam = {
  id: string;
  profile: boolean;
  attendance: boolean;
};
