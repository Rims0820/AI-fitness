import Navbar from "../components/Navbar";
import WorkoutCard from "../components/WorkoutCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaRunning } from "react-icons/fa";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/workouts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setWorkouts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0c] pt-24 pb-12 px-6">
      <Navbar />

      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-cyan-400 font-bold uppercase tracking-[0.3em] text-xs">Training Log</span>
            <h1 className="text-5xl font-black text-white italic tracking-tighter mt-2">
              MY <span className="text-cyan-400">PROGRESS</span>
            </h1>
          </div>

          <Link
            to="/add-workout"
            className="flex items-center justify-center gap-2 bg-white text-black font-black uppercase tracking-widest px-6 py-3 rounded-full hover:bg-cyan-400 transition-colors"
          >
            <FaPlus /> Log Workout
          </Link>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-cyan-400" />
          </div>
        ) : workouts.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 border-dashed">
            <FaRunning className="text-6xl text-gray-700 mx-auto mb-6" />
            <h3 className="text-xl font-bold text-gray-400 uppercase italic">No activity recorded yet</h3>
            <p className="text-gray-600 mt-2 mb-8">Ready to crush your first session?</p>
            <Link to="/add-workout" className="text-cyan-400 font-bold hover:underline uppercase tracking-widest text-sm">
              Add your first workout
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workouts.map((w, index) => (
              <motion.div
                key={w._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <WorkoutCard workout={w} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
