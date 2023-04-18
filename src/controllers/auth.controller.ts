import { User } from "@prisma/client";
import { db } from "../utils/database";
import { UserJwt } from "../utils/localtypes";
import { auth } from "../middlewares/middlewares";
import createError from "http-errors";
import bcrypt from "bcrypt";

export const logInUser = async (
  data: Pick<User, "username" | "password">
): Promise<(Pick<User, "id" | "username"> & UserJwt) | undefined> => {
  const { username, password } = data;
  const user = await db.user.findUniqueOrThrow({
    where: {
      username
    },
    select: {
      id: true,
      username: true,
      password: true,
      role: true
    }
  });

  const result = bcrypt.compareSync(password, user.password);
  if (!result) {
    return undefined;
  }

  const userData = {
    id: user.id,
    username: user.username,
    jwt: auth.generateAccessToken(user.id)
  };
  return userData;
};