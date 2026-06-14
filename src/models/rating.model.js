const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    review: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

RatingSchema.index({ user: 1, product: 1 }, { unique: true });
const Ratings = mongoose.model("Rating", RatingSchema);

module.exports = Ratings;
