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
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const authService = __importStar(require("../controllers/auth.controller"));
// API Level Route: Authentication
exports.authRouter = express_1.default.Router();
exports.authRouter.post("/login", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      req.accepts("application/json");
      const data = {
        username: req.body.username,
        password: req.body.password
      };
      const response = yield authService.logInUser(data);
      if (typeof response == "undefined") {
        res.status(401).json({
          status: 401,
          message: "Invalid username or password."
        });
        return;
      }
      res.status(200).json({
        status: 200,
        message: "OK. Log in success.",
        data: response
      });
      return;
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: `Bad request. ${error}`
      });
      return;
    }
  })
);
exports.authRouter.post("/signup", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    req.accepts("application/json");
    try {
      const user = {
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
      };
      const response = yield authService.signUpUser(user);
      if (response == null) {
        res.status(400).json({
          status: 400,
          message: `Bad request. Response is: ${response}`
        });
        return;
      }
      res.status(200).json({
        status: 200,
        message: `Successfully signed up. Waiting for HR-Admin verification`
      });
      return;
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: `Bad request. ${error}`
      });
      return;
    }
  })
);
