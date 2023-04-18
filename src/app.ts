import express from "express";
import { PORT } from "./utils/config";
import * as routes from "./routes/routes";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import { startMessage } from "./utils/init";
import fileUpload from "express-fileupload";

const app = express();
const apiRouter = express.Router();

app.use(cors());
app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());

app.get("/", morgan("common"), (req, res) => {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});
app.use("/api", apiRouter);

apiRouter.use("/users", routes.userRouter);
apiRouter.use("/auth", routes.authRouter);

app.post("/upload", (req, res) => {
  try {
    const img = req.files!.img;
    console.log(img);
    res.status(200).json({
      status: 200,
      message: "Successful upload."
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: "Bad Request."
    });
  }
});

app.use("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "The resource you're looking for could not be found."
  });
});

app.listen(PORT || 5000, () => {
  startMessage();
});
