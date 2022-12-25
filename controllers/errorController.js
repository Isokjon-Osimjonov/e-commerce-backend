const AppError = require("./../utils/appError");

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.statusCode,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  //Operational : send trusted error to client
  if (err.isoperational) {
    res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  }
  //   Programming or other unlnown  error : do not send to client
  else {
    // 1 Log error
    console.error("Error", err);

    // 2 Send generate error message
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    sendErrorProd(error, res);
  }
};
