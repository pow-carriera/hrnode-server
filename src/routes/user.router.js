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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const userService = __importStar(require("../controllers/user.controller"));
const middlewares_1 = require("../middlewares/middlewares");
// API Level Routes
exports.userRouter = express_1.default.Router();
exports.userRouter.get("/", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    req.accepts("application/json");
    const query = {
      profile: req.query.profile === "true",
      sort:
        (_a = req.query.sort) === null || _a === void 0
          ? void 0
          : _a.toString(),
      sortBy:
        (_b = req.query.sortBy) === null || _b === void 0
          ? void 0
          : _b.toString()
    };
    try {
      const users = yield userService.getManyUsers(query);
      res.status(200).send(users);
    } catch (error) {
      res.status(400).json({
        error: 400,
        message: `Bad request. ${error}`
      });
    }
  })
);
exports.userRouter.get("/:id", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const query = {
      id: req.params.id,
      profile: req.query.profile === "true",
      timeRecord: req.query.time === "true",
      transaction: req.query.transaction === "true"
    };
    try {
      const user = yield userService.getUniqueUser(query);
      res.status(200).json(user);
    } catch (error) {
      res.send(400).json({
        error: 400,
        message: `Bad request ${error}`
      });
    }
  })
);
exports.userRouter.post(
  "/",
  // auth.authenticateToken,
  (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      req.accepts("application/json");
      try {
        const input = req.body;
        const user = yield userService.createOneUser(input);
        const token = middlewares_1.auth.generateAccessToken(user.id);
        res.status(200).json({
          data: {
            id: user.id,
            jwt: token
          },
          status: 201,
          message: `Created. User successfully created.`
        });
      } catch (error) {
        res.status(400).json({
          status: 400,
          message: `Bad request. ${error}`
        });
      }
    })
);
exports.userRouter.put("/:id", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    req.accepts("application/json");
    try {
      const user = yield userService.updateOneUser(req.params.id, req.body);
      res.status(200).json({
        data: {
          id: user.id
        },
        status: 200,
        message: "OK. User successfully updated."
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: `Bad request. ${error}`
      });
    }
  })
);
exports.userRouter.delete("/:id", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    req.accepts("application/json");
    try {
      const user = yield userService.deleteOneUser(req.params.id);
      res.status(200).json({
        data: {
          id: user.id
        },
        status: 200,
        message: "OK. User successfully deleted."
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: `Bad request. ${error}`
      });
    }
  })
);
