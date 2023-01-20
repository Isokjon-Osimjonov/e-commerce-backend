const Products = require("../models/createProductsModel");
const catchAsync = require("../utils/catchAsync");

exports.createNewProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Products.create({
    productName: req.body.productName,
    productPrice: req.body.productPrice,
    productDiscount: req.body.productDiscount,
    productDescription: req.body.productDescription,
    productImage: req.body.productImage,
    productCategory: req.body.productCategory,
    productStock: req.body.productStock,
    productDeliveryTime: req.body.productDeliveryTime,
    productBrand: req.body.productBrand,
  });
  res.status(201).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});
