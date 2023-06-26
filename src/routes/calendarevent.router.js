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
exports.calendarEventRouter = void 0;
const express_1 = __importDefault(require("express"));
const calendarEventService = __importStar(
  require("../controllers/calendarevent.controller")
);
const http_errors_1 = __importDefault(require("http-errors"));
exports.calendarEventRouter = express_1.default.Router();
exports.calendarEventRouter.post("/", (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const data = yield calendarEventService.createEvent(req.body);
      res.json({ data }).status(200);
    } catch (error) {
      next((0, http_errors_1.default)(400, `Bad Request. ${error}`));
    }
  })
);
exports.calendarEventRouter.get("/", (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const data = yield calendarEventService.findAllEvents();
      res.json({ data }).status(200);
    } catch (error) {
      next((0, http_errors_1.default)(400, `Bad Request. ${error}`));
    }
  })
);
exports.calendarEventRouter.get("/:userId", (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const data = yield calendarEventService.findManyEventsWithUserId(
        req.params.userId
      );
      res.json({ data }).status(200);
    } catch (error) {
      next((0, http_errors_1.default)(400, `Bad Request. ${error}`));
    }
  })
);
exports.calendarEventRouter.delete("/:id", (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const data = yield calendarEventService.deleteOneEventWithId(
        req.params.id
      );
      res.json({ data }).status(200);
    } catch (error) {
      next((0, http_errors_1.default)(400, `Bad Request. ${error}`));
    }
  })
);
