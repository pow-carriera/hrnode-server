import { db } from "../utils/database";
import type { TimeRecord } from "@prisma/client";
import moment from "moment";

export const checkRecordToday = async (
  userId: string
): Promise<TimeRecord | null> => {
  return await db.timeRecord.findFirst({
    where: {
      userId,
      recordDate: moment().format("L")
    }
  });
};

export const timeInUser = async (
  userId: string
): Promise<TimeRecord | null> => {
  return await db.timeRecord.create({
    data: {
      userId,
      recordDate: moment().format("L"),
      timeIn: moment().toDate()
    }
  });
};

export const timeOutUser = async (id: string): Promise<TimeRecord> => {
  return await db.timeRecord.update({
    where: {
      id
    },
    data: {
      timeOut: moment().toDate()
    }
  });
};

export const getAttendancesfromUser = async (userId: string) => {
  return await db.timeRecord.findMany({
    where: {
      userId
    },
    orderBy: {
      recordDate: "desc"
    }
  });
};

export const getAttendances = async () => {
  return await db.timeRecord.findMany({
    orderBy: [
      {
        recordDate: "desc"
      },
      {
        user: {
          profile: {
            lastName: "asc"
          }
        }
      }
    ],
    include: {
      user: {
        select: {
          profile: {
            select: {
              lastName: true,
              firstName: true,
              middleName: true,
              contactNumber: true,
              employmentType: true,
              department: true,
              supervisor: true
            }
          }
        }
      }
    }
  });
};
