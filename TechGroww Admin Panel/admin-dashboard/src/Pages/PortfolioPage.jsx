import { useData } from "../context/DataContext";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, Briefcase, Calendar } from "lucide-react";
import { useState } from "react";

export default function PortfolioPage() {
  const { portfolio, deletePortfolio } = useData();
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this portfolio project?")) {
      setDeletingId(id);
      setError(null);
      setIsDeleting(true);
      
      try {
        await deletePortfolio(id);
        console.log("Delete successful");
      } catch (err) {
        console.error("Delete failed:", err);
        setError(err.message || "Failed to delete portfolio item. Please try again.");
      } finally {
        setDeletingId(null);
        setIsDeleting(false);
      }
    }
  };

  if (error) {
    return (
      <div className="text-red-400 text-center py-8 bg-red-500/10 rounded-xl border border-red-500/20">
        <p className="mb-4">Error: {error}</p>
        <button 
          onClick={() => setError(null)}
          className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-all"
        >
          Dismiss
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">
            Portfolio Management
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Manage all your portfolio projects
          </p>
        </div>
        <Link
          to="/portfolio/new"
          className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-linear-to-r from-cyan-500 to-teal-500 text-white font-medium shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] transition-all text-sm sm:text-base"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          Add Portfolio
        </Link>
      </div>

      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-3">
        {portfolio.length === 0 ? (
          <div className="text-center py-16 px-6 bg-slate-900/40 rounded-2xl border border-slate-700/50">
            <Briefcase className="w-16 h-16 mx-auto mb-4 text-slate-600" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No portfolio projects yet
            </h3>
            <p className="text-slate-400 mb-6">
              Showcase your work by adding your first project
            </p>
            <Link
              to="/portfolio/new"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-cyan-500 to-teal-500 text-white font-medium shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] transition-all"
            >
              <Plus className="w-5 h-5" />
              Add First Project
            </Link>
          </div>
        ) : (
          portfolio.map((project) => (
            <div
              key={project._id}
              className="bg-slate-900/40 border border-slate-700/50 rounded-xl p-4 hover:border-cyan-500/50 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 mr-3">
                  <h3 className="text-white font-semibold text-base wrap-break-words line-clamp-2">
                    {project.title}
                  </h3>
                  <div className="mt-2">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-teal-500/20 text-teal-400 text-xs font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Link
                    to={`/portfolio/edit/${project._id}`}
                    className="p-2 rounded-lg text-cyan-400 hover:bg-cyan-500/10 transition-all"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(project._id)}
                    disabled={deletingId === project._id || isDeleting}
                    className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Delete"
                  >
                    {deletingId === project._id ? (
                      <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-xs text-slate-400 pt-2 border-t border-slate-700/30">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <div className="backdrop-blur-xl bg-slate-900/40 border border-slate-700/50 rounded-2xl overflow-hidden">
          {portfolio.length === 0 ? (
            <div className="text-center py-16 px-6">
              <Briefcase className="w-16 h-16 mx-auto mb-4 text-slate-600" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No portfolio projects yet
              </h3>
              <p className="text-slate-400 mb-6">
                Showcase your work by adding your first project
              </p>
              <Link
                to="/portfolio/new"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-cyan-500 to-teal-500 text-white font-medium shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] transition-all"
              >
                <Plus className="w-5 h-5" />
                Add First Project
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-150">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                      Project Title
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                      Date
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.map((project) => (
                    <tr
                      key={project._id}
                      className="border-b border-slate-700/30 hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-white font-medium max-w-75">
                        <div className="truncate" title={project.title}>
                          {project.title}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-lg bg-teal-500/20 text-teal-400 text-sm whitespace-nowrap">
                          {project.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/portfolio/edit/${project._id}`}
                            className="p-2 rounded-lg text-cyan-400 hover:bg-cyan-500/10 transition-all"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(project._id)}
                            disabled={deletingId === project._id || isDeleting}
                            className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete"
                          >
                            {deletingId === project._id ? (
                              <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
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