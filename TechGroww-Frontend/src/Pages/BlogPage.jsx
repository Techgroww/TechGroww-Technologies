import { useState, useEffect } from 'react';
import { Search, User, FolderOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Track initial load

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const categories = [
    { name: 'All', count: 0 },
    { name: 'Technology', count: 0 },
    { name: 'Artificial Intelligence', count: 0 },
    { name: 'Security', count: 0 },
    { name: 'Cloud Computing', count: 0 },
    { name: 'Web Development', count: 0 },
    { name: 'Mobile Development', count: 0 },
  ];

  useEffect(() => {
    fetchBlogs();
  }, [currentPage, activeCategory]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      let url = `${API_URL}/api/blogs?page=${currentPage}&limit=6`;

      if (activeCategory !== 'All') {
        url = `${API_URL}/api/blogs/category/${activeCategory}?page=${currentPage}&limit=6`;
      }

      const res = await fetch(url);

      if (!res.ok) throw new Error('Failed to fetch blogs');

      const data = await res.json();
      setBlogs(data.blogs || []);
      setTotalPages(data.totalPages || 1);

      // Update category counts
      const allBlogsRes = await fetch(`${API_URL}/api/blogs`);
      const allBlogsData = await allBlogsRes.json();
      const allBlogs = allBlogsData.blogs || [];

      const updatedCategories = categories.map(cat => {
        if (cat.name === 'All') {
          return { ...cat, count: allBlogs.length };
        }
        return {
          ...cat,
          count: allBlogs.filter(blog => blog.category === cat.name).length
        };
      });

      categories.forEach((cat, index) => {
        categories[index].count = updatedCategories[index].count;
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setIsInitialLoad(false); // Mark initial load as complete
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchBlogs();
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/blogs/search/${searchQuery}`);

      if (!res.ok) throw new Error('Search failed');

      const data = await res.json();
      setBlogs(data);
      setTotalPages(1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Show loading only on initial load, not on category change
  if (isInitialLoad && loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-white text-center">
          <div className="inline-block w-12 h-12 border-4 border-[#00D4FF] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg text-[#94A3B8]">Loading articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-white mb-2">Failed to Load Blogs</h3>
          <p className="text-[#94A3B8] mb-6">{error}</p>
          <button
            onClick={fetchBlogs}
            className="px-6 py-2 bg-[#00D4FF] text-[#0A0F1E] rounded-lg font-medium hover:bg-[#00D4FF]/90 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-[#0A0F1E]">
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, #00D4FF 0px, #00D4FF 2px, transparent 2px, transparent 40px),
                             repeating-linear-gradient(90deg, #00D4FF 0px, #00D4FF 2px, transparent 2px, transparent 40px)`,
          }}
        />

        <div className="max-w-300 mx-auto px-6 md:px-12 lg:px-20 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Insights & Tech Articles
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#94A3B8] max-w-2xl mx-auto"
          >
            Stay updated with the latest trends, tutorials, and industry insights.
          </motion.p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="pb-20 bg-[#0F172A] pt-8">
        <div className="max-w-300 mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_3fr] gap-6 lg:gap-8">

            {/* Mobile Search + Category */}
            <div className="lg:hidden flex flex-col gap-4 mb-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#1A1F2E] border border-[#1E293B] text-white placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#00D4FF]"
                />
              </div>

              {/* Category Dropdown */}
              <div className='relative'>
                <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => {
                        setActiveCategory(category.name);
                        setCurrentPage(1);
                      }}
                      className={`whitespace-nowrap px-4 py-2 rounded-full text-sm transition ${activeCategory === category.name
                        ? 'bg-[#00D4FF] text-[#0A0F1E]'
                        : 'bg-[#1A1F2E] text-white border border-[#1E293B]'
                        }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
                <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-linear-to-l from-[#0F172A] to-transparent" />
              </div>
            </div>

            {/* Sidebar */}
            <div className="hidden lg:block lg:sticky lg:top-24 self-start space-y-6">
              {/* Search */}
              <div className="bg-[#1A1F2E] rounded-xl p-6 border border-[#1E293B]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#0F172A] border border-[#1E293B] text-white placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="bg-[#1A1F2E] rounded-xl p-6 border border-[#1E293B]">
                <h3 className="font-bold text-white mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => {
                        setActiveCategory(category.name);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeCategory === category.name
                        ? 'bg-[#00D4FF]/10 text-[#00D4FF] font-bold'
                        : 'text-white hover:bg-[#1E293B]'
                        }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Blog Grid - Add loading overlay for category changes */}
            <div className="relative">
              {/* Loading overlay for category changes */}
              {loading && !isInitialLoad && (
                <div className="absolute inset-0 bg-[#0F172A]/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
                  <div className="bg-[#1A1F2E] p-4 rounded-xl shadow-xl">
                    <div className="inline-block w-8 h-8 border-4 border-[#00D4FF] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </div>
              )}

              {/* Check if no blogs found */}
              {blogs.length === 0 && !loading ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center text-center py-16 md:py-20"
                >
                  <div className="w-20 h-20 bg-[#1A1F2E] rounded-full flex items-center justify-center mb-4">
                    <FolderOpen className="w-10 h-10 text-[#94A3B8]" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                    No blogs right now
                  </h3>
                  <p className="text-[#94A3B8] max-w-md">
                    {activeCategory === 'All' 
                      ? 'No blog posts available yet. Check back soon for new content!'
                      : `No blogs found in the "${activeCategory}" category.`}
                  </p>
                  {activeCategory !== 'All' && (
                    <button
                      onClick={() => {
                        setActiveCategory('All');
                        setCurrentPage(1);
                      }}
                      className="mt-6 px-6 py-2 bg-[#00D4FF]/20 text-[#00D4FF] rounded-lg hover:bg-[#00D4FF]/30 transition-all"
                    >
                      View All Articles
                    </button>
                  )}
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {blogs.map((post, index) => (
                    <motion.article
                      key={post._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="group bg-[#1A1F2E] rounded-xl overflow-hidden border border-[#1E293B] hover:shadow-xl hover:shadow-[#00D4FF]/20 hover:-translate-y-1 hover:border-[#00D4FF]/50 transition-all duration-300 flex flex-col h-full"
                    >
                      {/* Featured Image */}
                      <div className="relative aspect-video bg-linear-to-br from-[#0A1F44] to-[#00D4FF] overflow-hidden flex items-center justify-center shrink-0">
                        {post.featuredImage ? (
                          <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.style.display = 'none';
                              e.target.parentElement.innerHTML = '<div class="text-6xl">📝</div>';
                            }}
                          />
                        ) : (
                          <div className="text-6xl group-hover:scale-110 transition-transform">
                            📝
                          </div>
                        )}
                      </div>

                      {/* Content - Flex column to push button to bottom */}
                      <div className="p-6 flex flex-col flex-1">
                        <div>
                          <div className="inline-block px-3 py-1 bg-[#00D4FF] text-[#0A0F1E] text-xs uppercase font-semibold rounded-full mb-3">
                            {post.category}
                          </div>

                          <h2 className="text-xl font-bold text-white mb-2 group-hover:text-[#00D4FF] transition-colors line-clamp-2">
                            {post.title}
                          </h2>

                          <p className="text-[#94A3B8] text-sm leading-relaxed mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                        </div>

                        {/* Meta section */}
                        <div className="flex items-center gap-3 text-sm mb-4">
                          <div className="w-6 h-6 bg-[#1E293B] rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-[#94A3B8]" />
                          </div>
                          <span className="font-medium text-white">{post.author}</span>
                          <span className="text-[#94A3B8]">•</span>
                          <span className="text-[#94A3B8]">{formatDate(post.createdAt)}</span>
                        </div>

                        {/* Read More Button - Bottom Left */}
                        <div className="mt-auto">
                          <Link
                            to={`/blog/${post.slug}`}
                            className="text-[#00D4FF] text-sm font-medium hover:underline inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                          >
                            Read More
                            <span>→</span>
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}

              {/* Pagination - Only show if there are blogs */}
              {totalPages > 1 && blogs.length > 0 && (
                <div className="flex justify-center gap-2 mt-12">
                  {[...Array(Math.min(totalPages, 4))].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-lg font-medium transition-all ${currentPage === pageNum
                            ? 'bg-[#00D4FF] text-[#0A0F1E] shadow-lg shadow-[#00D4FF]/30'
                            : 'bg-[#1A1F2E] text-white border border-[#1E293B] hover:bg-[#00D4FF] hover:text-[#0A0F1E]'
                          }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  {totalPages > 4 && (
                    <>
                      <span className="px-2 py-2 text-white">...</span>
                      <button
                        onClick={() => setCurrentPage(totalPages)}
                        className={`w-10 h-10 rounded-lg font-medium transition-all ${currentPage === totalPages
                            ? 'bg-[#00D4FF] text-[#0A0F1E] shadow-lg shadow-[#00D4FF]/30'
                            : 'bg-[#1A1F2E] text-white border border-[#1E293B] hover:bg-[#00D4FF] hover:text-[#0A0F1E]'
                          }`}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 h-10 rounded-lg font-medium bg-[#1A1F2E] text-white border border-[#1E293B] hover:bg-[#00D4FF] hover:text-[#0A0F1E] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}