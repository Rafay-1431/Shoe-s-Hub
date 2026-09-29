import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import { supabase } from "../lib/supabase";
import { Mail, Lock, User, ArrowRight, Loader2, AlertCircle, CheckCircle } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from || "/";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      if (data.session) {
        // Auto-login configuration
        navigate(fromPage, { replace: true });
      } else {
        // Email confirmation flow
        setSuccessMsg("Account created! Please check your email to confirm your signup.");
      }
    } catch (err) {
      setErrorMsg(err.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col justify-center items-center px-6 py-12 transition-colors duration-300">
      <div className="w-full max-w-md space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 tracking-widest uppercase">
            NEW MEMBER
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white uppercase tracking-tight">
            Create Account
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Join us to get exclusive access and seamless checkouts
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-3">
            <CheckCircle className="w-5 h-5 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-xs font-mono text-gray-500 dark:text-gray-400 uppercase mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-400 text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-gray-500 dark:text-gray-400 uppercase mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-400 text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-gray-500 dark:text-gray-400 uppercase mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-400 text-sm transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/30 active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>Register Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Login Redirect Link */}
        <div className="text-center pt-4 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            state={{ from: fromPage }}
            className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline ml-1"
          >
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}