import { FaFire, FaRedo, FaWeightHanging } from "react-icons/fa";

const WorkoutCard = ({ workout }) => {
  const getDifficultyColor = (d) => {
    switch (d?.toLowerCase()) {
      case 'hard': return 'text-red-400 border-red-400/20 bg-red-400/5';
      case 'medium': return 'text-orange-400 border-orange-400/20 bg-orange-400/5';
      default: return 'text-cyan-400 border-cyan-400/20 bg-cyan-400/5';
    }
  };

  return (
    <div className="glass-card p-6 rounded-3xl hover:scale-[1.02] transition-all group">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">
          {workout.name}
        </h3>
        <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${getDifficultyColor(workout.difficulty)}`}>
          {workout.difficulty || 'Easy'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-3">
          <FaRedo className="text-cyan-400" />
          <div>
            <p className="text-[10px] text-gray-500 uppercase font-bold">Reps</p>
            <p className="text-xl font-black italic text-white">{workout.reps}</p>
          </div>
        </div>
        <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-3">
          <FaFire className="text-cyan-400" />
          <div>
            <p className="text-[10px] text-gray-500 uppercase font-bold">Sets</p>
            <p className="text-xl font-black italic text-white">{workout.sets}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 text-[10px] text-gray-600 uppercase font-black tracking-widest">
        <FaWeightHanging /> Intensity Tracked
      </div>
    </div>
  );
};

export default WorkoutCard;