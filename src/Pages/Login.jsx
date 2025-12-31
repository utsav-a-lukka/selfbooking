import { useState } from "react";
import { User, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Apiservice } from "../services/Apiservice";

const Login = () => {
  const [role, setRole] = useState("user");
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  const handleInputchange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        setErrors({
            ...errors,
            [e.target.name]: ""
        })
  }
  const validate = () => {
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async() => {
    if (!validate()) return;
    try {
      const res = await Apiservice.post("user/login", { ...form, role });
      console.log(res)
      localStorage.setItem("authData",JSON.stringify(res.data))
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow p-6 text-center">

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="bg-orange-500 p-3 rounded-xl text-white font-bold">
            LOGO
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-900">
          {role === "user" ? "User Login" : "Admin Login"}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Please sign in to continue
        </p>

        {/* Tabs */}
        <div className="mt-5 bg-gray-100 rounded-full p-1 flex">
          <button
            onClick={() => setRole("user")}
            className={`w-1/2 py-2 rounded-full flex items-center justify-center gap-2 text-sm font-medium transition
              ${role === "user" ? "bg-white shadow text-gray-900" : "text-gray-400"}`}
          >
            <User size={16} /> User
          </button>

          <button
            onClick={() => setRole("admin")}
            className={`w-1/2 py-2 rounded-full flex items-center justify-center gap-2 text-sm font-medium transition
              ${role === "admin" ? "bg-white shadow text-gray-900" : "text-gray-400"}`}
          >
            <ShieldCheck size={16} /> Admin
          </button>
        </div>

        {/* Form (Static) */}
        <div className="mt-6 text-left space-y-4">

          <div>
            <label className="text-xs text-gray-600 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleInputchange}
              placeholder="you@example.com"
              className="w-full mt-1 px-4 py-3 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}

          <div>
            <label className="text-xs text-gray-600 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleInputchange}
              placeholder="••••••••"
              className="w-full mt-1 px-4 py-3 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}

          <button onClick={handleLogin} className="w-full bg-orange-500 text-white py-3 rounded-full text-sm font-semibold hover:bg-orange-600 transition">
            {role === "admin" ? "Login as Admin" : "Login"}
          </button>
        </div>

        {/* Footer */}
        {role === "user" && (
          <p className="mt-4 text-xs text-gray-500">
            Don’t have an account?{" "}
            <button onClick={() => navigate('/register')} className="text-orange-500 cursor-pointer hover:underline">
              Sign Up
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
export default Login
