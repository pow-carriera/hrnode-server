import express from "express";
import * as timeService from "../controllers/time.controller";
export const timeRouter = express.Router();
import createHttpError from "http-errors";

timeRouter.post("/in/:userId", async (req, res, next) => {
  const userRecord = await timeService.checkRecordToday(req.params.userId);

  if (userRecord != null) {
    next(createHttpError(400, "Bad request. Employee is already timed in."));
    return;
  }

  res.status(200).json({
    status: 200,
    message: "OK. Record successfully created.",
    data: await timeService.timeInUser(req.params.userId)
  });
});

timeRouter.post("/out/:userId", async (req, res, next) => {
  const userRecord = await timeService.checkRecordToday(req.params.userId);

  if (userRecord?.timeOut) {
    next(createHttpError(400, "Bad request. Employee already timed out."));
    return;
  }

  if (userRecord === null) {
    next(createHttpError(400, "Bad request. No user or record found."));
    return;
  }

  res.status(200).json({
    status: 200,
    message: "OK. Record successfully updated.",
    data: await timeService.timeOutUser(userRecord.id)
  });
});

timeRouter.get("/:id", async (req, res, next) => {
  const userId: any = req.params.id;
  const timeOfUser = await timeService.getAttendancesfromUser(userId);

  res.status(200).json(timeOfUser);
});

timeRouter.get("/", async (req, res, next) => {
  const data = await timeService.getAttendances();
  res.status(200).json(data);
});
