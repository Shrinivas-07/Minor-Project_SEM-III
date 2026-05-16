import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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
      await axios.post("http://localhost:5000/api/auth/register", formData);
      alert("Registration successful. Please log in.");
      navigate("/");
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "Registration failed";
      alert(message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl p-8 shadow-2xl">
        <h1 className="text-4xl font-black text-white mb-2">Create Account</h1>

        <p className="text-slate-400 mb-8">Register and start your career journey.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none"
            required
          />

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
            Register
          </button>
        </form>

        <p className="text-center text-slate-400 mt-5">
          Already have an account?{' '}
          <Link to="/" className="text-cyan-300 hover:text-cyan-100">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
