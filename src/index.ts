import "dotenv/config";
import { app } from "./app";
import { SERVER_PORT } from "./consts/consts";

const PORT: string = process.env.PORT || SERVER_PORT;
const server = app.listen(PORT, () => {
  console.log("server running on port " + PORT);
});

process.on("unhandledRejection", (err: Error): void => {
  console.log(`LOGGED ERROR:${err}`);
  server.close();
});
