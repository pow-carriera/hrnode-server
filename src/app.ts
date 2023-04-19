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

app.use("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "The resource you're looking for could not be found."
  });
});

app.listen(PORT || 5000, () => {
  startMessage();
});
