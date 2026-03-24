import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import ImageCarousel from "../Components/ImageCarousel";

export default function PortfolioDetails() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    let isMounted = true;

    const fetchProject = async () => {
      if (!slug) {
        console.log("No slug provided");
        if (isMounted) setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const url = `${API_URL}/api/portfolio/slug/${slug}`;
        console.log("Fetching URL:", url);

        const response = await fetch(url);

        console.log("Response status:", response.status);
        console.log("Response ok:", response.ok);

        if (!response.ok) {
          const errorText = await response.text();
          console.log("Error response:", errorText);
          throw new Error(`Failed to fetch project: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log("Project data received:", data);

        if (isMounted) {
          setProject(data);
        }

      } catch (err) {
        console.error("Error fetching project:", err);
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProject();

    return () => {
      isMounted = false;
    };
  }, [slug]); // Only slug as dependency

  // Get images array
  const getImages = () => {
    if (!project) return [];
    if (project.images && project.images.length > 0) return project.images;
    if (project.image) return [project.image];
    return [];
  };

  const images = getImages();

  // Add this to debug
  console.log("Loading state:", loading);
  console.log("Project state:", project);
  console.log("Images:", images);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-white text-center">
          <div className="inline-block w-12 h-12 border-4 border-[#00D4FF] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg text-[#94A3B8]">Loading project details...</p>
          <p className="text-sm text-[#94A3B8] mt-2">Slug: {slug}</p>
          <p className="text-sm text-[#94A3B8]">API URL: {API_URL}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-white mb-2">Failed to Load Project</h3>
          <p className="text-[#94A3B8] mb-2">Error: {error}</p>
          <p className="text-[#94A3B8] mb-6">Slug: {slug}</p>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-2 bg-[#00D4FF] text-[#0A0F1E] rounded-lg font-medium hover:bg-[#00D4FF]/90 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-white mb-2">Project Not Found</h3>
          <p className="text-[#94A3B8] mb-2">No project found for slug: {slug}</p>
          <p className="text-[#94A3B8] mb-6">The portfolio project you're looking for doesn't exist.</p>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-2 bg-[#00D4FF] text-[#0A0F1E] rounded-lg font-medium hover:bg-[#00D4FF]/90 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0F172A] min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-[#0A0F1E]">
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, rgba(0, 212, 255, 0.2) 0%, transparent 50%),
                             radial-gradient(circle at 80% 70%, rgba(10, 31, 68, 0.2) 0%, transparent 50%)`,
          }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-[#00D4FF] transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Link>

            <div className="mb-4">
              <div className="inline-block px-4 py-2 bg-[#00D4FF]/20 text-[#00D4FF] rounded-full text-sm font-semibold border border-[#00D4FF]/30">
                {project.category}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {project.title}
            </h1>

            <div className="flex items-center gap-4 text-[#94A3B8]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(project.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span>{project.category}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Image Carousel - Responsive */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 mb-8 sm:mb-12 pt-6 sm:pt-8 md:pt-10">
        {images.length > 0 ? (
          <>
            <ImageCarousel
              images={images}
              autoPlay={true}
              interval={4000}
            />
          </>
        ) : (
          <div className="w-full aspect-video bg-linear-to-br from-[#0A1F44] to-[#00D4FF] rounded-2xl flex items-center justify-center">
            <div className="text-4xl sm:text-5xl md:text-6xl">🚀</div>
          </div>
        )}
      </div>

      {/* Project Description */}
      <section className="py-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#1A1F2E] rounded-2xl p-8 md:p-10 border border-[#1E293B]"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Project Overview</h2>

            <div className="prose prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  p: ({ children }) => (
                    <p className="text-[#94A3B8] text-lg leading-relaxed whitespace-pre-wrap">
                      {children}
                    </p>
                  ),
                  h1: ({ children }) => (
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 mt-6">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 mt-5">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 mt-4">
                      {children}
                    </h3>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc pl-5 space-y-2 my-4">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-5 space-y-2 my-4">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-[#94A3B8] text-base leading-relaxed">
                      {children}
                    </li>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00D4FF] hover:underline"
                    >
                      {children}
                    </a>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold text-white">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-[#94A3B8]">
                      {children}
                    </em>
                  ),
                  code: ({ children }) => (
                    <code className="bg-[#1A1F2E] px-1.5 py-0.5 rounded text-sm font-mono text-[#00D4FF]">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-[#1A1F2E] p-4 rounded-xl overflow-x-auto my-4">
                      {children}
                    </pre>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-[#00D4FF] pl-5 my-4 italic text-[#94A3B8]">
                      {children}
                    </blockquote>
                  ),
                  hr: () => (
                    <hr className="my-6 border-[#1E293B]" />
                  ),
                }}
              >
                {project.description}
              </ReactMarkdown>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#00D4FF] text-[#0A0F1E] rounded-lg font-medium hover:scale-105 transition-all hover:shadow-lg hover:shadow-[#00D4FF]/30"
            >
              <ArrowLeft className="w-4 h-4" />
              View All Projects
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}