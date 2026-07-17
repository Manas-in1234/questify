import { Star } from "lucide-react";

export default function XPCard() {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
      <div className="flex items-center gap-3">
        <Star className="text-yellow-400" size={28} />
        <h2 className="text-xl font-semibold">XP Progress</h2>
      </div>

      <p className="text-4xl font-bold mt-4">420 / 500</p>

      <div className="w-full h-3 bg-slate-700 rounded-full mt-4">
        <div
          className="h-3 bg-indigo-500 rounded-full"
          style={{ width: "84%" }}
        ></div>
      </div>

      <p className="text-slate-400 mt-3">80 XP to reach Level 5</p>
    </div>
  );
}