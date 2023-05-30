import express from "express";
import * as calendarEventService from "../controllers/calendarevent.controller";
import createHttpError from "http-errors";

export const calendarEventRouter = express.Router();

calendarEventRouter.post("/", async (req, res, next) => {
  try {
    const data = await calendarEventService.createEvent(req.body);
    res.json({ data }).status(200);
  } catch (error) {
    next(createHttpError(400, `Bad Request. ${error}`));
  }
});

calendarEventRouter.get("/", async (req, res, next) => {
  try {
    const data = await calendarEventService.findAllEvents();
    res.json({ data }).status(200);
  } catch (error) {
    next(createHttpError(400, `Bad Request. ${error}`));
  }
});

calendarEventRouter.get("/:userId", async (req, res, next) => {
  try {
    const data = await calendarEventService.findManyEventsWithUserId(
      req.params.userId as string
    );
    res.json({ data }).status(200);
  } catch (error) {
    next(createHttpError(400, `Bad Request. ${error}`));
  }
});

calendarEventRouter.delete("/:id", async (req, res, next) => {
  try {
    const data = await calendarEventService.deleteOneEventWithId(
      req.params.id as string
    );
    res.json({ data }).status(200);
  } catch (error) {
    next(createHttpError(400, `Bad Request. ${error}`));
  }
});
