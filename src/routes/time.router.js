"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            }
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
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
exports.timeRouter = void 0;
const express_1 = __importDefault(require("express"));
const timeService = __importStar(require("../controllers/time.controller"));
exports.timeRouter = express_1.default.Router();
const http_errors_1 = __importDefault(require("http-errors"));
exports.timeRouter.post("/in/:userId", (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const record = yield timeService.checkRecordToday(req.params.userId);
    if (
      (record === null || record === void 0 ? void 0 : record.remark) ===
      "Absent"
    ) {
      res.status(401).json({
        status: 401,
        message: "Unauthorized. Employee is absent."
      });
      return;
    }
    if (
      (record === null || record === void 0 ? void 0 : record.timeIn) != null
    ) {
      res
        .status(202)
        .json({ status: 202, message: "Accepted. Employee can time out." });
      return;
    }
    const data = yield timeService.timeInUser(req.params.userId);
    res.status(200).json({
      status: 200,
      message: "OK. Record successfully created.",
      data
    });
    return;
  })
);
exports.timeRouter.post("/out/:userId", (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const record = yield timeService.checkRecordToday(req.params.userId);
    if (
      (record === null || record === void 0 ? void 0 : record.timeOut) != null
    ) {
      next(
        (0, http_errors_1.default)(
          401,
          "Unauthorized. Employee already timed out."
        )
      );
      return;
    }
    if (
      (record === null || record === void 0 ? void 0 : record.remark) ===
      "Absent"
    ) {
      next(
        (0, http_errors_1.default)(
          401,
          "Unauthorized. Employee absence is recorded."
        )
      );
      return;
    }
    if (record === null) {
      next(
        (0, http_errors_1.default)(400, "Bad request. No user or record found.")
      );
      return;
    }
    const data = yield timeService.timeOutUser(record.id);
    res.status(200).json({
      status: 200,
      message: "OK. Record successfully updated.",
      data
    });
  })
);
exports.timeRouter.get("/:id", (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const timeOfUser = yield timeService.getAttendancesfromUser(req.params.id);
    res.status(200).json(timeOfUser);
  })
);
exports.timeRouter.get("/", (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const data = yield timeService.getAttendances();
    res.status(200).json(data);
  })
);
