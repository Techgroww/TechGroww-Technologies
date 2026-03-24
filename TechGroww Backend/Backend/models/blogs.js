import mongoose from "mongoose"

console.log("✅ Blog model loaded");

const blogSchema = new mongoose.Schema({
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
    enum: ['Technology', 'Artificial Intelligence', 'Security', 'Cloud Computing', 'Web Development', 'Mobile Development'],
    trim: true
  },
  
  excerpt: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  
  content: {
    type: String,
    required: true,
    trim: true
  },
  
  featuredImage: {
    type: String,
    default: ''
  },
  
  author: {
    type: String,
    default: 'TechGroww Team',
    trim: true
  },
  
  views: {
    type: Number,
    default: 0
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Function to generate slug from title
function generateSlug(title) {
  if (!title) return 'untitled';
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// Pre-save middleware
blogSchema.pre("save", async function() {
  console.log("🔥 Blog pre-save running for:", this.title);
  
  // Generate slug if it doesn't exist
  if (!this.slug && this.title) {
    let baseSlug = generateSlug(this.title);
    let finalSlug = baseSlug;
    let counter = 1;
    
    const Blog = mongoose.model("Blog");
    let existingBlog = await Blog.findOne({ slug: finalSlug });
    
    while (existingBlog) {
      finalSlug = `${baseSlug}-${counter}`;
      existingBlog = await Blog.findOne({ slug: finalSlug });
      counter++;
    }
    
    this.slug = finalSlug;
    console.log("✅ Generated slug:", this.slug);
  }
  
  // Generate excerpt from content if not provided
  if (!this.excerpt && this.content) {
    this.excerpt = this.content.substring(0, 160) + '...';
  }
  
  this.updatedAt = Date.now();
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;