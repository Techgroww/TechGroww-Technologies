import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, Briefcase, Users, Mail, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  const menuItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/blogs", icon: FileText, label: "Blogs" },
    { path: "/portfolio", icon: Briefcase, label: "Portfolio" },
    { path: "/jobs", icon: Users, label: "Jobs" },
    { path: "/leads", icon: Mail, label: "Leads" }
  ];

  return (
    <aside className="w-64 h-full bg-slate-900 border-r border-slate-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3 flex-col justify-center">
          <div className="w-14 h-14 shrink-0 rounded-full bg-linear-to-br from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <span className="text-white font-bold">TG</span>
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg leading-tight">TechGroww</h2>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 text-center">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 mt-2 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 border ${
                isActive
                  ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.05)]"
                  : "text-slate-400 border-transparent hover:text-white hover:bg-slate-800/50"
              }`
            }
          >
            <item.icon className="w-5 h-5 shrink-0" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/40">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;