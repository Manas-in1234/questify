export default function AchievementCard({
  title,
  unlocked,
}) {
  return (
    <div
      className={`p-5 rounded-xl border ${
        unlocked
          ? "bg-yellow-500/20 border-yellow-500"
          : "bg-slate-900 border-slate-800"
      }`}
    >
      <h3 className="text-lg font-bold">{title}</h3>

      <p className="mt-2 text-sm">
        {unlocked ? "✅ Unlocked" : "🔒 Locked"}
      </p>
    </div>
  );
}