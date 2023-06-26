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
exports.transactionRouter = void 0;
const express_1 = __importDefault(require("express"));
const transactionService = __importStar(
  require("../controllers/transaction.controller")
);
const http_errors_1 = __importDefault(require("http-errors"));
exports.transactionRouter = express_1.default.Router();
exports.transactionRouter.get("/:id", (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    req.accepts("application/json");
    const query = {
      userId: req.params.id,
      transactionType: req.query.type,
      profile: req.query.profile === "true"
    };
    try {
      const transactions = yield transactionService.getUserTransactions(query);
      res.status(200).json(transactions);
    } catch (error) {
      next((0, http_errors_1.default)(400, `Bad request. ${error}`));
    }
  })
);
exports.transactionRouter.get("/", (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    req.accepts("application/json");
    try {
      const query = {
        type: req.query.type || undefined,
        profile: req.query.profile === "true"
      };
      const transactions = yield transactionService.getAllUserTransactions(
        query
      );
      res.status(200).json(transactions);
    } catch (error) {
      next((0, http_errors_1.default)(400, `Bad request. ${error}`));
    }
  })
);
exports.transactionRouter.post("/:id", (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    req.accepts("application/json");
    const data = Object.assign({ userId: req.params.id }, req.body);
    try {
      const transaction = yield transactionService.createOneUserTransaction(
        data
      );
      res.status(200).json(transaction);
    } catch (error) {
      next((0, http_errors_1.default)(400, `Bad Request. ${error}`));
    }
  })
);
exports.transactionRouter.put("/approve/:id", (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      req.accepts("application/json");
      const transaction = yield transactionService.approveUserTransaction(
        req.params.id
      );
      res.status(200).json(transaction);
    } catch (error) {
      next((0, http_errors_1.default)(400, `Bad Request. ${error}`));
    }
  })
);
exports.transactionRouter.put("/decline/:id", (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      req.accepts("application/json");
      const transaction = yield transactionService.declineUserTransaction(
        req.params.id
      );
      res.status(200).json(transaction);
    } catch (error) {
      next((0, http_errors_1.default)(400, `Bad Request. ${error}`));
    }
  })
);
