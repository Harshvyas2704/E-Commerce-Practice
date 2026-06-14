const connectDB = require("./connectDB.js");
require("dotenv").config({ path: "../../.env" });
const productSeed = require("./productSeed.js");

const MetalStamp = require("../models/metalStamp.model.js");
const MetalType = require("../models/metalType.model.js");
const StoneShape = require("../models/stoneShape.model.js");
const Category = require("../models/category.model.js");
const Subcategory = require("../models/subcategory.model.js");
const ApiError = require("../utility/ApiError.js");

async function metalStampSeed() {
  try {
    const metalStampOptions = ["9K", "10K", "14K", "18K", "24K"];

    const seedArray = metalStampOptions.map((name) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
    }));
    await MetalStamp.deleteMany({});
    await MetalStamp.insertMany(seedArray);
  } catch (error) {
    throw new ApiError(500, error.message);
  }
}

async function metalTypeSeed() {
  try {
    const metalTypeOptions = [
      "Rose Gold",
      "Yellow Gold",
      "White Gold",
      "Yellow White Gold",
      "Yellow Rose Gold",
      "White Rose Gold",
    ];

    const seedArray = metalTypeOptions.map((name) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
    }));
    await MetalType.deleteMany({});
    await MetalType.insertMany(seedArray);
  } catch (error) {
    throw new ApiError(500, error.message);
  }
}

async function stoneShapeSeed() {
  try {
    const shapes = [
      "Round",
      "Oval",
      "Princess",
      "Cushion",
      "Emerald",
      "Pear",
      "Marquise",
      "Heart",
    ];
    const seedArray = shapes.map((name) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
    }));
    await StoneShape.deleteMany({});
    await StoneShape.insertMany(seedArray);
    console.log("StoneShape seeded");
  } catch (error) {
    throw new ApiError(500, error.message);
  }
}

async function categorySeed() {
  try {
    const categories = [
      "Rings",
      "Necklaces",
      "Earrings",
      "Bracelets",
      "Pendants",
      "Bangles",
      "MangalSutra",
    ];
    const seedArray = categories.map((name) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
    }));
    await Category.deleteMany({});
    await Category.insertMany(seedArray);
    return seedArray;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
}

async function subcategorySeed() {
  try {
    const subcategoryData = {
      Rings: [
        "Engagement Rings",
        "Wedding Rings",
        "Solitaire Rings",
        "Cocktail Rings",
        "Eternity Rings",
      ],
      Necklaces: [
        "Chain Necklaces",
        "Choker Necklaces",
        "Layered Necklaces",
        "Tennis Necklaces",
      ],
      Earrings: [
        "Stud Earrings",
        "Hoop Earrings",
        "Drop Earrings",
        "Chandelier Earrings",
        "Huggie Earrings",
      ],
      Bracelets: [
        "Tennis Bracelets",
        "Charm Bracelets",
        "Cuff Bracelets",
        "Chain Bracelets",
      ],
      Pendants: [
        "Solitaire Pendants",
        "Heart Pendants",
        "Cross Pendants",
        "Initial Pendants",
      ],
      Bangles: ["Gold Bangles", "Diamond Bangles", "Stackable Bangles"],
      MangalSutra: [
        "Traditional MangalSutra",
        "Modern MangalSutra",
        "Diamond MangalSutra",
        "Short MangalSutra",
      ],
    };

    const categories = await Category.find({});
    const subcategorySeedArray = [];
    Object.entries(subcategoryData).map(([categoryName, subs]) => {
      const matchedCategory = categories.find((c) => c.name === categoryName);

      subs.map((subName) => {
        subcategorySeedArray.push({
          name: subName,
          slug: subName.toLowerCase().replace(/\s+/g, "-"),
          category: matchedCategory._id,
        });
      });
    });
    await Subcategory.deleteMany({});

    await Subcategory.insertMany(subcategorySeedArray);
  } catch (error) {
    throw new ApiError(500, error.message);
  }
}

async function runSeeds() {
  await connectDB();
  await metalStampSeed();
  await metalTypeSeed();
  await stoneShapeSeed();
  await subcategorySeed();

  const metalStamps = await MetalStamp.find({});
  const metalTypes = await MetalType.find({});
  const stoneShapes = await StoneShape.find({});
  const categories = await Category.find({});
  const subcategories = await Subcategory.find({});

  await productSeed(
    metalTypes,
    metalStamps,
    stoneShapes,
    categories,
    subcategories,
  );

  console.log("All seeds done");
  process.exit(0);
}

runSeeds();
