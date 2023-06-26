"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const dns_1 = __importDefault(require("dns"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const startMessage = () => {
  dns_1.default.lookup(require("os").hostname(), (error, address, family) => {
    console.log(
      "Sapling is running at http://" + address + ":" + process.env.PORT
    );
  });
};
exports.default = startMessage;
