import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/auth/AuthLayout.jsx";
import SocialLogin from "../components/auth/SocialLogin";
import API from "../lib/api";
import toast from "react-hot-toast";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

/* ================= INPUT ================= */
const FormInput = ({ label, type = "text", value, onChange, placeholder }) => (
  <div className="mb-3">
    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
      {label}
    </label>

    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoComplete="off"
      required
      className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none dark:bg-slate-900 dark:border-gray-700 dark:text-white"
    />
  </div>
);

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /* ================= LOGOUT ALERT ================= */
  useEffect(() => {
    if (location.state?.logoutSuccess) {
      setShowLogoutAlert(true);
      window.history.replaceState({}, document.title);

      const timer = setTimeout(() => setShowLogoutAlert(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  /* ================= LOGIN ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Enter email and password");
      return;
    }

    if (loading) return;

    try {
<<<<<<< HEAD
      setLoading(true);

      console.log("📤 Login Request:", { email, password });

      const response = await API.post("/api/auth/login", {
        email: email.trim(),
        password: password.trim(),
=======
      const validationResult = loginSchema.parse({ email, password });
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
        email: validationResult.email,
        password: validationResult.password
>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9
      });

      console.log("✅ Login Response:", response.data);

      const data = response.data;

      // ✅ FIXED CHECK (important)
      if (!data?.success || !data?.token) {
        toast.error(data?.message || "Login failed");
        return;
      }

      // save token
      localStorage.setItem("token", data.token);

      // save user in context
      login(data);

      toast.success("Login successful!");

      // redirect
      navigate("/dashboard");
    } catch (err) {
<<<<<<< HEAD
      console.log("❌ Login Error:", err.response?.data);

      toast.error(err.response?.data?.message || "Invalid email or password");

    } finally {
      setLoading(false);
=======
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0].message);
      } else {
        toast.error(err.response?.data?.message || "Invalid Credentials!");
      }
>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9
    }
  };

  return (
    <AuthLayout
      title="Welcome Back!"
<<<<<<< HEAD
      subtitle="Access your AI Learning Journey"
    >
      {/* ALERT */}
=======
      subtitle="Access your AI Learning Journey."
    >
>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9
      {showLogoutAlert && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100]">
          <div className="bg-teal-500 text-white px-6 py-2 rounded-xl shadow-lg">
            Logged out successfully
          </div>
        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-4">
<<<<<<< HEAD
=======
        <FormInput
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />


        <div className="mb-3">
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none dark:bg-slate-900 dark:border-gray-700 dark:text-white"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9

        <FormInput
          label="Email Address"
          type="email"
          value={email}
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormInput
          label="Password"
          type="password"
          value={password}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* FORGOT PASSWORD */}
        <div className="flex justify-end">
          <Link
            to="/forgot-password"
<<<<<<< HEAD
            className="text-xs text-teal-600 hover:text-teal-500"
=======
            size="sm"
            className="text-xs font-semibold text-teal-600 hover:text-teal-500 transition-colors"
>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9
          >
            Forgot Password?
          </Link>
        </div>

<<<<<<< HEAD
        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-teal-400 text-white font-bold disabled:opacity-50"
        >
          {loading ? "Logging in..." : "LOGIN"}
=======
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-teal-400 text-white font-black shadow-lg hover:scale-[1.02] transition-all"
        >
          LOG IN
>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9
        </button>
      </form>

      <SocialLogin />
<<<<<<< HEAD

      <p className="text-center mt-6 text-sm">
        New here?{" "}
        <Link to="/signup" className="text-teal-500 font-semibold">
=======
      <p className="text-center mt-6 text-sm text-muted">
        New here?{" "}
        <Link to="/signup" className="font-bold text-teal-500 hover:underline">
>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9
          Create Account
        </Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;