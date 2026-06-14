const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VariantGroupSchema = new Schema(
  {
    variantGroupCode: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

const VariantGroup = mongoose.model("VariantGroup", VariantGroupSchema);

module.exports = VariantGroup;
