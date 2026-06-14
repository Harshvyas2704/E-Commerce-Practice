const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MetalTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

const MetalType = mongoose.model("MetalType", MetalTypeSchema);
module.exports = MetalType;
