import express from "express";
import * as statService from "../controllers/stat.controller";
export const statRouter = express.Router();

statRouter.get("/attendances", async (req, res, next) => {
  const data = await statService.readTimeRecordStats();
  res.status(200).json({ data });
});
