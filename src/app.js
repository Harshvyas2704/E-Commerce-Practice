const express = require("express");
const { userRoute } = require("./routes/user.route.js");
const app = express();
app.use(express.json());
app.use("/api/v1/user", userRoute);

module.exports = app;
