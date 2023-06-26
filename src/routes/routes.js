"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calendarEventRouter =
  exports.statRouter =
  exports.transactionRouter =
  exports.timeRouter =
  exports.authRouter =
  exports.userRouter =
    void 0;
const user_router_1 = require("./user.router");
Object.defineProperty(exports, "userRouter", {
  enumerable: true,
  get: function () {
    return user_router_1.userRouter;
  }
});
const auth_router_1 = require("./auth.router");
Object.defineProperty(exports, "authRouter", {
  enumerable: true,
  get: function () {
    return auth_router_1.authRouter;
  }
});
const time_router_1 = require("./time.router");
Object.defineProperty(exports, "timeRouter", {
  enumerable: true,
  get: function () {
    return time_router_1.timeRouter;
  }
});
const transaction_router_1 = require("./transaction.router");
Object.defineProperty(exports, "transactionRouter", {
  enumerable: true,
  get: function () {
    return transaction_router_1.transactionRouter;
  }
});
const stat_router_1 = require("./stat.router");
Object.defineProperty(exports, "statRouter", {
  enumerable: true,
  get: function () {
    return stat_router_1.statRouter;
  }
});
const calendarevent_router_1 = require("./calendarevent.router");
Object.defineProperty(exports, "calendarEventRouter", {
  enumerable: true,
  get: function () {
    return calendarevent_router_1.calendarEventRouter;
  }
});
