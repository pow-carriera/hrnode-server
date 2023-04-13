import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY || "secret";

const generateAccessToken = (id: string) => {
  return jwt.sign(id, SECRET_KEY, { expiresIn: "1800s" });
};

export { generateAccessToken };
