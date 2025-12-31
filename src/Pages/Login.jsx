import { useState } from "react";
import { User, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [activeTab, setActiveTab] = useState("user");
  const navigate = useNavigate()

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
          {activeTab === "user" ? "User Login" : "Admin Login"}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Please sign in to continue
        </p>

        {/* Tabs */}
        <div className="mt-5 bg-gray-100 rounded-full p-1 flex">
          <button
            onClick={() => setActiveTab("user")}
            className={`w-1/2 py-2 rounded-full flex items-center justify-center gap-2 text-sm font-medium transition
              ${activeTab === "user" ? "bg-white shadow text-gray-900" : "text-gray-400"}`}
          >
            <User size={16} /> User
          </button>

          <button
            onClick={() => setActiveTab("admin")}
            className={`w-1/2 py-2 rounded-full flex items-center justify-center gap-2 text-sm font-medium transition
              ${activeTab === "admin" ? "bg-white shadow text-gray-900" : "text-gray-400"}`}
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
              placeholder="you@example.com"
              className="w-full mt-1 px-4 py-3 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="text-xs text-gray-600 font-medium">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full mt-1 px-4 py-3 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button className="w-full bg-orange-500 text-white py-3 rounded-full text-sm font-semibold hover:bg-orange-600 transition">
            {activeTab === "admin" ? "Login as Admin" : "Login"}
          </button>
        </div>

        {/* Footer */}
        {activeTab === "user" && (
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
