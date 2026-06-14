const User = require("../models/user.model.js");
const ApiError = require("../utility/ApiError.js");
const jwt = require("jsonwebtoken");
async function verifyJWT(req, res, next) {
  try {
    const header = req.headers["authorization"];
    if (!header) {
      return res.status(401).json(new ApiError(500, "Header is required"));
    }
    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded) {
      return res
        .status(402)
        .json(new ApiError(500, "Token is expire or invalid"));
    }

    const user = await User.findById(decoded._id).select(
      "-password -refreshToken",
    );
    if (!user) {
      return res.status(401).json(new ApiError(401, "User not found"));
    }
    req.user = user.toObject();

    next();
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Server error while verification"));
  }
}

module.exports = verifyJWT;
