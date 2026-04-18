import { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      console.log("Attempting login at:", `${apiUrl}/api/auth/login`);

      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        alert(data.message || "Access Denied: Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("System Error: Could not connect to the server. Please check your internet or try again later.");
    } finally {
      setIsLoading(false);
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
              Welcome <span className="text-cyan-400">Back</span>
            </h2>
            <p className="text-gray-500 mt-2 font-medium">Continue your evolution</p>
          </header>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 ml-4">Email Address</label>
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 ml-4">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={isLoading}
              className={`w-full py-5 bg-cyan-400 text-black font-black uppercase tracking-widest rounded-2xl mt-4 hover:bg-white transition-all transform active:scale-95 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? "Authenticating..." : "Initialize Access"}
            </button>

            <p className="text-center text-gray-500 text-sm mt-8">
              New to the platform? <Link to="/signup" className="text-cyan-400 font-bold hover:underline">Register</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
