"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAbsenceRecords =
  exports.getAbsences =
  exports.readTotalEmployees =
  exports.readOnLeaveEmployees =
  exports.readLateEmployees =
  exports.readPresentEmployees =
  exports.readTimeRecordStats =
    void 0;
const database_1 = require("../utils/database");
const moment_1 = __importDefault(require("moment"));
const readTimeRecordStats = (date = (0, moment_1.default)().format("L")) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.db.timeRecord.count({
      where: {
        recordDate: date
      },
      select: {
        timeIn: true,
        timeOut: true
      }
    });
  });
exports.readTimeRecordStats = readTimeRecordStats;
const readPresentEmployees = (date = (0, moment_1.default)().format("L")) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.db.user.count({
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
  });
exports.readPresentEmployees = readPresentEmployees;
const readLateEmployees = (date = (0, moment_1.default)().format("L")) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.db.user.count({
      where: {
        timeRecord: {
          some: {
            recordDate: date,
            remark: "Late"
          }
        }
      }
    });
  });
exports.readLateEmployees = readLateEmployees;
const readOnLeaveEmployees = (date = (0, moment_1.default)().format("L")) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.db.user.count({
      where: {
        timeRecord: {
          some: {
            recordDate: date,
            remark: "Leave"
          }
        }
      }
    });
  });
exports.readOnLeaveEmployees = readOnLeaveEmployees;
const readTotalEmployees = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    return database_1.db.user.count();
  });
exports.readTotalEmployees = readTotalEmployees;
const getAbsences = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.db.user.findMany({
      select: {
        id: true
      },
      where: {
        timeRecord: {
          none: {
            recordDate: (0, moment_1.default)().format("L")
          }
        }
      }
    });
  });
exports.getAbsences = getAbsences;
const createAbsenceRecords = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.db.timeRecord.createMany();
  });
exports.createAbsenceRecords = createAbsenceRecords;
