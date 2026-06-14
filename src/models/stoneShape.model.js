const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoneShapeSchema = new Schema(
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

const StoneShape = mongoose.model("StoneShape", StoneShapeSchema);
module.exports = StoneShape;
