import express from "express";
import * as timeService from "../controllers/time.controller";
export const timeRouter = express.Router();
import type { TimeRecord } from "@prisma/client";

timeRouter.post("/:id", async (req, res) => {
  const id = req.params.id;
  const data = timeService.TimeInUser(id);

  res.status(200).json({
    status: 200,
    message: "OK."
  });
});
