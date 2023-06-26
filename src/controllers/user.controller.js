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
exports.deleteOneUser =
  exports.updateOneUser =
  exports.createOneUser =
  exports.getUniqueUser =
  exports.getManyUsers =
    void 0;
const database_1 = require("../utils/database");
const bcrypt_1 = __importDefault(require("bcrypt"));
const getManyUsers = (query) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (query.sortBy === undefined) {
      query.sortBy = "lastName";
    }
    return yield database_1.db.user.findMany({
      select: {
        id: true,
        username: true,
        profile: query.profile,
        role: true
      },
      orderBy: {
        profile: {
          [query.sortBy]: query.sort
        }
      }
    });
  });
exports.getManyUsers = getManyUsers;
const getUniqueUser = (query) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id, profile, timeRecord, transaction } = query;
    return yield database_1.db.user.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        username: true,
        role: true,
        profile,
        timeRecord,
        transaction
      }
    });
  });
exports.getUniqueUser = getUniqueUser;
const createOneUser = (input) =>
  __awaiter(void 0, void 0, void 0, function* () {
    let user = yield database_1.db.user.create({
      data: {
        username: input.user.username,
        password: bcrypt_1.default.hashSync(input.user.password, 10),
        role: input.user.role,
        profile: {
          create: input.profile
        }
      }
    });
    return user;
  });
exports.createOneUser = createOneUser;
const updateOneUser = (id, data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.db.user.update({
      where: {
        id
      },
      data: Object.assign(Object.assign({}, data.user), {
        profile: {
          update: data.profile
        }
      })
    });
  });
exports.updateOneUser = updateOneUser;
const deleteOneUser = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.db.user.delete({
      where: {
        id
      },
      include: {
        profile: true
      }
    });
  });
exports.deleteOneUser = deleteOneUser;
