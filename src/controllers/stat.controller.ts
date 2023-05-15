import { userInfo } from "os";
import { db } from "../utils/database";
import moment from "moment";

export const readTimeRecordStats = async () => {
  return db.timeRecord.count({
    where: {
      recordDate: moment().format("L")
    },
    select: {
      timeIn: true,
      timeOut: true
    }
  });
};
