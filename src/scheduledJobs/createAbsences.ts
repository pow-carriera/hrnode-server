import cronJob from "node-cron";
import * as timeService from "../controllers/time.controller";

const EVERY_DAY_5PM = "0 17 * * *";

export const createAbsences = () => {
  cronJob
    .schedule(EVERY_DAY_5PM, () => {
      timeService.createAbsences();
      console.log("Absences have been mapped to the database.");
    })
    .start();
};
