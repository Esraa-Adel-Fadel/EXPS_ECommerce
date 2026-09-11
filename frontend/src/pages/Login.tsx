import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            setError(null);

            if (!email.trim() || !password.trim()) {
            setError("Please fill in all required fields.");
            return;
            }
            setIsSubmitting(true);
            try {
            await login({ email, password });
            navigate("/");
            } catch (err: any) {
                const data = err.response?.data;
                if (data?.errors && typeof data.errors === "object" && !Array.isArray(data.errors)) {
                    const allErrors = Object.values(data.errors)
                      .flat()
                      .join(" | ");
                    setError(allErrors);
                  } 
                  else if (Array.isArray(data?.errors)) {
                    const messages = data.errors.map((e: any) => e.msg || e.message || e).join(" | ");
                    setError(messages);
                  } 
                  else if (typeof data?.message === "string") {
                    setError(data.message);
                  } 
                  else {
                    setError("Invalid email or password. Please try again.");
                  }
                } finally {
                  setIsSubmitting(false);
                }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please sign in to your account
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded text-sm text-red-700">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#df5612] focus:border-[#df5612]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#df5612] focus:border-[#df5612]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#df5612] hover:bg-[#c94d0f] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>

          <div className="text-center text-sm">
            <span className="text-gray-600">Don't have an account? </span>
            <Link
              to="/register"
              className="font-medium text-[#df5612] hover:text-[#c94d0f] transition-colors"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};