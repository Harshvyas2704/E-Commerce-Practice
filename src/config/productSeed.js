const VariantGroup = require("../models/variantGroup.model.js");
const Product = require("../models/product.model.js");
const ApiError = require("../utility/ApiError.js");
const Subcategory = require("../models/subcategory.model.js");

const NO_STONE_CATEGORIES = ["Bangles", "Bracelets", "MangalSutra"];

const STAMP_PRICE_MULTIPLIER = {
  "9K": 1.0,
  "10K": 1.15,
  "14K": 1.5,
  "18K": 1.9,
  "24K": 2.4,
};

const CATEGORY_BASE_PRICE = {
  Rings: 18000,
  Necklaces: 35000,
  Earrings: 12000,
  Bracelets: 22000,
  Pendants: 15000,
  Bangles: 28000,
  MangalSutra: 32000,
};

const SUBCATEGORY_MAP = {
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

const DESIGN_NAMES = {
  Rings: [
    "Classic",
    "Royal",
    "Floral",
    "Vintage",
    "Modern",
    "Infinity",
    "Twisted",
    "Bold",
    "Delicate",
    "Halo",
    "Pave",
    "Cathedral",
    "Bezel",
    "Channel",
    "Cluster",
    "Solitaire",
    "Three Stone",
    "Five Stone",
    "Seven Stone",
    "Bypass",
    "Crossover",
    "Split Shank",
    "Tension",
    "Filigree",
    "Milgrain",
    "Art Deco",
    "Victorian",
    "Edwardian",
    "Retro",
    "Contemporary",
    "Stackable",
    "Chevron",
    "V Shape",
    "Curved",
    "Wave",
    "Braided",
    "Rope",
    "Hammered",
    "Brushed",
    "Polished",
    "Cushion Halo",
    "Oval Halo",
    "Square Halo",
    "Hidden Halo",
    "Double Halo",
    "Vintage Halo",
    "Floral Halo",
    "Celestial",
    "Starburst",
    "Sunburst",
  ],
  Necklaces: [
    "Layered",
    "Statement",
    "Pendant",
    "Collar",
    "Lariat",
    "Opera",
    "Princess",
    "Rope",
    "Box Chain",
    "Cable Chain",
    "Figaro",
    "Snake Chain",
    "Herringbone",
    "Byzantine",
    "Wheat",
    "Ball Chain",
    "Anchor Chain",
    "Mariner Chain",
    "Spiga Chain",
    "Venetian Chain",
    "Bar",
    "Coin",
    "Disc",
    "Cross",
    "Star",
    "Moon",
    "Sun",
    "Heart",
    "Teardrop",
    "Oval",
    "Floral",
    "Leaf",
    "Feather",
    "Arrow",
    "Infinity",
    "Knot",
    "Tassel",
    "Fringe",
    "Choker Lace",
    "Bib",
    "Graduated",
    "Illusion",
    "Floating",
    "Convertible",
    "Y Shape",
    "Asymmetric",
    "Geometric",
    "Cluster",
    "Halo",
    "Solitaire",
  ],
  Earrings: [
    "Classic Stud",
    "Teardrop",
    "Geometric",
    "Floral",
    "Star",
    "Moon",
    "Sun",
    "Leaf",
    "Feather",
    "Bow",
    "Spiral",
    "Square",
    "Triangle",
    "Oval",
    "Marquise",
    "Heart",
    "Cross",
    "Infinity",
    "Knot",
    "Button",
    "Cluster",
    "Halo",
    "Pave",
    "Bezel",
    "Channel",
    "Bar",
    "Linear",
    "Chandelier",
    "Waterfall",
    "Cascade",
    "Huggie",
    "Cartilage",
    "Threader",
    "Jacket",
    "Ear Cuff",
    "Climber",
    "Crawler",
    "Mismatched",
    "Convertible",
    "Drop",
    "Dangle",
    "Fringe",
    "Tassel",
    "Disc",
    "Coin",
    "Charm",
    "Celestial",
    "Vintage",
    "Art Deco",
    "Modern",
  ],
  Bracelets: [
    "Bangle Stack",
    "Chain Link",
    "Tennis",
    "Charm",
    "Cuff",
    "Beaded",
    "Wrap",
    "Slider",
    "ID",
    "Figaro",
    "Rope",
    "Box",
    "Snake",
    "Herringbone",
    "Wheat",
    "Ball",
    "Anchor",
    "Mariner",
    "Byzantine",
    "Spiga",
    "Bar",
    "Station",
    "Infinity",
    "Heart",
    "Star",
    "Moon",
    "Flower",
    "Leaf",
    "Feather",
    "Cross",
    "Toggle",
    "Lobster",
    "Spring Ring",
    "Magnetic",
    "Stretch",
    "Adjustable",
    "Layered",
    "Multi Strand",
    "Woven",
    "Braided",
    "Hammered",
    "Brushed",
    "Polished",
    "Textured",
    "Engraved",
    "Filigree",
    "Milgrain",
    "Art Deco",
    "Vintage",
    "Modern",
  ],
  Pendants: [
    "Solitaire",
    "Heart",
    "Cross",
    "Star",
    "Moon",
    "Sun",
    "Infinity",
    "Teardrop",
    "Oval",
    "Cluster",
    "Halo",
    "Bezel",
    "Bar",
    "Coin",
    "Locket",
    "Disc",
    "Circle",
    "Square",
    "Triangle",
    "Hexagon",
    "Floral",
    "Leaf",
    "Feather",
    "Arrow",
    "Knot",
    "Bow",
    "Butterfly",
    "Dragonfly",
    "Bird",
    "Tree",
    "Initial",
    "Name",
    "Number",
    "Zodiac",
    "Evil Eye",
    "Hamsa",
    "Om",
    "Lotus",
    "Mandala",
    "Geometric",
    "Vintage",
    "Art Deco",
    "Victorian",
    "Edwardian",
    "Modern",
    "Minimalist",
    "Statement",
    "Layered",
    "Celestial",
    "Nature",
  ],
  Bangles: [
    "Classic Round",
    "Twisted",
    "Hammered",
    "Engraved",
    "Floral",
    "Geometric",
    "Plain",
    "Diamond Cut",
    "Kada Style",
    "Openable",
    "Hinged",
    "Stacking",
    "Bangle Set",
    "Wide",
    "Narrow",
    "Thin",
    "Thick",
    "Flat",
    "Round",
    "Oval",
    "Square",
    "Hexagonal",
    "Rope",
    "Cable",
    "Chain",
    "Beaded",
    "Filigree",
    "Milgrain",
    "Granulation",
    "Repoussé",
    "Chased",
    "Embossed",
    "Pierced",
    "Cutout",
    "Hollow",
    "Solid",
    "Brushed",
    "Polished",
    "Matte",
    "Satin",
    "Two Tone",
    "Tri Color",
    "Oxidized",
    "Antique",
    "Vintage",
    "Modern",
    "Minimalist",
    "Statement",
    "Bridal",
    "Daily Wear",
  ],
  MangalSutra: [
    "Traditional",
    "Modern Slim",
    "Diamond",
    "Short Daily",
    "Long Bridal",
    "Two Tone",
    "Vati Style",
    "Tanmaniya",
    "Black Bead",
    "Gold Chain",
    "Layered",
    "Contemporary",
    "South Style",
    "North Style",
    "Minimalist",
    "Maharashtrian",
    "Bengali",
    "Gujarati",
    "Rajasthani",
    "Punjabi",
    "Single Line",
    "Double Line",
    "Triple Line",
    "Wati Design",
    "Pendant Style",
    "Choker Style",
    "Opera Length",
    "Matinee Length",
    "Princess Length",
    "Collar Length",
    "Box Chain Style",
    "Rope Chain Style",
    "Cable Chain Style",
    "Figaro Style",
    "Snake Chain Style",
    "Herringbone Style",
    "Wheat Chain Style",
    "Ball Chain Style",
    "Anchor Style",
    "Byzantine Style",
    "Plain Gold",
    "Diamond Studded",
    "Ruby Accented",
    "Emerald Accented",
    "Sapphire Accented",
    "Pearl Accented",
    "Coral Accented",
    "Onyx Accented",
    "Turquoise Accented",
    "Enamel Work",
  ],
};

async function productSeed(
  metalTypes,
  metalStamps,
  stoneShapes,
  categories,
  subcategories,
) {
  try {
    console.log("Starting product seed...");

    await Product.deleteMany({});
    await VariantGroup.deleteMany({});
    console.log("Cleared existing products and variant groups");

    // Step 1 — build all variant group docs first, batch insert them
    const variantGroupDocs = [];
    let counter = 0;

    for (const category of categories) {
      const designs = DESIGN_NAMES[category.name] || ["Classic"];
      const subcategoryNames = SUBCATEGORY_MAP[category.name] || [];

      for (const design of designs) {
        for (const subcategoryName of subcategoryNames) {
          variantGroupDocs.push({
            variantGroupCode: `${category.name.toUpperCase().slice(0, 3)}-${design.replace(/\s+/g, "-").toUpperCase()}-${counter++}`,
          });
        }
      }
    }

    // Batch insert variant groups, get back inserted docs with _ids
    const insertedGroups = await VariantGroup.insertMany(variantGroupDocs);
    console.log(`Created ${insertedGroups.length} variant groups`);

    // Step 2 — build all products using the inserted group IDs
    const allProducts = [];
    let groupIndex = 0;

    for (const category of categories) {
      const categoryName = category.name;
      const basePrice = CATEGORY_BASE_PRICE[categoryName] || 20000;
      const hasStone = !NO_STONE_CATEGORIES.includes(categoryName);
      const designs = DESIGN_NAMES[categoryName] || ["Classic"];
      const subcategoryNames = SUBCATEGORY_MAP[categoryName] || [];

      for (const design of designs) {
        for (const subcategoryName of subcategoryNames) {
          const subcategoryDoc = subcategories.find(
            (s) => s.name === subcategoryName,
          );
          if (!subcategoryDoc) {
            groupIndex++;
            continue;
          }

          const variantGroup = insertedGroups[groupIndex++];

          for (const metalType of metalTypes) {
            for (const metalStamp of metalStamps) {
              const multiplier = STAMP_PRICE_MULTIPLIER[metalStamp.name] || 1;
              const finalAmount = Math.round(basePrice * multiplier);
              const offerPrice = Math.round(finalAmount * 0.9);

              const stoneShape = hasStone
                ? stoneShapes[Math.floor(Math.random() * stoneShapes.length)]
                : null;

              const slug =
                `${design}-${categoryName}-${metalType.name}-${metalStamp.name}`
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^a-z0-9-]/g, "") +
                `-${groupIndex}-${metalType._id.toString().slice(-4)}`;

              allProducts.push({
                title: `${design} ${categoryName} - ${metalType.name} ${metalStamp.name}`,
                description: `Beautiful ${design.toLowerCase()} ${categoryName.toLowerCase()} crafted in ${metalType.name} with ${metalStamp.name} purity.`,
                images: [],
                slug,
                metalType: metalType._id,
                metalStamp: metalStamp._id,
                centreStone: hasStone,
                centreStoneShape: stoneShape ? stoneShape._id : undefined,
                carat: hasStone
                  ? (Math.random() * 1.5 + 0.25).toFixed(2)
                  : undefined,
                finalAmount,
                offerPrice,
                category: category._id,
                subcategory: subcategoryDoc._id,
                variantGroupId: variantGroup._id,
                status: "Active",
              });
            }
          }
        }
      }
      console.log(`Built products for: ${categoryName}`);
    }

    console.log(`Total products to insert: ${allProducts.length}`);

    // Step 3 — batch insert products in chunks of 500
    const chunkSize = 500;
    for (let i = 0; i < allProducts.length; i += chunkSize) {
      await Product.insertMany(allProducts.slice(i, i + chunkSize));
      console.log(
        `Inserted ${Math.min(i + chunkSize, allProducts.length)} / ${allProducts.length}`,
      );
    }

    console.log("Product seed complete!");
  } catch (error) {
    throw new ApiError(500, error.message);
  }
}

module.exports = productSeed;
