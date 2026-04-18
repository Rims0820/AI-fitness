import { useState } from "react";
import Navbar from "../components/Navbar";
import { FaChevronLeft, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AddWorkout = () => {
  const [name, setName] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");

  const handleAddWorkout = async () => {
    if (!name || !reps || !sets) return alert("Fill all fields");

    const token = localStorage.getItem("token");
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/workouts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        reps: parseInt(reps),
        sets: parseInt(sets),
        difficulty,
      }),
    });

    if (res.ok) {
      window.location.href = "/dashboard";
    } else {
      alert("Record entry failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] pt-24 pb-12 px-6">
      <Navbar />

      <div className="max-w-xl mx-auto">
        <Link to="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8 uppercase text-[10px] font-black tracking-widest">
          <FaChevronLeft /> Back to Log
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 p-10 rounded-[40px] shadow-2xl backdrop-blur-xl"
        >
          <header className="mb-10">
            <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">
              LOG <span className="text-cyan-400">SESSION</span>
            </h2>
            <p className="text-gray-500 mt-2 font-medium">Record your physical output</p>
          </header>

          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 ml-4">Exercise Name</label>
              <input
                className="w-full px-6 py-4 rounded-2xl"
                placeholder="e.g. Bench Press"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 ml-4">Repetitions</label>
                <input
                  type="number"
                  className="w-full px-6 py-4 rounded-2xl"
                  placeholder="0"
                  onChange={(e) => setReps(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 ml-4">Total Sets</label>
                <input
                  type="number"
                  className="w-full px-6 py-4 rounded-2xl"
                  placeholder="0"
                  onChange={(e) => setSets(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 ml-4">Intensity Level</label>
              <select
                className="w-full px-6 py-4 rounded-2xl appearance-none cursor-pointer"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="Easy">Recovery (Easy)</option>
                <option value="Medium">Maintain (Medium)</option>
                <option value="Hard">Overload (Hard)</option>
              </select>
            </div>

            <button
              onClick={handleAddWorkout}
              className="w-full py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl mt-4 hover:bg-cyan-400 transition-all transform active:scale-95 flex items-center justify-center gap-3"
            >
              <FaPlus /> Record Data
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddWorkout;