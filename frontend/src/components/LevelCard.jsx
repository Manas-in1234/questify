import { Trophy } from "lucide-react";

export default function LevelCard() {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
      <div className="flex items-center gap-3">
        <Trophy className="text-indigo-400" size={28} />
        <h2 className="text-xl font-semibold">Current Rank</h2>
      </div>

      <p className="text-4xl font-bold mt-4">
        🛡️ Explorer
      </p>

      <p className="text-slate-400 mt-3">
        Level 4
      </p>
    </div>
  );
}