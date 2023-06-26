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
exports.createAbsences =
  exports.getAttendances =
  exports.getAttendancesfromUser =
  exports.timeOutUser =
  exports.timeInUser =
  exports.checkRecordToday =
    void 0;
const database_1 = require("../utils/database");
const moment_1 = __importDefault(require("moment"));
const checkRecordToday = (userId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.db.timeRecord.findFirst({
      where: {
        userId,
        recordDate: (0, moment_1.default)().format("L")
      }
    });
  });
exports.checkRecordToday = checkRecordToday;
const timeInUser = (userId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    let remark = "OnTime";
    if (
      (0, moment_1.default)().isAfter(
        (0, moment_1.default)().set({
          hour: 8,
          minute: 0,
          second: 0,
          millisecond: 0
        })
      )
    ) {
      remark = "Late";
    }
    return yield database_1.db.timeRecord.create({
      data: {
        userId,
        recordDate: (0, moment_1.default)().format("L"),
        timeIn: (0, moment_1.default)().toDate(),
        remark: remark
      }
    });
  });
exports.timeInUser = timeInUser;
const timeOutUser = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield database_1.db.timeRecord.findUnique({
      where: {
        id
      },
      select: {
        timeIn: true,
        timeOut: true
      }
    });
    return yield database_1.db.timeRecord.update({
      where: {
        id
      },
      data: {
        timeOut: (0, moment_1.default)().toDate(),
        // I'm so sorry. - Paulo Pertierra
        hoursWorked: Math.floor(
          moment_1.default
            .duration(
              (0, moment_1.default)().diff(
                (0, moment_1.default)(
                  userData === null || userData === void 0
                    ? void 0
                    : userData.timeIn
                )
              )
            )
            .asHours()
        )
      }
    });
  });
exports.timeOutUser = timeOutUser;
const getAttendancesfromUser = (userId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.db.timeRecord.findMany({
      where: {
        userId
      },
      orderBy: {
        recordDate: "desc"
      }
    });
  });
exports.getAttendancesfromUser = getAttendancesfromUser;
const getAttendances = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.db.timeRecord.findMany({
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
  });
exports.getAttendances = getAttendances;
const createAbsences = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const absencees = yield database_1.db.user.findMany({
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
    return yield database_1.db.timeRecord.createMany({
      data: absencees.map((id) => {
        return {
          userId: id.id,
          recordDate: (0, moment_1.default)().format("L"),
          timeIn: null,
          timeOut: null,
          remark: "Absent"
        };
      })
    });
  });
exports.createAbsences = createAbsences;
