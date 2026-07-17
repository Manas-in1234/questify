import { Flame } from "lucide-react";

export default function StreakCard() {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
      <div className="flex items-center gap-3">
        <Flame className="text-orange-500" size={28} />
        <h2 className="text-xl font-semibold">Current Streak</h2>
      </div>

      <p className="text-4xl font-bold mt-4">7 Days 🔥</p>

      <p className="text-slate-400 mt-3">
        Keep completing quests every day!
      </p>
    </div>
  );
}