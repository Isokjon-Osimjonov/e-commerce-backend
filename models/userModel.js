const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Please tell us your phone number"],
  },

  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  // address: { type: String, default: "" },
  address: {
    city: {
      type: String,
      required: [true, "Please provide your city"],
    },
    town: {
      type: String,
      required: [true, "Please provide your town"],
    },
    detailed_address: {
      type: String,
      required: [true, "Please provide your: street name , home number  "],
    },
    post_index: {
      type: Number,
      required: [true, "Please provide  post index of your city or town "],
    },
  },

  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    maxlength: 1024,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
    minlength: 8,
    maxlength: 1024,
  },
  photo: {
    type: String,
    default: "",
  },

  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});
// This is hashing function this function hashspassword before saving it
userSchema.pre("save", async function (next) {
  // ONly run this function if password actuallty modified
  if (!this.isModified("password")) return next();

  // Hashing the current users password
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordCinfrom field
  this.passwordConfirm = undefined;
  next();
});

// This is intance asynchronous method/function that availabke evrywhere it compares stored and hashed password with coming candidate password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
