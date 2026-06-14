const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MetalStampSchema = new Schema(
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

const MetalStamp = mongoose.model("MetalStamp", MetalStampSchema);
module.exports = MetalStamp;
