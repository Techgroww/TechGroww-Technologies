import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Clock, Eye } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/blogs/${slug}`);
        
        if (!res.ok) {
          if (res.status === 404) throw new Error('Blog not found');
          throw new Error('Failed to fetch blog');
        }
        
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (slug) fetchBlog();
  }, [slug]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-white text-center">
          <div className="inline-block w-12 h-12 border-4 border-[#00D4FF] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg text-[#94A3B8]">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-white mb-2">Article Not Found</h3>
          <p className="text-[#94A3B8] mb-6">{error || 'The article you\'re looking for doesn\'t exist.'}</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-2 bg-[#00D4FF] text-[#0A0F1E] rounded-lg font-medium hover:bg-[#00D4FF]/90 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0F172A] min-h-screen">
      {/* Hero Section - Clean and minimal */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 lg:pt-40 lg:pb-24 overflow-hidden bg-linear-to-b from-[#0A0F1E] to-[#0F172A]">
        <div className="max-w-4xl mx-auto px-5 md:px-8 lg:px-12 relative z-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-[#00D4FF] transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          
          <div className="mb-5">
            <span className="inline-block px-3 py-1 bg-[#00D4FF]/20 text-[#00D4FF] rounded-full text-xs font-semibold border border-[#00D4FF]/30">
              {blog.category}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
            {blog.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-[#94A3B8]">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{blog.author}</span>
            </div>
            <div className="w-1 h-1 bg-[#94A3B8] rounded-full" />
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(blog.createdAt)}</span>
            </div>
            <div className="w-1 h-1 bg-[#94A3B8] rounded-full" />
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{blog.readTime || 5} min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image - Full width with container */}
      {blog.featuredImage && (
        <div className="relative -mt-10 mb-12">
          <div className="max-w-4xl mx-auto px-5 md:px-8 lg:px-12">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0F172A] via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </div>
      )}

      {/* Content - Enhanced readability */}
      <section className="py-8 pb-20 md:py-12 md:pb-32">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <div className="prose prose-invert prose-lg max-w-none
            prose-headings:text-white
            prose-headings:font-bold
            prose-h1:text-3xl md:prose-h1:text-4xl
            prose-h2:text-2xl md:prose-h2:text-3xl
            prose-h3:text-xl md:prose-h3:text-2xl
            prose-p:text-[#CBD5E1]
            prose-p:leading-relaxed
            prose-p:mb-5
            prose-strong:text-white
            prose-strong:font-semibold
            prose-a:text-[#00D4FF]
            prose-a:no-underline
            prose-a:hover:underline
            prose-ul:text-[#CBD5E1]
            prose-li:text-[#CBD5E1]
            prose-li:mb-2
            prose-blockquote:border-l-4
            prose-blockquote:border-[#00D4FF]
            prose-blockquote:pl-5
            prose-blockquote:text-[#94A3B8]
            prose-blockquote:italic
            prose-img:rounded-xl
            prose-img:shadow-lg
          ">
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="text-[#CBD5E1] text-base md:text-lg leading-relaxed mb-5">
                    {children}
                  </p>
                ),
                h1: ({ children }) => (
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-8 mb-4">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mt-6 mb-3">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg md:text-xl font-bold text-white mt-5 mb-2">
                    {children}
                  </h3>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-5 space-y-2 my-4">
                    {children}
                  </ul>
                ),
                li: ({ children }) => (
                  <li className="text-[#CBD5E1] text-base md:text-lg">
                    {children}
                  </li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-[#00D4FF] pl-5 my-6 italic text-[#94A3B8]">
                    {children}
                  </blockquote>
                ),
                code: ({ children }) => (
                  <code className="bg-[#1A1F2E] px-2 py-1 rounded text-sm font-mono text-[#00D4FF]">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-[#1A1F2E] p-4 rounded-xl overflow-x-auto my-6">
                    {children}
                  </pre>
                ),
              }}
            >
              {blog.content}
            </ReactMarkdown>
          </div>

          {/* Divider */}
          <div className="my-12 border-t border-[#1E293B]" />

          {/* Author Section */}
          <div className="bg-[#1A1F2E] rounded-2xl p-6 border border-[#1E293B]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#00D4FF] to-teal-500 flex items-center justify-center text-white font-bold text-xl">
                {blog.author.charAt(0)}
              </div>
              <div>
                <h4 className="text-white font-semibold">{blog.author}</h4>
                <p className="text-sm text-[#94A3B8]">TechGroww Team</p>
              </div>
            </div>
            <p className="text-[#94A3B8] text-sm mt-4">
              Passionate about sharing knowledge and insights from the world of technology, design, and innovation.
            </p>
          </div>

          {/* Back to Blog Button */}
          <div className="mt-10 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#00D4FF] text-[#0A0F1E] rounded-lg font-medium hover:scale-105 transition-all hover:shadow-lg hover:shadow-[#00D4FF]/30"
            >
              <ArrowLeft className="w-4 h-4" />
              Browse More Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}