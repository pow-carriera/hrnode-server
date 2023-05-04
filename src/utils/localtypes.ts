import { User, Profile, transactionType, Transaction } from "@prisma/client";

export type UserJwt = {
  jwt: string;
};

export type UserCreate = {
  user: Omit<User, "id">;
  profile: Omit<Profile, "userId">;
};

export type UserSelect = {
  user: Omit<User, "username" | "password" | "role">;
  attendance: object | null;
};

export type UsersSelectParam = {
  profile: boolean;
  sort: string | undefined;
  sortBy: string | undefined;
};

export type UserUniqueSelectParam = {
  id: string;
  profile: boolean;
  timeRecord: boolean;
  transaction: boolean;
};

export type selectUserTransaction = {
  userId: string;
  transactionType: any;
  profile: boolean;
};

export type CreateTransaction = Omit<
  Pick<
    Transaction,
    "transactionType" | "userId" | "startDate" | "endDate" | "description"
  >,
  "createdAt" | "updatedAt" | "id"
>;

export type Attendance = {
  attendance: object | null;
};
