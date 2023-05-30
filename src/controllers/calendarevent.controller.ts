import moment from "moment";
import { db } from "../utils/database";

type CalendarEvent = {
  userId: string;
  title: string;
  start: string;
  end: string | undefined;
  allDay: boolean;
};

export const createEvent = async (data: CalendarEvent) => {
  return await db.calendarEvent.create({
    data
  });
};

export const findAllEvents = async () => {
  return await db.calendarEvent.findMany();
};

export const findManyEventsWithUserId = async (userId: string) => {
  return await db.calendarEvent.findMany({
    where: {
      userId
    }
  });
};

export const deleteOneEventWithId = async (id: string) => {
  return await db.calendarEvent.delete({
    where: {
      id
    }
  });
};
