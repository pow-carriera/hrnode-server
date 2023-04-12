import express from "express";
import { Request, Response } from "express";
import * as userService from "../controllers/user.controller";

export const userRouter = express.Router();

userRouter.get("/", async (req: Request, res: Response) => {
  const sort = req.query.sort;
  const sortBy = req.query.sortBy;
  try {
    const users = await userService.getUsers();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).json({
      error: 400,
      message: "Something went wrong with the database."
    });
  }
});

userRouter.post("/", async (req: Request, res: Response) => {
  const input = req.body;

})
