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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const middlewares_1 = require("./middlewares/middlewares");
const routes = __importStar(require("./routes/routes"));
const config_1 = require("./utils/config");
const express_1 = __importDefault(require("express"));
const init_1 = __importDefault(require("./utils/init"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const createAbsences_1 = require("./scheduledJobs/createAbsences");
(0, createAbsences_1.createAbsences)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("common"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.sendFile(path_1.default.join(__dirname, "/views/index.html"));
});
const apiRouter = express_1.default.Router();
app.use("/api", apiRouter);
apiRouter.use("/users", routes.userRouter, middlewares_1.errorHandler);
apiRouter.use("/auth", routes.authRouter, middlewares_1.errorHandler);
apiRouter.use("/time", routes.timeRouter, middlewares_1.errorHandler);
apiRouter.use(
  "/transactions",
  routes.transactionRouter,
  middlewares_1.errorHandler
);
apiRouter.use("/stats", routes.statRouter, middlewares_1.errorHandler);
apiRouter.use(
  "/events",
  routes.calendarEventRouter,
  middlewares_1.errorHandler
);
app.get("/ping", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "pong!"
  });
});
// [Tech-debt] Catch-all for nonexistent routes. We can improve this later on.
app.use("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "The resource you're looking for could not be found."
  });
});
app.listen(config_1.PORT || 5000, () => {
  (0, init_1.default)();
});
