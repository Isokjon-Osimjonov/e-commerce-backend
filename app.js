const express = require("express");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const userRouter = require("./routes/userRoutes");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// app.use("/", (req, res) => {
//   res.send("Hello World");
// });
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
