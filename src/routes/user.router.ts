import express from "express";
import { Request, Response } from "express";

import * as userService from "../controllers/user.controller";
import { auth } from "../middlewares/middlewares";
import type {
  UserCreate,
  UsersSelectParam,
  UserUniqueSelectParam
} from "../utils/localtypes";
// API Level Routes
export const userRouter = express.Router();

userRouter.get("/", async (req: Request, res: Response) => {
  req.accepts("application/json");
  const query: UsersSelectParam = {
    profile: req.query.profile === "true",
    sort: req.query.sort?.toString(),
    sortBy: req.query.sortBy?.toString()
  };

  try {
    const users = await userService.getUsers(query);
    res.status(200).send(users);
  } catch (error) {
    res.status(400).json({
      error: 400,
      message: `Bad request. ${error}`
    });
  }
});

userRouter.get("/:id", async (req: Request, res: Response) => {
  const query: UserUniqueSelectParam = {
    id: req.params.id,
    profile: req.query.profile === "true",
    attendance: req.query.attendance === "true"
  };
  try {
    const user = await userService.getUniqueUser(query);
    res.status(200).json(user);
  } catch (error) {
    res.send(400).json({
      error: 400,
      message: `Bad request ${error}`
    });
  }
});

userRouter.post(
  "/",
  // auth.authenticateToken,
  async (req: Request, res: Response) => {
    req.accepts("application/json");
    try {
      const input: UserCreate = req.body;
      const user = await userService.createUser(input);

      const token = auth.generateAccessToken(user.id);

      res.status(200).json({
        data: {
          id: user.id,
          jwt: token
        },
        status: 201,
        message: `Created. User successfully created.`
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: `Bad request. ${error}`
      });
    }
  }
);

userRouter.put("/:id", async (req: Request, res: Response) => {
  req.accepts("application/json");
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(200).json({
      data: {
        id: user!.id
      },
      status: 200,
      message: "OK. User successfully updated."
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: `Bad request. ${error}`
    });
  }
});

userRouter.delete("/:id", async (req: Request, res: Response) => {
  req.accepts("application/json");
  try {
    const user = await userService.deleteUser(req.params.id);

    res.status(200).json({
      data: {
        id: user!.id
      },
      status: 200,
      message: "OK. User successfully deleted."
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: `Bad request. ${error}`
    });
  }
});
