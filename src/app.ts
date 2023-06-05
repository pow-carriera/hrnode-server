import { errorHandler } from "./middlewares/middlewares";
import * as routes from "./routes/routes";
import { PORT } from "./utils/config";
import express from "express";

import startMessage from "./utils/init";
import morgan from "morgan";
import path from "path";
import cors from "cors";

const app = express();

app.use(cors());
app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

const apiRouter = express.Router();

app.use("/api", apiRouter);

apiRouter.use("/users", routes.userRouter, errorHandler);
apiRouter.use("/auth", routes.authRouter, errorHandler);
apiRouter.use("/time", routes.timeRouter, errorHandler);
apiRouter.use("/transactions", routes.transactionRouter, errorHandler);
apiRouter.use("/stats", routes.statRouter, errorHandler);
apiRouter.use("/events", routes.calendarEventRouter, errorHandler);

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

app.listen(PORT || 5000, () => {
  startMessage();
});
