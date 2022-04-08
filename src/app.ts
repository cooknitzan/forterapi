import express from "express";
import { NotFoundError } from "./errors/error-types/not-found-error";
import { errorHandler } from "./middleware/error-handler";

const app = express();

app.use(express.json());
app.use("/api/coins", require("./routes/coins"));
app.all("*", (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
