import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { NextFunction } from "express";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY || "secret";

const generateAccessToken = (id: string) => {
  return jwt.sign(id, SECRET_KEY, { expiresIn: "1800s" });
};

const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).json({
      status: 401,
      message: "Not authorized.",
    });

  jwt.verify(token, process.env.SECRET_KEY as string, (err: any, user: any) => {
    console.log(err);

    if (err) return res.status(403);
    next();
  });
};

export { generateAccessToken, authenticateToken };
