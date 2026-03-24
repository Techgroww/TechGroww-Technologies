import { useData } from "../context/DataContext";
import { Trash2, Mail } from "lucide-react";

export default function LeadsPage() {
  const { leads, deleteLead } = useData();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      deleteLead(id);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">
          Leads Management
        </h1>
        <p className="text-slate-400">
          View and manage all your leads
        </p>
      </div>

      <div className="backdrop-blur-xl bg-slate-900/40 border border-slate-700/50 rounded-2xl overflow-hidden">
        {leads.length === 0 ? (
          <div className="text-center py-16 px-6">
            <Mail className="w-16 h-16 mx-auto mb-4 text-slate-600" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No leads yet
            </h3>
            <p className="text-slate-400">
              Leads from your website will appear here
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Subject
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Date
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">
                    Action
                  </th>
                 </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead._id}  // FIXED: .id to ._id
                    className="border-b border-slate-700/30 hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="px-6 py-4 text-white font-medium">
                      {lead.name}
                    </td>
                    <td className="px-6 py-4 text-cyan-400">
                      {lead.email}
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      {lead.subject}
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end">
                        <button
                          onClick={() => handleDelete(lead._id)}  // FIXED
                          className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
                          title="Delete Lead"
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
  );
}