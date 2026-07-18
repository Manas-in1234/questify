import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import XPCard from "../components/XPCard";
import StreakCard from "../components/StreakCard";
import LevelCard from "../components/LevelCard";
import QuestCard from "../components/QuestCard";

export default function Dashboard() {
const defaultQuests = [
  {
    id: 1,
    title: "Learn React",
    xp: 50,
    completed: true,
    rewardClaimed: true,
  },
  {
    id: 2,
    title: "Build Backend",
    xp: 80,
    completed: false,
    rewardClaimed: false,
  },
  {
    id: 3,
    title: "Workout",
    xp: 20,
    completed: true,
    rewardClaimed: true,
  },
];

const [quests, setQuests] = useState(() => {
  const savedQuests = localStorage.getItem("quests");

  return savedQuests
    ? JSON.parse(savedQuests)
    : defaultQuests;
});

  const [title, setTitle] = useState("");
  const [xp, setXp] = useState("");

  // Toggle completion status
const toggleQuest = (id) => {
  setQuests((prev) =>
    prev.map((quest) => {
      if (quest.id !== id) return quest;

      // Award XP only once
      if (!quest.rewardClaimed) {
        setUserXP((prevXP) => prevXP + quest.xp);
      }

      return {
        ...quest,
        completed: !quest.completed,
        rewardClaimed: true,
      };
    })
  );
};
  // Delete a quest
  const deleteQuest = (id) => {
    setQuests((prev) => prev.filter((quest) => quest.id !== id));
  };

  // Add a new quest
  const addQuest = () => {
    if (!title.trim() || !xp) return;
const newQuest = {
  id: Date.now(),
  title: title.trim(),
  xp: Number(xp),
  completed: false,
  rewardClaimed: false,
};

    setQuests((prev) => [...prev, newQuest]);

    setTitle("");
    setXp("");
  };

  // Calculate total XP
const [userXP, setUserXP] = useState(() => {
  const savedXP = localStorage.getItem("userXP");
  return savedXP ? Number(savedXP) : 0;
});
useEffect(() => {
  localStorage.setItem("quests", JSON.stringify(quests));
}, [quests]);
useEffect(() => {
  localStorage.setItem("userXP", userXP);
}, [userXP]);
  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <XPCard xp={userXP} maxXP={500} />
        <StreakCard />
        <LevelCard />
      </div>

      {/* Add Quest */}
      <h2 className="text-2xl font-bold mb-4">Add New Quest</h2>

      <div className="bg-slate-900 p-6 rounded-2xl mb-8 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Quest Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 bg-slate-800 text-white px-4 py-3 rounded-lg outline-none"
        />

        <input
          type="number"
          placeholder="XP"
          value={xp}
          onChange={(e) => setXp(e.target.value)}
          className="w-28 bg-slate-800 text-white px-4 py-3 rounded-lg outline-none"
        />

        <button
          onClick={addQuest}
          className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-semibold transition"
        >
          + Add Quest
        </button>
      </div>
        
      {/* Quest List */}
      <h2 className="text-2xl font-bold mb-5">Today's Quests</h2>

      {quests.length === 0 ? (
        <div className="bg-slate-900 rounded-xl p-8 text-center text-slate-400">
          No quests yet. Add your first quest!
        </div>
      ) : (
        <div className="space-y-4">
          {quests.map((quest) => (
            <QuestCard
              key={quest.id}
              title={quest.title}
              xp={quest.xp}
              completed={quest.completed}
              onToggle={() => toggleQuest(quest.id)}
              onDelete={() => deleteQuest(quest.id)}
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}