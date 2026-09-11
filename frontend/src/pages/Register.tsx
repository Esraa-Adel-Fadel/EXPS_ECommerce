import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import spacejoy from "../assets/images/spacejoy-IH7wPsjwomc-unsplash.jpg";

export const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
        setError("Please fill in all required fields.");
        return;
      }
    if (password !== confirmPassword) {
        setError("Passwords do not match. Please check and try again.");
        return;
      }
    setIsSubmitting(true);

    try {
      await register({ name, email, password ,confirmPassword });
      navigate("/login");
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
          setError("Registration failed. Please check your data and try again.");
        }
      } finally {
        setIsSubmitting(false);
      }
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col lg:flex-row bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full lg:w-[45%] flex items-center justify-center p-8">
        <div className="w-full max-w-[550px] space-y-8 bg-white p-8 shadow-sm border border-gray-100">
            <div>
            <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
                Create an Account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
                Sign up to start shopping with us
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
                    Full Name
                </label>
                <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                </label>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                </label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                </label>
                <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2.5 px-4 rounded-lg text-sm font-medium text-white bg-[#df5612] hover:bg-[#c94d0f] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                >
                {isSubmitting ? "Creating account..." : "Sign Up"}
            </button>

                {/* Link with matching text color */}
                <div className="text-center text-sm">
                <span className="text-gray-600">Already have an account? </span>
                <Link
                    to="/login"
                    className="font-medium text-[#df5612] hover:text-[#df56128c] transition-colors"
                >
                    Sign in
                </Link>
                </div>
            </form>
        </div>
        </div>
        <div className="w-full lg:w-[55%] flex items-center justify-center p-4">
            <img src={spacejoy} alt="Spacejoy" className="w-full h-[650px] object-cover" />
        </div>
    </div>
  );
};