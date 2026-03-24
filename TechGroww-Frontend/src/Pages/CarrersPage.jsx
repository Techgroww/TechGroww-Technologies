import { useState, useEffect } from 'react';
import { MapPin, Clock, Briefcase, TrendingUp, Calendar, DollarSign, BookOpen, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export function CareersPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/jobs`);

      if (!res.ok) throw new Error('Failed to fetch jobs');

      const data = await res.json();
      setJobs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Growth Opportunities',
      description: 'Clear career paths, mentorship, and learning budgets.',
    },
    {
      icon: Calendar,
      title: 'Flexible Work',
      description: 'Remote-first culture. Work from anywhere with flexible hours.',
    },
    {
      icon: DollarSign,
      title: 'Competitive Salary',
      description: 'Market-leading compensation with performance bonuses and equity options.',
    },
    {
      icon: BookOpen,
      title: 'Learning Culture',
      description: 'Access to courses, conferences, and certifications.',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-white text-center">
          <div className="inline-block w-12 h-12 border-4 border-[#00D4FF] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-[#94A3B8]">Loading job openings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-white mb-2">Failed to Load Jobs</h3>
          <p className="text-[#94A3B8] mb-6">{error}</p>
          <button
            onClick={fetchJobs}
            className="px-6 py-2 bg-[#00D4FF] text-[#0A0F1E] rounded-lg font-medium hover:bg-[#00D4FF]/90 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0F172A] min-h-screen">
      {/* Hero Section - Smaller Height */}
      <section className="relative pt-16 pb-12 md:pt-20 md:pb-16 lg:pt-24 lg:pb-20 overflow-hidden bg-[#0A0F1E]">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#00D4FF]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 text-center relative z-10 ">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 pt-6"
          >
            Join Our Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm md:text-base text-[#94A3B8] max-w-2xl mx-auto"
          >
            Help us build the future. We're looking for talented individuals who are passionate about technology and growth.
          </motion.p>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 md:py-24 px-5 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">

          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10 md:mb-12">
            Open Positions
          </h2>

          {jobs.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Open Positions Right Now</h3>
              <p className="text-[#94A3B8] max-w-md mx-auto">
                We're not hiring at the moment, but we're always looking for talented people.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job, index) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-[#1A1F2E] rounded-2xl p-5 md:p-6 border border-[#1E293B] hover:border-[#00D4FF]/50 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    {/* Left Content */}
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                        {job.title}
                      </h3>

                      <div className="flex flex-wrap gap-3 text-sm text-[#94A3B8] mb-4">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="w-4 h-4" />
                          {job.category || 'General'}
                        </span>
                      </div>

                      <p className="text-[#94A3B8] text-sm leading-relaxed line-clamp-2 md:line-clamp-3">
                        {job.description}
                      </p>
                    </div>

                    {/* Right Content - Button */}
                    <div className="md:ml-6">
                      <Link
                        to={`/careers/${job.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00D4FF] text-[#0A0F1E] rounded-lg font-medium hover:scale-105 transition-all text-sm whitespace-nowrap"
                      >
                        Read more
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 md:py-24 px-5 md:px-8 lg:px-12 bg-[#0A0F1E]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10 md:mb-12">
            Why Work With Us
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-[#1A1F2E] rounded-2xl p-6 border border-[#1E293B] hover:border-[#00D4FF]/50 transition-all duration-300 text-center group"
                >
                  <div className="w-14 h-14 rounded-full bg-[#00D4FF]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#00D4FF]/20 transition-colors">
                    <Icon className="w-7 h-7 text-[#00D4FF]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}