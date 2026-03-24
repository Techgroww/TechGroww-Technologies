import { useState, useEffect, useCallback, useMemo } from 'react';
import { ExternalLink, Image } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const PortfolioPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = useMemo(() => [
    'All',
    'Web Development',
    'App Development',
    'UI/UX',
    'Cloud & DevOps',
    'E-commerce',
    'AI'
  ], []);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const fetchPortfolio = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await fetch(`${API_URL}/api/portfolio`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      
      if (!res.ok) {
        throw new Error(`Failed to fetch portfolio: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      
      const projectsArray = Array.isArray(data) ? data : [];
      setProjects(projectsArray);
      
    } catch (err) {
      console.error('Portfolio fetch error:', err);
      setError(err.message || 'Something went wrong while loading portfolio.');
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return projects;
    }
    
    return projects.filter((project) => {
      const category = (project.category || '').trim();
      return category === activeFilter;
    });
  }, [projects, activeFilter]);

  const getThumbnail = (project) => {
    if (project.images && project.images.length > 0) {
      return project.images[0];
    }
    if (project.image) {
      return project.image;
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-white text-center">
          <div className="inline-block w-12 h-12 border-4 border-[#00D4FF] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg text-[#94A3B8]">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-white mb-2">Failed to Load Portfolio</h3>
          <p className="text-[#94A3B8] mb-6">{error}</p>
          <button
            onClick={fetchPortfolio}
            className="px-6 py-2 bg-[#00D4FF] text-[#0A0F1E] rounded-lg font-medium hover:bg-[#00D4FF]/90 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0F172A] min-h-screen" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Hero Section with Animation */}
      <section className="relative pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-32 md:pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-[#0A0F1E]">
        {/* Animated Background */}
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, rgba(0, 212, 255, 0.2) 0%, transparent 50%),
                             radial-gradient(circle at 80% 70%, rgba(10, 31, 68, 0.2) 0%, transparent 50%)`,
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight"
          >
            Our Work
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-[#94A3B8] max-w-3xl mx-auto px-2"
          >
            Real projects. Real results. See how we've helped businesses scale with technology.
          </motion.p>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          
          {/* Filters */}
          <div className="mb-6 sm:mb-8 lg:mb-12">
            <div className="relative">
              <div className="flex lg:justify-center gap-2 sm:gap-3 overflow-x-auto whitespace-nowrap no-scrollbar pb-2">
                {categories.map((filter) => (
                  <motion.button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`cursor-pointer shrink-0 px-3 sm:px-4 md:px-5 lg:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                      activeFilter === filter
                        ? 'bg-[#00D4FF] text-[#0A0F1E] shadow-lg shadow-[#00D4FF]/30'
                        : 'bg-[#1A1F2E] text-white hover:bg-[#1E293B] border border-[#1E293B] hover:border-[#00D4FF]/50'
                    }`}
                  >
                    {filter}
                  </motion.button>
                ))}
              </div>
              {/* Fade indicator for mobile */}
              <div className="pointer-events-none absolute right-0 top-0 h-full w-8 sm:w-10 bg-linear-to-l from-[#0F172A] to-transparent z-10 lg:hidden" />
            </div>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 sm:py-16 md:py-20"
            >
              <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">🔍</div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2">No projects found</h3>
              <p className="text-sm sm:text-base text-[#94A3B8] px-4">
                {activeFilter === 'All' 
                  ? 'No portfolio projects available yet.' 
                  : `No projects found in the "${activeFilter}" category.`}
              </p>
              {activeFilter !== 'All' && (
                <button
                  onClick={() => setActiveFilter('All')}
                  className="mt-4 px-5 sm:px-6 py-2 bg-[#00D4FF]/20 text-[#00D4FF] rounded-lg hover:bg-[#00D4FF]/30 transition-all text-sm sm:text-base"
                >
                  View All Projects
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8"
            >
              {filteredProjects.map((project, index) => {
                const thumbnail = getThumbnail(project);
                const hasMultipleImages = project.images && project.images.length > 1;
                
                return (
                  <motion.div
                    key={project._id || index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                  >
                    <Link 
                      to={`/portfolio/${project.slug}`}
                      className="block group h-full"
                    >
                      <div className="bg-[#1A1F2E] rounded-xl overflow-hidden border border-[#1E293B] hover:border-[#00D4FF]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#00D4FF]/20 h-full flex flex-col">
                        
                        {/* Image Container */}
                        <div className="relative aspect-video bg-linear-to-br from-[#0A1F44] to-[#00D4FF] overflow-hidden shrink-0">
                          {thumbnail ? (
                            <img
                              src={thumbnail}
                              alt={project.title || 'Project'}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              loading="lazy"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.style.display = 'none';
                                e.target.parentElement.innerHTML = '<div class="text-4xl sm:text-5xl md:text-6xl">🚀</div>';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-4xl sm:text-5xl md:text-6xl bg-linear-to-br from-[#0A1F44] to-[#00D4FF]">
                              🚀
                            </div>
                          )}
                          
                          {/* Multiple Images Badge */}
                          {hasMultipleImages && (
                            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md text-white text-xs flex items-center gap-1">
                              <Image className="w-3 h-3" />
                              <span>{project.images.length}</span>
                            </div>
                          )}
                          
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-linear-to-t from-[#0A1F44]/90 via-[#0A1F44]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 px-4">
                              <ExternalLink className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mx-auto mb-1 sm:mb-2" />
                              <p className="font-medium text-xs sm:text-sm">View Case Study</p>
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-3 sm:p-4 md:p-5 lg:p-6 flex-1 flex flex-col">
                          <div className="mb-2 sm:mb-3">
                            <span className="inline-block px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 bg-[#00D4FF]/20 text-[#00D4FF] text-[10px] sm:text-xs font-semibold rounded-full border border-[#00D4FF]/30">
                              {project.category || 'General'}
                            </span>
                          </div>

                          <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1.5 sm:mb-2 line-clamp-2 group-hover:text-[#00D4FF] transition-colors bwrap-reak-words">
                            {project.title || 'Untitled'}
                          </h3>

                          <p className="text-[#94A3B8] text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3 flex-1">
                            {project.description || 'No description available.'}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-32 bg-linear-to-b from-[#0A0F1E] to-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight"
          >
            Ready to Start Your Project?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-[#94A3B8] mb-6 sm:mb-7 md:mb-8 max-w-2xl mx-auto px-4"
          >
            Let's discuss how we can help you achieve your goals with our expertise.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 bg-[#00D4FF] text-[#0A0F1E] rounded-lg font-medium transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#00D4FF]/30 active:scale-95 text-sm sm:text-base"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;