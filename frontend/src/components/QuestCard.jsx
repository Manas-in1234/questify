import { CheckCircle2, Pencil, Trash2 } from "lucide-react";

export default function QuestCard({
  title,
  xp,
  category,
  completed,
  onToggle,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-slate-900 p-5 rounded-2xl flex justify-between items-center border border-slate-800">

      <div>
        <h3
          className={`text-lg font-semibold ${
            completed ? "line-through text-gray-400" : ""
          }`}
        >
          {title}
        </h3>

<div className="flex items-center gap-3 mt-1">
  <p className="text-gray-400">{xp} XP</p>

  <span className="bg-indigo-600 text-xs px-2 py-1 rounded-full">
    {category}
  </span>
</div>
      </div>

      <div className="flex gap-3">

        <button
          onClick={onToggle}
          disabled={completed}
          className={`px-4 py-2 rounded-lg ${
            completed
              ? "bg-green-600 cursor-not-allowed opacity-70"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {completed ? "Completed" : "Complete"}
        </button>

        <button
          onClick={onEdit}
          className="bg-yellow-500 hover:bg-yellow-600 p-2 rounded-lg"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={onDelete}
          className="bg-red-600 hover:bg-red-700 p-2 rounded-lg"
        >
          <Trash2 size={18} />
        </button>

      </div>
    </div>
  );
}