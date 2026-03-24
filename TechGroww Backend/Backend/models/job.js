import mongoose from "mongoose"

console.log("✅ Jobs model loaded");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    sparse: true
  },
  
  category: {
    type: String,
    required: true,
    enum: ['Engineering', 'Design', 'Marketing', 'Sales', 'Product', 'Operations'],
    trim: true
  },
  
  type: {
    type: String,
    required: true,
    enum: ['Full Time', 'Part Time', 'Contract', 'Internship'],
    trim: true
  },
  
  location: {
    type: String,
    required: true,
    enum: ['Remote', 'Hybrid', 'Onsite'],
    trim: true
  },
  
  description: {
    type: String,
    required: true,
    trim: true
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Function to generate slug from title
function generateSlug(title) {
  if (!title) return 'untitled';
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// Pre-save middleware to auto-generate slug - FIXED (no next parameter)
jobSchema.pre("save", async function() {
  console.log("🔥 Job pre-save running for:", this.title);
  console.log("Current slug:", this.slug);
  console.log("Current category:", this.category);
  
  // Generate slug if it doesn't exist
  if (!this.slug && this.title) {
    let baseSlug = generateSlug(this.title);
    let finalSlug = baseSlug;
    let counter = 1;
    
    // Check if slug already exists
    const Job = mongoose.model("Job");
    let existingJob = await Job.findOne({ slug: finalSlug });
    
    // If slug exists, append counter
    while (existingJob) {
      finalSlug = `${baseSlug}-${counter}`;
      existingJob = await Job.findOne({ slug: finalSlug });
      counter++;
    }
    
    this.slug = finalSlug;
    console.log("✅ Generated slug:", this.slug);
  }
  
  // Ensure category has a value
  if (!this.category) {
    this.category = 'Engineering';
    console.log("📌 Set default category:", this.category);
  }
  
  // Ensure type has a value
  if (!this.type) {
    this.type = 'Full Time';
    console.log("📌 Set default type:", this.type);
  }
  
  // Ensure location has a value
  if (!this.location) {
    this.location = 'Remote';
    console.log("📌 Set default location:", this.location);
  }
});

const Job = mongoose.model("Job", jobSchema)

export default Job