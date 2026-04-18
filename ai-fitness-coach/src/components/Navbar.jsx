import { Link, useNavigate } from "react-router-dom";
import { FaDumbbell, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10 px-6 py-4 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2 group">
        <FaDumbbell className="text-cyan-400 text-3xl group-hover:rotate-12 transition-transform" />
        <h1 className="text-2xl font-black tracking-tighter text-white italic">
          FIT<span className="text-cyan-400">AI</span>
        </h1>
      </Link>

      <div className="flex items-center gap-8">
        <div className="hidden md:flex space-x-8 text-sm font-bold uppercase tracking-widest text-gray-400">
          <Link to="/dashboard" className="hover:text-cyan-400 transition-colors">Dashboard</Link>
          <Link to="/chat" className="hover:text-cyan-400 transition-colors">AI Coach</Link>
        </div>

        {token ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors text-sm font-bold uppercase tracking-widest"
          >
            <FaSignOutAlt />
            <span className="hidden sm:inline">Logout</span>
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-cyan-400 text-black px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors"
          >
            Join Now
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;