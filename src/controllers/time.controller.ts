import { db } from "../utils/database";
import type { TimeRecord } from "@prisma/client";
import moment from "moment";

export const TimeInUser = async (
  userId: string
): Promise<TimeRecord | null> => {
  let record = await db.timeRecord.findFirst({
    where: {
      userId,
      recordDate: moment().format()
    }
  });

  if (record === null) {
    record = await db.timeRecord.create({
      data: {
        userId,
        recordDate: moment().toDate(),
        timeIn: moment().toDate()
      }
    });
  }
  return record;
};
