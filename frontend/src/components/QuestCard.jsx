import { CheckCircle2, Trash2 } from "lucide-react";

export default function QuestCard({
  title,
  xp,
  completed,
  onToggle,
  onDelete,
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between hover:border-indigo-500 transition">
      <div className="flex items-center gap-4">
        <CheckCircle2
          size={28}
          className={completed ? "text-green-500" : "text-slate-500"}
        />

        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-slate-400">Reward: +{xp} XP</p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onToggle}
          className={`px-4 py-2 rounded-lg ${
            completed
              ? "bg-green-600 hover:bg-green-700"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {completed ? "Completed" : "Complete"}
        </button>

        <button
          onClick={onDelete}
          className="bg-red-600 hover:bg-red-700 p-3 rounded-lg"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}