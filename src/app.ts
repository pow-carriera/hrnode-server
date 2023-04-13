import express from "express";
import { PORT, APPNAME, HOST } from "./utils/config";
import * as routes from "./routes/routes";
import morgan from "morgan";
import path from "path";
import cors from "cors";

const app = express();
const apiRouter = express.Router();

app.use(cors());
app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", morgan("common"), (req, res) => {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});
app.use("/api", apiRouter);

apiRouter.use("/users", routes.userRouter);

app.listen(PORT || 5000, () => {
  console.log(`${APPNAME} is running at ${HOST}:${PORT}`);
});
