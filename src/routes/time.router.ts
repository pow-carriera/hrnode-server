import express from "express";
import * as timeService from "../controllers/time.controller";
export const timeRouter = express.Router();
import createHttpError from "http-errors";

timeRouter.post("/in/:userId", async (req, res, next) => {
  const userRecord = await timeService.checkRecordToday(req.params.userId);

  if (userRecord?.timeIn != null || userRecord?.remark != null) {
    next(createHttpError(401, "Unauthorized. Employee already recorded."));
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

  if (userRecord?.timeOut != null) {
    next(createHttpError(401, "Unauthorized. Employee already timed out."));
    return;
  }
  if (userRecord?.remark === "Absent") {
    next(createHttpError(401, "Unauthorized. Employee absence is recorded."));
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
