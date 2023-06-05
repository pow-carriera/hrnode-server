import cronJob from "node-cron";
import * as timeService from "../controllers/time.controller";

export const createAbsences = () => {
  cronJob
    .schedule("0 17 * * *", () => {
      timeService.createAbsences();
      console.log("OH IT HAPENEEEEED");
    })
    .start();
};
