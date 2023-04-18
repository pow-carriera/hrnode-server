import { db } from "../utils/database";
import type { TimeRecord } from "@prisma/client";
import moment from "moment";

export const timeInUser = async (
  userId: string
): Promise<TimeRecord | null> => {
  let record = await db.timeRecord.findFirst({
    where: {
      userId,
      recordDate: moment().format("L")
    }
  });
  if (record === null) {
    return await db.timeRecord.create({
      data: {
        userId,
        recordDate: moment().format("L"),
        timeIn: moment().toDate()
      }
    });
  } else {
    return null;
  }
};

export const timeOutUser = async (
  userId: string
): Promise<TimeRecord | null> => {
  const record = await db.timeRecord.findFirst({
    where: {
      userId,
      recordDate: moment().format("L")
    }
  });
  let update;
  if (record?.timeOut != null) return null;
  update = await db.timeRecord.update({
    where: {
      id: record?.id
    },
    data: {
      timeOut: moment().toDate()
    }
  });

  return update;
};
