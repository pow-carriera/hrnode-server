import { User, Profile } from "@prisma/client";
export type userCreate = {
  user: Omit<User, "id">;
  profile: Omit<Profile, "userId">;
};

export type userSelect = {
  user: Omit<User, "username" | "password">;
};

export type userSelectParam = {
  profile: boolean;
  sort: string | undefined;
  sortBy: string | undefined;
};
