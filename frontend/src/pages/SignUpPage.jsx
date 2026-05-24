import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/auth/AuthLayout.jsx";
import SocialLogin from "../components/auth/SocialLogin";
import API from "../lib/api";
import toast from "react-hot-toast";
import { z } from "zod";

const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name too long"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name too long"),
  email: z.string().email("Please enter a valid email address"),
  username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username too long"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one symbol"),
});

const FormInput = ({ label, type = "text", value, onChange }) => (
  <div className="mb-3">
    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
      {label}
    </label>
    <input
      type={type}
      className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm dark:bg-slate-900 dark:border-gray-700 dark:text-white"
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const passwordValid =
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD

    if (loading) return;

    const fullName = `${firstName} ${lastName}`.trim();

    if (!fullName) {
      toast.error("Name is required");
      return;
    }

    if (!passwordValid) {
      toast.error("Password not strong enough");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/api/auth/register", {
        name: fullName,
        email: email.trim(),
        password: password.trim(),
=======
    try {
      const validationResult = signupSchema.parse({
        firstName,
        lastName,
        email,
        username,
        password,
      });

      setLoading(true);
      const response = await fetch(`/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: validationResult.firstName,
          lastName: validationResult.lastName,
          name: validationResult.username,
          email: validationResult.email,
          password: validationResult.password,
        }),
>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9
      });

      console.log("Signup response:", res.data);

      const userData = res.data?.user || res.data;

      login(userData);

      toast.success("Account created successfully!");

      navigate("/complete-profile");
<<<<<<< HEAD

    } catch (err) {
      console.log("Signup error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Signup failed");

=======
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error(error.message);
      }
>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Join Us Today!"
      subtitle="Create your account"
      rightHeader={
        <div className="flex items-center gap-2">
          <Sun size={16} />
          <input type="checkbox" checked={isDark} onChange={toggleTheme} />
          <Moon size={16} />
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-3">

        <div className="grid grid-cols-2 gap-3">
          <FormInput
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <FormInput
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <FormInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div>
          <label className="text-xs">Password</label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-3 py-2 border rounded-lg dark:bg-slate-900 dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>

      <SocialLogin />

      <p className="text-center text-sm mt-4">
        Already have account? <Link to="/login">Login</Link>
      </p>
    </AuthLayout>
  );
};

export default SignUpPage;