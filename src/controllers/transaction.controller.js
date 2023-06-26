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
exports.declineUserTransaction =
  exports.approveUserTransaction =
  exports.createOneUserTransaction =
  exports.getAllUserTransactions =
  exports.getUserTransactions =
    void 0;
const database_1 = require("../utils/database");
const moment_1 = __importDefault(require("moment"));
const getUserTransactions = (query) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { userId, transactionType, profile } = query;
    return yield database_1.db.transaction.findMany({
      orderBy: {
        createdAt: "desc"
      },
      where: {
        userId,
        transactionType
      },
      include: {
        user: {
          select: {
            role: true,
            profile
          }
        }
      }
    });
  });
exports.getUserTransactions = getUserTransactions;
const getAllUserTransactions = (query) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.db.transaction.findMany({
      orderBy: {
        createdAt: "desc"
      },
      where: {
        userId: query.userId
      },
      include: {
        user: {
          select: {
            role: true,
            profile: query.profile
          }
        }
      }
    });
  });
exports.getAllUserTransactions = getAllUserTransactions;
const createOneUserTransaction = (data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield database_1.db.user.findFirst({
      where: {
        id: data.userId
      },
      include: {
        profile: true
      }
    });
    yield database_1.db.calendarEvent.create({
      data: {
        userId: data.userId,
        title:
          data.transactionType +
          ", " +
          ((_a = user === null || user === void 0 ? void 0 : user.profile) ===
            null || _a === void 0
            ? void 0
            : _a.firstName),
        start: (0, moment_1.default)(data.startDate).format("YYYY-MM-DD"),
        end: (0, moment_1.default)(data.endDate).format("YYYY-MM-DD"),
        allDay: false
      }
    });
    return yield database_1.db.transaction.create({
      data
    });
  });
exports.createOneUserTransaction = createOneUserTransaction;
const approveUserTransaction = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.db.transaction.update({
      where: {
        id
      },
      data: {
        status: "Approved"
      }
    });
  });
exports.approveUserTransaction = approveUserTransaction;
const declineUserTransaction = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.db.transaction.update({
      where: {
        id
      },
      data: {
        status: "Declined"
      }
    });
  });
exports.declineUserTransaction = declineUserTransaction;
