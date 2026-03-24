import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapPin, Clock, Briefcase, ArrowLeft, Calendar, Building } from 'lucide-react';

export function JobDetailPage() {
  const { slug } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log("Fetching job with slug:", slug);
        
        const response = await fetch(`${API_URL}/api/jobs/${slug}`);
        
        console.log("Response status:", response.status);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Job not found');
          }
          throw new Error('Failed to fetch job');
        }
        
        const data = await response.json();
        console.log("Job data:", data);
        setJob(data);
        
      } catch (err) {
        console.error("Error fetching job:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (slug) {
      fetchJob();
    }
  }, [slug]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-white text-center">
          <div className="inline-block w-12 h-12 border-4 border-[#00D4FF] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg text-[#94A3B8]">Loading job details...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-white mb-2">Failed to Load Job</h3>
          <p className="text-[#94A3B8] mb-6">{error}</p>
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 px-6 py-2 bg-[#00D4FF] text-[#0A0F1E] rounded-lg font-medium hover:bg-[#00D4FF]/90 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Careers
          </Link>
        </div>
      </div>
    );
  }

  // No Job Found
  if (!job) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-white mb-2">Job Not Found</h3>
          <p className="text-[#94A3B8] mb-6">The job you're looking for doesn't exist.</p>
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 px-6 py-2 bg-[#00D4FF] text-[#0A0F1E] rounded-lg font-medium hover:bg-[#00D4FF]/90 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Careers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0F172A] min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-[#0A0F1E]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, rgba(0, 212, 255, 0.2) 0%, transparent 50%)`,
          }}
        />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-[#00D4FF] transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Careers
            </Link>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {job.title}
            </h1>
            
            <div className="flex flex-wrap gap-6 text-[#94A3B8]">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                <span>{job.category || 'General'}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{job.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>Posted {new Date(job.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Job Description */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#1A1F2E] rounded-2xl p-8 md:p-10 border border-[#1E293B]"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Job Description</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-[#94A3B8] text-lg leading-relaxed whitespace-pre-wrap">
                {job.description}
              </p>
            </div>
          </motion.div>

          {/* Application Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <button
              className="px-8 py-3 bg-[#00D4FF] text-[#0A0F1E] rounded-lg font-medium hover:scale-105 transition-all hover:shadow-lg hover:shadow-[#00D4FF]/30"
            >
              Apply Now
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}