const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });

  //   next();
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");

  //   if (!user || !(await user.correctPassword(password, user.password))) {
  //     return next(new AppError("Incorrect email or password", 401));
  //   }

  // 3) If everything ok, send token to client
  // createSendToken(user, 200, res);
  res.status(200).json({
    status: "success",
    data: {
      //   user: newUser,
    },
  });
  next();
});
