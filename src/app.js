const express = require("express");
const { userRoute } = require("./routes/user.route.js");
const { productRoute } = require("./routes/product.route.js");
const app = express();
app.use(express.json());
// ROUTES
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);

module.exports = app;
