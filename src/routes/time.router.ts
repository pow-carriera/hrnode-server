import express from "express";
import * as timeService from "../controllers/time.controller";
export const timeRouter = express.Router();
import createHttpError from "http-errors";

timeRouter.post("/in/:userId", async (req, res, next) => {
  const record = await timeService.checkRecordToday(req.params.userId);

  if (record?.remark === "Absent") {
    res.status(401).json({
      status: 401,
      message: "Unauthorized. Employee is absent."
    });
    return;
  }

  if (record?.timeIn != null) {
    res
      .status(202)
      .json({ status: 202, message: "Accepted. Employee can time out." });
    return;
  }

  const data = await timeService.timeInUser(req.params.userId);

  res.status(200).json({
    status: 200,
    message: "OK. Record successfully created.",
    data
  });
  return;
});

timeRouter.post("/out/:userId", async (req, res, next) => {
  const record = await timeService.checkRecordToday(req.params.userId);

  if (record?.timeOut != null) {
    next(createHttpError(401, "Unauthorized. Employee already timed out."));
    return;
  }
  if (record?.remark === "Absent") {
    next(createHttpError(401, "Unauthorized. Employee absence is recorded."));
    return;
  }

  if (record === null) {
    next(createHttpError(400, "Bad request. No user or record found."));
    return;
  }

  const data = await timeService.timeOutUser(record.id);

  res.status(200).json({
    status: 200,
    message: "OK. Record successfully updated.",
    data
  });
});

timeRouter.get("/:id", async (req, res, next) => {
  const timeOfUser = await timeService.getAttendancesfromUser(req.params.id);
  res.status(200).json(timeOfUser);
});

timeRouter.get("/", async (req, res, next) => {
  const data = await timeService.getAttendances();
  res.status(200).json(data);
});
