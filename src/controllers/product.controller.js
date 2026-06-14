const ApiResponse = require("../utility/ApiResponse.js");
const ApiError = require("../utility/ApiError.js");
const Product = require("../models/product.model.js");

async function getProductListController(req, res) {
  try {
    const {
      title,
      metalType,
      metalStamp,
      minPrice,
      maxPrice,
      sort,
      category,
      subcategory,
      centreStoneShape,
    } = req.query;
    const matchStage = { status: "Active" };

    if (category) matchStage.category = category;
    if (metalType) matchStage.metalType = metalType;
    if (metalStamp) matchStage.metalStamp = metalStamp;
    if (title) matchStage.title = { $regex: title, $options: "i" };
    if (minPrice || maxPrice) {
      matchStage.finalAmount = {};
      if (minPrice) matchStage.finalAmount.$gte = Number(minPrice);
      if (maxPrice) matchStage.finalAmount.$lte = Number(maxPrice);
    }
    const pipeline = [
      {
        $match: { status: "Active", category: category },
      },
    ];
    const productList = await Product.aggregate(pipeline);
    console.log(productList, "111");
    if (productList?.length == 0) {
      return res
        .status(200)
        .json(new ApiResponse(true, 200, productList, "No product found"));
    }
    return res
      .status(200)
      .json(new ApiResponse(true, 200, productList, "Product list"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Server error while getting product list"));
  }
}

async function getProductDetailsController(req, res) {
  try {
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Server error while getting product details"));
  }
}

module.exports = { getProductListController, getProductDetailsController };
