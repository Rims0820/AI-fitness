import { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (data._id) {
        window.location.href = "/login";
      } else {
        alert(data.message || "Registration Failed");
      }
    } catch (error) {
      console.log(error);
      alert("System Error");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white/5 border border-white/10 p-10 rounded-[40px] shadow-2xl backdrop-blur-xl"
        >
          <header className="text-center mb-10">
            <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">
              Join the <span className="text-cyan-400">Elite</span>
            </h2>
            <p className="text-gray-500 mt-2 font-medium">Start your AI journey today</p>
          </header>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 ml-4">Full Name</label>
              <input
                type="text"
                className="w-full px-6 py-4 rounded-2xl"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 ml-4">Email Address</label>
              <input
                type="email"
                className="w-full px-6 py-4 rounded-2xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 ml-4">Secure Password</label>
              <input
                type="password"
                className="w-full px-6 py-4 rounded-2xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              onClick={handleSignup}
              className="w-full py-5 bg-cyan-400 text-black font-black uppercase tracking-widest rounded-2xl mt-4 hover:bg-white transition-all transform active:scale-95"
            >
              Create Account
            </button>

            <p className="text-center text-gray-500 text-sm mt-8">
              Already a member? <Link to="/login" className="text-cyan-400 font-bold hover:underline">Login</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;