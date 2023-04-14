import { User } from "@prisma/client";
import { db } from "../utils/database";
import { UserJwt } from "../utils/localtypes";
import { auth } from "../middlewares/middlewares";
import createError from "http-errors";
import bcrypt from "bcrypt";

export const logInUser = async (
  data: Pick<User, "username" | "password">
): Promise<Pick<User, "id" | "username"> & UserJwt> => {
  const { username, password } = data;
  const user = await db.user.findUniqueOrThrow({
    where: {
      username
    },
    select: {
      id: true,
      username: true,
      password: true
    }
  });

  const userData = {
    ...user,
    jwt: auth.generateAccessToken(user.id)
  };
  return userData;
};
