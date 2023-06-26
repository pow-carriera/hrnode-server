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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneEventWithId =
  exports.findManyEventsWithUserId =
  exports.findAllEvents =
  exports.createEvent =
    void 0;
const database_1 = require("../utils/database");
const createEvent = (data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.db.calendarEvent.create({
      data
    });
  });
exports.createEvent = createEvent;
const findAllEvents = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.db.calendarEvent.findMany();
  });
exports.findAllEvents = findAllEvents;
const findManyEventsWithUserId = (userId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.db.calendarEvent.findMany({
      where: {
        userId
      }
    });
  });
exports.findManyEventsWithUserId = findManyEventsWithUserId;
const deleteOneEventWithId = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.db.calendarEvent.delete({
      where: {
        id
      }
    });
  });
exports.deleteOneEventWithId = deleteOneEventWithId;
