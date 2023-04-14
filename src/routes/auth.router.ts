import express from "express";
import { Request, Response } from "express";
import * as authService from "../controllers/auth.controller";

import { auth } from "../middlewares/middlewares";
import { User } from "@prisma/client";

// API Level Route: Authentication
export const authRouter = express.Router();

authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    req.accepts("application/json");
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
    res.send(response).status(200);
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: `Bad request. ${error}`
    });
  }
});
