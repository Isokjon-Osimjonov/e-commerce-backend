const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

router.post("/newproduct", productController.createNewProduct);
module.exports = router;
