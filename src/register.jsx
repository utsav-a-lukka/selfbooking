
import { useNavigate } from "react-router-dom"

const Register = () => {
const navigate = useNavigate()

  return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-white">
            <div className="w-full max-w-md rounded-2xl p-6 sm:p-8">

                {/* Logo */}
              <div className="flex justify-center mb-4">
                  <div className="bg-orange-500 p-3 rounded-xl text-white font-bold">
                      LOGO
                  </div>
              </div>

                {/* Heading */}
                <h1 className="text-3xl font-bold text-center text-gray-800">
                    Register
                </h1>
                <p className="text-center text-gray-500 mt-1">
                    Create an account to continue
                </p>

                {/* Form */}
                <form className="mt-6 space-y-4">

                    {/* Full Name */}
                    <div>
                        <label className="text-sm font-medium text-gray-600">
                            Full Name
                        </label>
                        <div className="relative mt-1">
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full pl-4 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <div className="relative mt-1">
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full pl-4 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </div>
                    </div>

                    {/* Mobile */}
                    <div>
                        <label className="text-sm font-medium text-gray-600">
                            Mobile Number
                        </label>
                        <div className="relative mt-1">
                            <input
                                type="tel"
                                placeholder="9876543210"
                                className="w-full pl-4 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <div className="relative mt-1">
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full pl-4 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </div>
                    </div>

                    {/* Button */}
                    <button
                        type="button"
                        className="w-full py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-gray-500 mt-6 text-sm">
                    You already have an account?{" "}
                    <button onClick={() => navigate('/login')} className="text-orange-500 font-medium cursor-pointer">
                        Sign in here
                    </button>
                </p>
            </div>
        </div>
    )
}
export default Register