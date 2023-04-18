import express from "express";
import * as timeService from "../controllers/time.controller";
export const timeRouter = express.Router();
import type { TimeRecord } from "@prisma/client";

timeRouter.post("/in/:id", async (req, res) => {
  const id = req.params.id;
  const data = await timeService.timeInUser(id);
  if (data === null) {
    res.status(400).json({
      status: 400,
      message: "Bad Request. Already timed in at the current day."
    });
  } else {
    res.status(200).json({
      status: 200,
      message: "OK."
    });
  }
});

timeRouter.post("/out/:id", async (req, res) => {
  const id = req.params.id;
  const data = await timeService.timeOutUser(id);
  res.status(200).json({ data });
});
