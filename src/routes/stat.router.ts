import express from "express";
import * as statService from "../controllers/stat.controller";
export const statRouter = express.Router();

statRouter.get("/attendances", async (req, res, next) => {
  const data = await statService.readTimeRecordStats(req.query.date as string);
  res.status(200).json({ data });
});

statRouter.get("/users", async (req, res, next) => {
  const data = {
    present: await statService.readPresentEmployees(),
    leave: await statService.readOnLeaveEmployees(),
    total: await statService.readTotalEmployees(),
    absent: 0
  };
  data.absent = data.total - data.present;

  res.status(200).json({ data });
});
