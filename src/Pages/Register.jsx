import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { Apiservice } from "../services/Apiservice";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    // Validation method to check the form validations
    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = "Full name is required";
        } else if (formData.name.length <= 3) {
            newErrors.name = "Minimum 3 characters required";
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }
        if (!formData.phone.trim()) {
            newErrors.phone = "Mobile number is required";
        } else if (!/^[0-9]{10}$/.test(formData.phone)) {
            newErrors.phone = "Enter 10 digit number";
        }
        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Minimum 6 characters required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        const res = await Apiservice.post("users/add", { ...formData, role: "user" });
        setFormData({
            name: "",
            email: "",
            phone: "",
            password: ""
        })
        setErrors({})
        navigate('/login')
    }

    const handleInputchange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        setErrors({
            ...errors,
            [e.target.name]: ""
        })
    }

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
                <form className="mt-6 space-y-4" >

                    {/* Full Name */}
                    <div>
                        <label className="text-sm font-medium text-gray-600">
                            Full Name
                        </label>
                        <div className="relative mt-1">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputchange}
                                placeholder="John Doe"
                                className="w-full pl-4 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </div>
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}

                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <div className="relative mt-1">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputchange}
                                placeholder="you@example.com"
                                className="w-full pl-4 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}

                    </div>

                    {/* Mobile */}
                    <div>
                        <label className="text-sm font-medium text-gray-600">
                            Mobile Number
                        </label>
                        <div className="relative mt-1">
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputchange}
                                placeholder="9876543210"
                                className="w-full pl-4 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </div>
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}

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
                                name="password"
                                onChange={handleInputchange}
                                value={formData.password}
                                className="w-full pl-4 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}

                    </div>

                    {/* Button */}
                    <button
                        type="button"
                        className="w-full py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
                        onClick={handleSubmit}
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
