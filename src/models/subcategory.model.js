const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubcategorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true },
);

const Subcategory = mongoose.model("Subcategory", SubcategorySchema);

module.exports = Subcategory;
