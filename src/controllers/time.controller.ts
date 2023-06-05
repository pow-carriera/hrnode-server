import { db } from "../utils/database";
import type { Remark, TimeRecord } from "@prisma/client";
import moment, { Moment } from "moment";

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
  let remark: Remark = "OnTime";

  if (
    moment().isAfter(
      moment().set({ hour: 8, minute: 0, second: 0, millisecond: 0 })
    )
  ) {
    remark = "Late";
  }
  return await db.timeRecord.create({
    data: {
      userId,
      recordDate: moment().format("L"),
      timeIn: moment().toDate(),
      remark: remark
    }
  });
};

export const timeOutUser = async (id: string): Promise<TimeRecord> => {
  const userData = await db.timeRecord.findUnique({
    where: {
      id
    },
    select: {
      timeIn: true,
      timeOut: true
    }
  });
  return await db.timeRecord.update({
    where: {
      id
    },
    data: {
      timeOut: moment().toDate(),
      // I'm so sorry. - Paulo Pertierra
      hoursWorked: Math.floor(
        moment.duration(moment().diff(moment(userData?.timeIn))).asHours()
      )
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

export const createAbsences = async () => {
  const absencees = await db.user.findMany({
    select: {
      id: true
    },
    where: {
      timeRecord: {
        none: {
          recordDate: moment().format("L")
        }
      }
    }
  });
  return await db.timeRecord.createMany({
    data: absencees.map((id) => {
      return {
        userId: id.id,
        recordDate: moment().format("L"),
        timeIn: null,
        timeOut: null,
        remark: "Absent"
      };
    })
  });
};
