import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem("token", res.data.token);
      alert("Login Successful");
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "Login failed";
      alert(message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl p-8 shadow-2xl">
        <h1 className="text-4xl font-black text-white mb-2">Welcome Back</h1>

        <p className="text-slate-400 mb-8">Login to continue your career journey.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none"
            required
          />

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold hover:scale-[1.02] transition-all duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-slate-400 mt-5">
          Don't have an account?{' '}
          <Link to="/register" className="text-cyan-300 hover:text-cyan-100">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
