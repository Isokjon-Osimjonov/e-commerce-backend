const CREATE_PRODUCT = require("../models/createProducts");
const catchAsync = require("../utils/catchAsync");

exports.createNewProduct = catchAsync(async (req, res, next) => {
  const newProduct = await CREATE_PRODUCT.create({
    productName: req.body.productName,
    productPrice: req.body.productPrice,
    productDiscount: req.body.productDiscount,
    productDescription: req.body.productDescription,
    productImage: req.body.productImage,
    productCategory: req.body.productCategory,
    productStock: req.body.productStock,
    productFeature: req.body.productFeature,
    productDeliveryTime: req.body.productDeliveryTime,
  });
});
