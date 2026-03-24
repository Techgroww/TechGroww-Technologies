import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useData } from "../context/DataContext";
import { ArrowLeft, Save, X, Upload } from "lucide-react"; // Removed unused ImageIcon

export default function PortfolioEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addPortfolio, updatePortfolio, getPortfolioById, portfolio } = useData();
  const isNew = !id;

  const categories = [
    'Web Development',
    'App Development',
    'UI/UX',
    'Cloud & DevOps',
    'E-commerce',
    'AI'
  ];

  const [formData, setFormData] = useState({
    title: "",
    category: "Web Development",
    description: "",
    images: []
  });

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  // Load existing portfolio data for edit
  useEffect(() => {
    if (isNew) return;

    const project = getPortfolioById(id);

    if (project) {
      setFormData({
        title: project.title || "",
        category: project.category || "Web Development",
        description: project.description || "",
        images: project.images || (project.image ? [project.image] : [])
      });
    }
  }, [id, portfolio, isNew, getPortfolioById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageUpload = async (file) => {
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload an image file');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size should be less than 5MB');
      return;
    }
    
    if (formData.images.length >= 5) {
      setUploadError('Maximum 5 images allowed');
      return;
    }
    
    setUploading(true);
    setUploadError(null);
    
    const uploadFormData = new FormData();
    uploadFormData.append('image', file);
    
    const token = localStorage.getItem('token');
    
    try {
      // Use single image upload endpoint (works for multiple uploads one by one)
      const response = await fetch(`${API_URL}/api/upload/portfolio`, {
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
      setFormData(prev => ({ 
        ...prev, 
        images: [...prev.images, data.imageUrl] 
      }));
      
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isNew) {
        await addPortfolio(formData);
      } else {
        await updatePortfolio(id, formData);
      }
      navigate("/portfolio");
    } catch (error) {
      console.error("Portfolio save error:", error);
    }
  };

  const handleDiscard = () => {
    navigate("/portfolio");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/portfolio")}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {isNew ? "Create New Portfolio Project" : "Edit Portfolio Project"}
          </h1>
          <p className="text-slate-400">
            Fill in the details below
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="backdrop-blur-xl bg-slate-900/40 border border-slate-700/50 rounded-2xl p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Project Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
              placeholder="Enter project title"
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
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all resize-none"
              placeholder="Describe the project..."
              rows="6"
              required
            />
          </div>

          {/* Multiple Images Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Project Images (Max 5)
            </label>
            
            {/* Image Previews */}
            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={image} 
                      alt={`Project image ${index + 1}`} 
                      className="w-full h-24 object-cover rounded-lg border border-[#1E293B]"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            {/* Upload Error */}
            {uploadError && (
              <div className="mb-3 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm">
                {uploadError}
              </div>
            )}
            
            {/* Image Upload Area */}
            {formData.images.length < 5 && (
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
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
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
                        Click to upload an image
                      </p>
                      <p className="text-xs text-[#94A3B8] mt-1">
                        Supports: JPG, PNG, GIF, WEBP (Max 5MB)
                      </p>
                      <p className="text-xs text-[#94A3B8] mt-1">
                        {formData.images.length}/5 images uploaded
                      </p>
                    </>
                  )}
                </label>
              </div>
            )}
          </div>
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