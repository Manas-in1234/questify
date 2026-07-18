import { Star } from "lucide-react";

export default function XPCard({ xp }) {
  const level = Math.floor(xp / 100) + 1;

  const currentLevelXP = (level - 1) * 100;
  const nextLevelXP = level * 100;

  const currentXP = xp - currentLevelXP;

  const percentage = (currentXP / 100) * 100;

  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
      <div className="flex items-center gap-3">
        <Star className="text-yellow-400" size={28} />
        <h2 className="text-xl font-semibold">XP Progress</h2>
      </div>

      <p className="text-4xl font-bold mt-4">
        {currentXP} / 100
      </p>

      <div className="w-full h-3 bg-slate-700 rounded-full mt-4">
        <div
          className="h-3 bg-indigo-500 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="text-slate-400 mt-3">
        {nextLevelXP - xp} XP to Level {level + 1}
      </p>
    </div>
  );
}