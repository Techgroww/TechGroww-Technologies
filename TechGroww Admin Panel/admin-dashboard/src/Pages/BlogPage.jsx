import { useEffect, useState } from "react";
import { useData } from "../context/DataContext";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, FileText, Eye, Calendar, ChevronRight } from "lucide-react";

export default function BlogsPage() {
  const { blogs, fetchBlogs, deleteBlog } = useData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      await fetchBlogs();
      setLoading(false);
    };
    loadBlogs();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      deleteBlog(id);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="text-white text-center">
          <div className="inline-block w-12 h-12 border-4 border-[#00D4FF] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg text-[#94A3B8]">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">
            Blogs Management
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Manage all your blog posts - Views are automatically tracked
          </p>
        </div>
        <Link
          to="/blogs/new"
          className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-linear-to-r from-cyan-500 to-teal-500 text-white font-medium shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] transition-all text-sm sm:text-base"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          Add Blog
        </Link>
      </div>

      {/* Mobile Card View (shows on mobile, hidden on desktop) */}
      <div className="block lg:hidden space-y-3">
        {blogs.length === 0 ? (
          <div className="text-center py-16 px-6 bg-slate-900/40 rounded-2xl border border-slate-700/50">
            <FileText className="w-16 h-16 mx-auto mb-4 text-slate-600" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No blogs yet
            </h3>
            <p className="text-slate-400 mb-6">
              Get started by creating your first blog post
            </p>
            <Link
              to="/blogs/new"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-cyan-500 to-teal-500 text-white font-medium shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] transition-all"
            >
              <Plus className="w-5 h-5" />
              Create First Blog
            </Link>
          </div>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-slate-900/40 border border-slate-700/50 rounded-xl p-4 hover:border-cyan-500/50 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 mr-3">
                  <h3 className="text-white font-semibold text-base wrap-break-words line-clamp-2">
                    {blog.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="px-2 py-1 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs font-medium">
                      {blog.category}
                    </span>
                    <span className="px-2 py-1 rounded-lg bg-green-500/20 text-green-400 text-xs font-medium flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {blog.views || 0} views
                    </span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Link
                    to={`/blogs/edit/${blog._id}`}
                    className="p-2 rounded-lg text-cyan-400 hover:bg-cyan-500/10 transition-all"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-xs text-slate-400 pt-2 border-t border-slate-700/30">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Table View (hidden on mobile, shows on desktop) */}
      <div className="hidden lg:block">
        <div className="backdrop-blur-xl bg-slate-900/40 border border-slate-700/50 rounded-2xl overflow-hidden">
          {blogs.length === 0 ? (
            <div className="text-center py-16 px-6">
              <FileText className="w-16 h-16 mx-auto mb-4 text-slate-600" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No blogs yet
              </h3>
              <p className="text-slate-400 mb-6">
                Get started by creating your first blog post
              </p>
              <Link
                to="/blogs/new"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-cyan-500 to-teal-500 text-white font-medium shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] transition-all"
              >
                <Plus className="w-5 h-5" />
                Create First Blog
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-200">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                      Blog Title
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                      Category
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">
                      <Eye className="w-4 h-4 inline mr-1" />
                      Views
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                      Created Date
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => (
                    <tr
                      key={blog._id}
                      className="border-b border-slate-700/30 hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-white font-medium max-w-75">
                        <div className="truncate" title={blog.title}>
                          {blog.title}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-400 text-sm whitespace-nowrap">
                          {blog.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-3 py-1 rounded-lg bg-green-500/20 text-green-400 text-sm font-semibold">
                          {blog.views || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/blogs/edit/${blog._id}`}
                            className="p-2 rounded-lg text-cyan-400 hover:bg-cyan-500/10 transition-all"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(blog._id)}
                            className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}