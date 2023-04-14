import dns from "dns";
import dotenv from "dotenv";
dotenv.config();

export const startMessage = () => {
  dns.lookup(
    require("os").hostname(),
    (error: any, address: any, family: any) => {
      console.log(
        "Sapling is running at http://" + address + ":" + process.env.PORT
      );
    }
  );
};
