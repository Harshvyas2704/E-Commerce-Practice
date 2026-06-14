const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    images: [
      {
        type: String,
        default: null,
      },
    ],
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    metalStamp: {
      type: Schema.Types.ObjectId,
      ref: "MetalStamp",
      required: true,
    },
    metalType: {
      type: Schema.Types.ObjectId,
      ref: "MetalType",
      required: true,
    },
    centreStone: {
      type: Boolean,
      default: false,
    },
    centreStoneShape: {
      type: Schema.Types.ObjectId,
      ref: "StoneShape",
    },
    carat: {
      type: String,
    },
    finalAmount: {
      type: Number,
      required: true,
    },
    offerPrice: {
      type: Number,
      default: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: "Subcategory",
      required: true,
    },
    variantGroupId: {
      type: Schema.Types.ObjectId,
      ref: "VariantGroup",
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Not Available", "Coming Soon"],
      default: "Active",
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
