import { useData } from "../context/DataContext";
import { FileText, Briefcase, Users, Mail, Plus, Clock } from "lucide-react";
import { Link } from "react-router-dom";

function StatsCard({ icon: Icon, label, value, color }) {
  return (
    <div className="backdrop-blur-xl bg-slate-900/40 border border-slate-700/50 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/10">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${color} flex items-center justify-center shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>

      <p className="text-slate-400 text-sm mb-1">{label}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}

function LeadCard({ lead }) {
  return (
    <div className="backdrop-blur-xl bg-slate-800/30 border border-slate-700/30 rounded-xl p-4 hover:bg-slate-800/50 transition-all">
      <h4 className="text-white font-medium mb-1">{lead.name}</h4>
      <p className="text-cyan-400 text-sm mb-2">{lead.email}</p>
      <p className="text-slate-300 text-sm mb-2">{lead.subject}</p>
      <p className="text-slate-500 text-xs">{lead.date}</p>
    </div>
  );
}

function BlogCard({ blog }) {
  return (
    <div className="backdrop-blur-xl bg-slate-800/30 border border-slate-700/30 rounded-xl p-4 hover:bg-slate-800/50 transition-all">
      <h4 className="text-white font-medium mb-2">{blog.title}</h4>

      <div className="flex items-center gap-3 text-sm">
        <span className="px-2 py-1 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs">
          {blog.category}
        </span>

        <span className="text-slate-500 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {blog.createdDate}
        </span>
      </div>
    </div>
  );
}

export default function DashboardPage() {

  const { blogs, portfolio, jobs, leads } = useData();

  const recentLeads = leads.slice(0, 2);
  const recentBlogs = blogs.slice(-2).reverse();

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold text-white mb-2">
          Dashboard
        </h1>

        <p className="text-slate-400">
          Welcome to TechGroww Admin Panel
        </p>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatsCard
          icon={FileText}
          label="Total Blogs"
          value={blogs.length}
          color="from-cyan-500 to-blue-500"
        />

        <StatsCard
          icon={Briefcase}
          label="Portfolio Projects"
          value={portfolio.length}
          color="from-teal-500 to-emerald-500"
        />

        <StatsCard
          icon={Users}
          label="Jobs Posted"
          value={jobs.length}
          color="from-purple-500 to-pink-500"
        />

        <StatsCard
          icon={Mail}
          label="Total Leads"
          value={leads.length}
          color="from-orange-500 to-red-500"
        />

      </div>

      {/* Two column layout */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Recent Leads */}

        <div className="backdrop-blur-xl bg-slate-900/40 border border-slate-700/50 rounded-2xl p-6">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-2xl font-bold text-white">
              Recent Leads
            </h2>

            <Link
              to="/leads"
              className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors"
            >
              View All
            </Link>

          </div>

          <div className="space-y-4">

            {recentLeads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} />
            ))}

          </div>

        </div>

        {/* Recent Blogs */}

        <div className="backdrop-blur-xl bg-slate-900/40 border border-slate-700/50 rounded-2xl p-6">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-2xl font-bold text-white">
              Recent Blogs
            </h2>

            <Link
              to="/blogs"
              className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors"
            >
              View All
            </Link>

          </div>

          <div className="space-y-4">

            {recentBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}

          </div>

        </div>

      </div>

      {/* Quick Actions */}

      <div className="backdrop-blur-xl bg-slate-900/40 border border-slate-700/50 rounded-2xl p-6">

        <h2 className="text-2xl font-bold text-white mb-6">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <Link
            to="/blogs/new"
            className="flex items-center gap-3 px-6 py-4 rounded-xl bg-linear-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 text-cyan-400 hover:from-cyan-500/30 hover:to-teal-500/30 hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Add Blog</span>
          </Link>

          <Link
            to="/portfolio/new"
            className="flex items-center gap-3 px-6 py-4 rounded-xl bg-linear-to-r from-teal-500/20 to-emerald-500/20 border border-teal-500/30 text-teal-400 hover:from-teal-500/30 hover:to-emerald-500/30 hover:shadow-lg hover:shadow-teal-500/20 transition-all"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Add Portfolio</span>
          </Link>

          <Link
            to="/jobs/new"
            className="flex items-center gap-3 px-6 py-4 rounded-xl bg-linear-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-400 hover:from-purple-500/30 hover:to-pink-500/30 hover:shadow-lg hover:shadow-purple-500/20 transition-all"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Add Job</span>
          </Link>

        </div>

      </div>

    </div>
  );
}