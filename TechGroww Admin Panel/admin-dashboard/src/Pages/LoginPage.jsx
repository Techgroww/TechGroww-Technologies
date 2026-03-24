import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Lock, Mail } from "lucide-react";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    const success = await login(email, password);

    if (success) {

      navigate("/dashboard");

    } else {

      setError("Invalid email or password");

    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">

      <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-blue-950 to-slate-900"></div>

      <div className="relative z-10 w-full max-w-md mx-4">

        <div className="backdrop-blur-xl bg-slate-900/40 border border-slate-700/50 rounded-2xl shadow-2xl p-8">

          <div className="text-center mb-8">

            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-cyan-500 to-teal-500 mb-4">

              <span className="text-2xl font-bold text-white">
                TG
              </span>

            </div>

            <h1 className="text-3xl font-bold text-white">
              TechGroww
            </h1>

            <p className="text-slate-400">
              Admin Login
            </p>

          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>

              <label className="block text-sm text-slate-300 mb-2">
                Email
              </label>

              <div className="relative">

                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />

                <input
                  type="email"
                  required
                  placeholder="admin@techgroww.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white"
                />

              </div>

            </div>

            <div>

              <label className="block text-sm text-slate-300 mb-2">
                Password
              </label>

              <div className="relative">

                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />

                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white"
                />

              </div>

            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-linear-to-r from-cyan-500 to-teal-500 text-white font-medium"
            >
              Login
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}