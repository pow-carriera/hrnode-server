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
exports.signUpUser = exports.logInUser = void 0;
const database_1 = require("../utils/database");
const middlewares_1 = require("../middlewares/middlewares");
const bcrypt_1 = __importDefault(require("bcrypt"));
const logInUser = (data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = data;
    const user = yield database_1.db.user.findUniqueOrThrow({
      where: {
        username
      },
      select: {
        id: true,
        username: true,
        password: true,
        role: true
      }
    });
    const result = bcrypt_1.default.compareSync(password, user.password);
    if (!result) {
      return undefined;
    }
    const userData = {
      id: user.id,
      role: user.role,
      jwt: middlewares_1.auth.generateAccessToken(user.id)
    };
    return userData;
  });
exports.logInUser = logInUser;
const signUpUser = (input) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield database_1.db.user.create({
      data: {
        username: input.username,
        password: bcrypt_1.default.hashSync(input.password, 10),
        role: "PENDING"
      }
    });
    return user;
  });
exports.signUpUser = signUpUser;
