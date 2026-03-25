import express from "express"
import Blog from "../models/blogs.js"
import Job from "../models/job.js"
import Portfolio from "../models/portfolio.js"
import authMiddleware from "../middleware/authMiddleware.js"
import upload from '../middleware/upload.js';
import cloudinary from '../config/cloudinary.js'; // ADD THIS LINE

const router = express.Router()

// BLOG ROUTES

// Public: Get all blogs with pagination
router.get("/blogs", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;
    
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const totalBlogs = await Blog.countDocuments();
    
    res.json({
      blogs,
      currentPage: page,
      totalPages: Math.ceil(totalBlogs / limit),
      totalBlogs
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Public: Get blog by slug (WITH view counting)
router.get("/blogs/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    
    // Increment views count when user views the blog
    blog.views += 1;
    await blog.save();
    
    // Return blog without views to user
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Public: Get blogs by category
router.get("/blogs/category/:category", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;
    
    const blogs = await Blog.find({ category: req.params.category })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const totalBlogs = await Blog.countDocuments({ category: req.params.category });
    
    res.json({
      blogs,
      currentPage: page,
      totalPages: Math.ceil(totalBlogs / limit),
      totalBlogs
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Public: Search blogs
router.get("/blogs/search/:query", async (req, res) => {
  try {
    const query = req.params.query;
    const blogs = await Blog.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
        { excerpt: { $regex: query, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });
    
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Create blog
router.post("/blogs", authMiddleware, async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: error.message });
  }
});

// Admin: Update blog
router.put("/blogs/:id", authMiddleware, async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Delete blog
router.delete("/blogs/:id", authMiddleware, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Blog Image Upload
router.post('/upload/blog', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    res.json({
      success: true,
      imageUrl: req.file.path,
      publicId: req.file.filename
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

//JOB ROUTES

// Public: Get all jobs
router.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Failed to fetch jobs", error: error.message });
  }
});


// Admin: Create job
router.post("/jobs", authMiddleware, async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ message: "Failed to create job", error: error.message });
  }
});

//Public: Get job by slug

router.get("/jobs/:slug", async (req, res) => {
  try {
    const job = await Job.findOne({ slug: req.params.slug });
    
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    
    res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ message: "Failed to fetch job", error: error.message });
  }
});


// Update job (ADMIN)
router.put("/jobs/:id", authMiddleware, async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    
    res.status(200).json(job);
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ message: "Failed to update job", error: error.message });
  }
});


// Delete job (ADMIN)
router.delete("/jobs/:id", authMiddleware, async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Failed to delete job", error: error.message });
  }
});



// PORTFOLIO ROUTES

// GET all portfolios (public)
router.get("/portfolio", async (req, res) => {
  try {
    const portfolios = await Portfolio.find().sort({ createdAt: -1 });
    res.json(portfolios);
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    res.status(500).json({ message: "Failed to fetch portfolios", error: error.message });
  }
});

// GET by SLUG (public - for user pages)
// GET by SLUG (public - for user pages)
router.get("/portfolio/slug/:slug", async (req, res) => {
  try {
    console.log("Fetching portfolio with slug:", req.params.slug);
    
    const portfolio = await Portfolio.findOne({ slug: req.params.slug });

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    res.json(portfolio);
  } catch (error) {
    console.error("Error fetching portfolio by slug:", error);
    res.status(500).json({ message: "Failed to fetch portfolio", error: error.message });
  }
});

// GET by ID (admin use)
router.get("/portfolio/id/:id", async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    res.json(portfolio);
  } catch (error) {
    console.error("Error fetching portfolio by ID:", error);
    res.status(500).json({ message: "Failed to fetch portfolio", error: error.message });
  }
});

// CREATE
// CREATE Portfolio
// CREATE Portfolio
router.post("/portfolio", authMiddleware, async (req, res) => {
  try {
    console.log("Received portfolio data:", req.body);
    
    // Validate required fields
    const { title, category, description } = req.body;
    
    if (!title || !category || !description) {
      return res.status(400).json({ 
        message: "Missing required fields", 
        required: ["title", "category", "description"]
      });
    }
    
    // Create portfolio (slug will be auto-generated in pre-save)
    const portfolio = new Portfolio({
      title: title.trim(),
      category: category.trim(),
      description: description.trim(),
      images: req.body.images || [],  // ADD THIS - support multiple images
      image: req.body.image || ''      // Keep for backward compatibility
    });
    
    // Save to database
    const savedPortfolio = await portfolio.save();
    
    console.log("✅ Portfolio created successfully:", savedPortfolio);
    res.status(201).json(savedPortfolio);
    
  } catch (error) {
    console.error("❌ Error creating portfolio:", error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: "Validation error", 
        errors: Object.values(error.errors).map(e => e.message)
      });
    }
    
    res.status(500).json({ 
      message: "Failed to create portfolio", 
      error: error.message 
    });
  }
});

// UPDATE
router.put("/portfolio/:id", authMiddleware, async (req, res) => {
  try {
    const updated = await Portfolio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updated) {
      return res.status(404).json({ message: "Portfolio not found" });
    }
    
    res.json(updated);
  } catch (error) {
    console.error("Error updating portfolio:", error);
    res.status(500).json({ message: "Failed to update portfolio", error: error.message });
  }
});

// DELETE
// DELETE
router.delete("/portfolio/:id", authMiddleware, async (req, res) => {
  try {
    console.log("Deleting portfolio with ID:", req.params.id);
    
    const deleted = await Portfolio.findByIdAndDelete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({ message: "Portfolio not found" });
    }
    
    res.json({ message: "Portfolio deleted successfully" });
  } catch (error) {
    console.error("Error deleting portfolio:", error);
    res.status(500).json({ message: "Failed to delete portfolio", error: error.message });
  }
});

// Portfolio Image Upload
router.post('/upload/portfolio/multiple', authMiddleware, upload.array('images', 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
    
    const uploadedImages = req.files.map(file => ({
      imageUrl: file.path,
      publicId: file.filename
    }));
    
    res.json({
      success: true,
      images: uploadedImages
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

router.post('/upload/portfolio', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    res.json({
      success: true,
      imageUrl: req.file.path,
      publicId: req.file.filename
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});



// Delete image from Cloudinary
router.delete('/upload/delete/:publicId', authMiddleware, async (req, res) => {
  try {
    const { publicId } = req.params;
    await cloudinary.uploader.destroy(publicId);
    res.json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Delete failed', error: error.message });
  }
});

export default router