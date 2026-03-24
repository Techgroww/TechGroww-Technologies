import mongoose from "mongoose"

console.log("✅ Portfolio model loaded");

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },

  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },

  category: {
    type: String,
    required: true,
    enum: ['Web Development', 'App Development', 'UI/UX', 'Cloud & DevOps', 'E-commerce', 'AI'],
    trim: true
  },

  description: {
    type: String,
    required: true,
    trim: true
  },

  // Multiple images support (max 5) - REMOVED DUPLICATE
  images: {
    type: [String],
    default: [],
    validate: {
      validator: function (v) {
        return v.length <= 5;
      },
      message: 'Maximum 5 images allowed'
    }
  },

  // Keep single image for backward compatibility
  image: {
    type: String,
    default: ''
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Function to generate slug
function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// Pre-save middleware
portfolioSchema.pre("save", async function () {
  console.log("🔥 Pre-save running for:", this.title);

  if (!this.title) {
    throw new Error("Title is required");
  }

  // Generate base slug
  let baseSlug = generateSlug(this.title);
  let finalSlug = baseSlug;
  let counter = 1;

  // Check if slug exists
  const PortfolioModel = mongoose.model("Portfolio");
  let existingPortfolio = await PortfolioModel.findOne({ slug: finalSlug });

  while (existingPortfolio) {
    finalSlug = `${baseSlug}-${counter}`;
    existingPortfolio = await PortfolioModel.findOne({ slug: finalSlug });
    counter++;
  }

  this.slug = finalSlug;
  console.log("✅ Generated slug:", this.slug);
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;