import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useData } from "../context/DataContext";
import { ArrowLeft, Save, X, Eye, Upload } from "lucide-react";

export default function BlogEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addBlog, updateBlog, blogs } = useData();
  const isNew = !id;

  const [formData, setFormData] = useState({
    title: "",
    category: "Technology",
    excerpt: "",
    content: "",
    featuredImage: "",
    views: 0
  });

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    if (!isNew && id && blogs.length > 0) {
      const blog = blogs.find(b => b._id === id);
      if (blog) {
        setFormData({
          title: blog.title || "",
          category: blog.category || "Technology",
          excerpt: blog.excerpt || "",
          content: blog.content || "",
          featuredImage: blog.featuredImage || "",
          views: blog.views || 0
        });
      }
    }
  }, [id, isNew, blogs]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle image upload to Cloudinary
  const handleImageUpload = async (file) => {
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload an image file');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size should be less than 5MB');
      return;
    }
    
    setUploading(true);
    setUploadError(null);
    
    const uploadFormData = new FormData();
    uploadFormData.append('image', file);
    
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${API_URL}/api/upload/blog`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: uploadFormData,
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Upload failed');
      }
      
      const data = await response.json();
      setFormData(prev => ({ ...prev, featuredImage: data.imageUrl }));
      
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isNew) {
        await addBlog(formData);
      } else {
        await updateBlog(id, formData);
      }
      navigate("/blogs");
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  const handleDiscard = () => {
    navigate("/blogs");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/blogs")}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {isNew ? "Create New Blog" : "Edit Blog"}
          </h1>
          <p className="text-slate-400">
            Fill in the details below
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="backdrop-blur-xl bg-slate-900/40 border border-slate-700/50 rounded-2xl p-6 space-y-6">
          {/* Blog Title */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Blog Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
              placeholder="Enter blog title"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
              required
            >
              <option value="Technology">Technology</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Security">Security</option>
              <option value="Cloud Computing">Cloud Computing</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile Development">Mobile Development</option>
            </select>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Excerpt (Short Description) *
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all resize-none"
              placeholder="Write a short summary of your blog (max 200 characters)..."
              rows="3"
              maxLength="200"
              required
            />
            <p className="text-right text-xs text-slate-400 mt-1">
              {formData.excerpt.length}/200 characters
            </p>
          </div>

          {/* Blog Content */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Blog Content *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all resize-none"
              placeholder="Write your blog content here..."
              rows="12"
              required
            />
          </div>

          {/* Featured Image - Cloudinary Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Featured Image
            </label>
            
            {/* Show current image if exists */}
            {formData.featuredImage && (
              <div className="mb-3 relative">
                <img 
                  src={formData.featuredImage} 
                  alt="Featured" 
                  className="w-full h-48 object-cover rounded-lg border border-[#1E293B]"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, featuredImage: "" })}
                  className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            
            {/* Upload Error */}
            {uploadError && (
              <div className="mb-3 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm">
                {uploadError}
              </div>
            )}
            
            {/* Image Upload Area */}
            <div className="border-2 border-dashed border-[#1E293B] rounded-lg p-6 text-center hover:border-[#00D4FF]/50 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleImageUpload(e.target.files[0]);
                  }
                }}
                disabled={uploading}
                className="hidden"
                id="blog-image-upload"
              />
              <label
                htmlFor="blog-image-upload"
                className="cursor-pointer block"
              >
                {uploading ? (
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 border-4 border-[#00D4FF] border-t-transparent rounded-full animate-spin mb-2"></div>
                    <p className="text-sm text-[#94A3B8]">Uploading to Cloudinary...</p>
                  </div>
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-[#94A3B8] mx-auto mb-2" />
                    <p className="text-sm text-[#94A3B8]">
                      Click to upload a featured image
                    </p>
                    <p className="text-xs text-[#94A3B8] mt-1">
                      Supports: JPG, PNG, GIF, WEBP (Max 5MB)
                    </p>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Views - Admin Only (Read-only) */}
          {!isNew && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Eye className="w-4 h-4 inline mr-1" />
                Total Views
              </label>
              <div className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white opacity-75 cursor-not-allowed">
                {formData.views} views
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Views are automatically counted when users read this blog
              </p>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={uploading}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-cyan-500 to-teal-500 text-white font-medium shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] transition-all disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
          <button
            type="button"
            onClick={handleDiscard}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
            Discard Changes
          </button>
        </div>
      </form>
    </div>
  );
}