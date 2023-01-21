const mongoose = require("mongoose");
const validator = require("validator");

const newProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "A product must have a name"],
    unique: true,
    trim: true,
    maxlength: [
      40,
      "A product name must have less or equal then 40 characters",
    ],
    minlength: [
      10,
      "A product name must have more or equal then 10 characters",
    ],
  },
  productPrice: {
    type: Number,
    required: [true, "A product must have a price"],
  },
  productOldPrice: {
    type: Number,
    // required: [true, "A product must have a price"],
  },
  productRatingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, "Rating must be above 1.0"],
    max: [5, "Rating must be below 5.0"],
    set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
  },
  productRatingsQuantity: {
    type: Number,
    default: 0,
  },

  productDiscount: {
    type: Number,
    validate: {
      validator: function (val) {
        // this only points to current doc on NEW document creation
        return val < this.productPrice;
      },
      message: "Discount price ({VALUE}) should be below regular price",
    },
  },

  productStock: {
    type: Number,
    required: [true, "You have to provide quantity of product "],
  },
  productDescription: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    // required: true,
  },

  productBrand: {
    type: String,
    required: [true, "You have to provide product's brand name"],
  },
  productDeliveryTime: {
    type: Date,
    required: true,
  },
  productCategory: {
    type: [],
    // enum: ["books", "kanselariya", "recently-added"],
    required: [true, "You have to provide category of product "],
  },
});

const Products = mongoose.model("Products ", newProductSchema);
module.exports = Products;
