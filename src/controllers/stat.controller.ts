import { userInfo } from "os";
import { db } from "../utils/database";
import moment from "moment";

export const readTimeRecordStats = async (date = moment().format("L")) => {
  return db.timeRecord.count({
    where: {
      recordDate: date
    },
    select: {
      timeIn: true,
      timeOut: true
    }
  });
};

export const readPresentEmployees = async (date = moment().format("L")) => {
  return db.user.count({
    where: {
      OR: [
        {
          timeRecord: {
            some: {
              recordDate: date,
              remark: "Early"
            }
          }
        },
        {
          timeRecord: {
            some: {
              recordDate: date,
              remark: "OnTime"
            }
          }
        }
      ]
    }
  });
};

export const readOnLeaveEmployees = async (date = moment().format("L")) => {
  return db.user.count({
    where: {
      timeRecord: {
        some: {
          recordDate: date,
          remark: "Leave"
        }
      }
    }
  });
};

export const readTotalEmployees = async () => {
  return db.user.count();
};
