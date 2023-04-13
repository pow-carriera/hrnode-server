import * as dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
const APPNAME = process.env.APPNAME;
const HOST = process.env.HOST;

export { PORT, APPNAME, HOST };
