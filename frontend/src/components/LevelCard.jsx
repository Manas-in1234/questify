import { Trophy } from "lucide-react";

export default function LevelCard({ xp }) {
  const level = Math.floor(xp / 100) + 1;

  const currentLevelXP = (level - 1) * 100;
  const nextLevelXP = level * 100;

  const progress = ((xp - currentLevelXP) / 100) * 100;

  const ranks = [
    "Beginner",
    "Explorer",
    "Warrior",
    "Champion",
    "Master",
    "Legend",
    "Mythic",
  ];

  const rank =
    ranks[Math.min(level - 1, ranks.length - 1)];

  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
      <div className="flex items-center gap-3">
        <Trophy className="text-indigo-400" size={28} />
        <h2 className="text-xl font-semibold">Current Rank</h2>
      </div>

      <p className="text-4xl font-bold mt-4">
        🛡️ {rank}
      </p>

      <p className="text-slate-400 mt-2">
        Level {level}
      </p>

      <div className="w-full bg-slate-700 rounded-full h-3 mt-5">
        <div
          className="bg-indigo-500 h-3 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="text-sm text-slate-400 mt-2">
        {xp}/{nextLevelXP} XP
      </p>
    </div>
  );
}