import express from "express";
import { Request, Response } from "express";
import * as userService from "../controllers/user.controller";
import { userCreate, userSelectParam } from "../utils/localtypes";

export const userRouter = express.Router();

userRouter.get("/", async (req: Request, res: Response) => {
  req.accepts("application/json");
  const query: userSelectParam = {
    profile: req.query.profile === "true",
    sort: req.query.sort?.toString(),
    sortBy: req.query.sortBy?.toString(),
  };

  try {
    const users = await userService.getUsers(query);
    res.status(200).send(users);
  } catch (error) {
    res.status(400).json({
      error: 400,
      message: `Bad request. ${error}`,
    });
  }
});

userRouter.post("/", async (req: Request, res: Response) => {
  req.accepts("application/json");
  try {
    const input: userCreate = req.body;
    const user = await userService.createUser(input);
    res.status(200).json({
      data: {
        id: user.id,
      },
      status: 200,
      message: `OK.`,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: `Bad request. ${error}`,
    });
  }
});
