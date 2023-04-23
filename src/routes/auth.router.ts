import express from "express";
import { Request, Response } from "express";
import * as authService from "../controllers/auth.controller";

import { auth } from "../middlewares/middlewares";
import { User } from "@prisma/client";
import { UserCreate } from "../utils/localtypes";

// API Level Route: Authentication
export const authRouter = express.Router();

authRouter.post("/login", async (req: Request, res: Response) => {
  req.accepts("application/json");
  try {
    const data: Pick<User, "username" | "password"> = {
      username: req.body.username,
      password: req.body.password
    };

    const response = await authService.logInUser(data);
    if (typeof response == "undefined") {
      res.status(401).json({
        status: 401,
        message: "Invalid username or password."
      });
    }
    res.status(200).json({
      status: 200,
      message: "OK. Log in success.",
      data: response
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: `Bad request. ${error}`
    });
  }
});

authRouter.post("/signup", async (req: Request, res: Response) => {
  req.accepts("application/json");
  try {
    const user: Pick<User, "username" | "password" | "role"> = {
      username: req.body.username,
      password: req.body.password,
      role: req.body.role
    };
    const response = await authService.signUpUser(user);

    if (response == null) {
      res.status(400).json({
        status: 400,
        message: `Bad request. Response is: ${response}`
      });
      return;
    }

    res.status(200).json({
      status: 200,
      message: `Successfully signed up. Waiting for HR-Admin verification`
    })
    return
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: `Bad request. ${error}`
    });
    return
  }
});
