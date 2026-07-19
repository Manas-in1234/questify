import { Home, Target, Trophy, User, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-slate-900 p-6 border-r border-slate-800">
      <h1
        className="text-3xl font-bold text-indigo-400 mb-10 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        Questify
      </h1>

      <nav className="space-y-5">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-3 hover:text-indigo-400"
        >
          <Home size={22} />
          Dashboard
        </button>

        <button
          onClick={() => navigate("/goals")}
          className="flex items-center gap-3 hover:text-indigo-400"
        >
          <Target size={22} />
          Quests
        </button>

        <button className="flex items-center gap-3 hover:text-indigo-400">
          <Trophy size={22} />
          Badges
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-3 hover:text-indigo-400"
        >
          <User size={22} />
          Profile
        </button>

        <button className="flex items-center gap-3 hover:text-indigo-400">
          <Settings size={22} />
          Settings
        </button>
      </nav>
    </aside>
  );
}