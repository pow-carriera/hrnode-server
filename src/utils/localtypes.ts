import { User, Profile } from '@prisma/client'

export type userCreator = {
  user: Omit<User, "id">,
  profile: Omit<Profile, "userId">
};

export type userUpdater = {
  user: Omit<User, "username" | "password">
}