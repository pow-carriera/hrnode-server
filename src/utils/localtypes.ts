import { User, Profile } from '@prisma/client'

export type userData = {
  user: User,
  profile: Profile
};