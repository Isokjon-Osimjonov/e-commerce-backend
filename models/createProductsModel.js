const mongoose = require("mongoose");
const validator = require("validator");

const newProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productDiscount: {
    type: Number,
  },
  productStock: {
    type: Number,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  productFeature: {
    type: String,
  },
  productBrand: {
    type: String,
    required: true,
  },
  productDeliveryTime: {
    type: Date,
    required: true,
  },
  productCategory: {
    type: String,
    default: "recently-added",
    enum: ["books", "kanselariya", "recently-added"],
  },
});

const CREATE_PRODUCT = mongoose.model("CREATE_PRODUCT ", newProductSchema);
module.exports = CREATE_PRODUCT;
