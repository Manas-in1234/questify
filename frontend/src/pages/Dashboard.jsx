import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import XPCard from "../components/XPCard";
import StreakCard from "../components/StreakCard";
import LevelCard from "../components/LevelCard";
import QuestCard from "../components/QuestCard";
import AchievementCard from "../components/AchievementCard";
import AnalyticsChart from "../components/AnalyticsChart";
import CategoryChart from "../components/CategoryChart";

export default function Dashboard() {
const defaultQuests = [
  {
    id: 1,
    title: "Learn React",
    xp: 50,
    category: "Study",
    completed: true,
    rewardClaimed: true,
  },
  {
    id: 2,
    title: "Build Backend",
    xp: 80,
    category: "Work",
    completed: false,
    rewardClaimed: false,
  },
  {
    id: 3,
    title: "Workout",
    xp: 20,
    category: "Fitness",
    completed: true,
    rewardClaimed: true,
  },
];

const [dueDate, setDueDate] = useState("");
const [category, setCategory] = useState("Study");
const [search, setSearch] = useState("");
const [filterCategory, setFilterCategory] = useState("All");
const [filterStatus, setFilterStatus] = useState("All");
const [quests, setQuests] = useState(() => {
  const savedQuests = localStorage.getItem("quests");

  return savedQuests
    ? JSON.parse(savedQuests)
    : defaultQuests;
});

  const [title, setTitle] = useState("");
  const [xp, setXp] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuest, setEditingQuest] = useState(null);

  // Toggle completion status
const toggleQuest = (id) => {
  setQuests((prev) =>
    prev.map((quest) => {
      if (quest.id !== id) return quest;

      // Award XP only once
      if (!quest.rewardClaimed) {
        setUserXP((prevXP) => prevXP + quest.xp);
      }
      const today = new Date().toDateString();

if (lastCompletedDate !== today) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (lastCompletedDate === yesterday.toDateString()) {
    setStreak((prev) => prev + 1);
  } else {
    setStreak(1);
  }

  setLastCompletedDate(today);
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
const editQuest = (id) => {
  const quest = quests.find((q) => q.id === id);

  const newTitle = prompt("Edit Quest Title", quest.title);
  if (newTitle === null) return;

  const newXP = prompt("Edit XP", quest.xp);
  if (newXP === null) return;

  setQuests((prev) =>
    prev.map((q) =>
      q.id === id
        ? {
            ...q,
            title: newTitle,
            xp: Number(newXP),
          }
        : q
    )
  );
};

  // Add a new quest
  const addQuest = () => {
    if (!title.trim() || !xp) return;
const newQuest = {
  id: Date.now(),
  title: title.trim(),
  xp: Number(xp),
  category,
  dueDate,
  completed: false,
  rewardClaimed: false,
};


    setQuests((prev) => [...prev, newQuest]);

    setTitle("");
    setXp("");
    setCategory("Study");
    setDueDate("");
  };

  // Calculate total XP
const [userXP, setUserXP] = useState(() => {
  const savedXP = localStorage.getItem("userXP");
  return savedXP ? Number(savedXP) : 0;
});
const [streak, setStreak] = useState(() => {
  const saved = localStorage.getItem("streak");
  return saved ? Number(saved) : 0;
});

const [lastCompletedDate, setLastCompletedDate] = useState(() => {
  return localStorage.getItem("lastCompletedDate") || "";
});
useEffect(() => {
  localStorage.setItem("quests", JSON.stringify(quests));
}, [quests]);
useEffect(() => {
  localStorage.setItem("userXP", userXP);
}, [userXP]);
useEffect(() => {
  localStorage.setItem("streak", streak);
}, [streak]);

useEffect(() => {
  localStorage.setItem("lastCompletedDate", lastCompletedDate);
}, [lastCompletedDate]);

const completedCount = quests.filter(q => q.completed).length;
const pendingCount = quests.length - completedCount;
const achievements = [
  {
    title: "First Quest",
    unlocked: quests.length >= 1,
  },
  {
    title: "Quest Master",
    unlocked: completedCount >= 10,
  },
  {
    title: "XP Collector",
    unlocked: userXP >= 100,
  },
  {
    title: "Legend",
    unlocked: userXP >= 1000,
  },
];
const filteredQuests = quests.filter((quest) => {
  const matchesSearch = quest.title
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesCategory =
    filterCategory === "All" ||
    quest.category === filterCategory;

  const matchesStatus =
    filterStatus === "All" ||
    (filterStatus === "Completed" && quest.completed) ||
    (filterStatus === "Pending" && !quest.completed);

  return matchesSearch && matchesCategory && matchesStatus;
});
const categoryData = ["Study", "Work", "Fitness", "Personal"].map(
  (category) => ({
    category,
    xp: quests
      .filter((q) => q.category === category && q.completed)
      .reduce((sum, q) => sum + q.xp, 0),
  })
);

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <XPCard xp={userXP} />
       <StreakCard streak={streak} />
        <LevelCard xp={userXP} />
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
        <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="bg-slate-800 text-white px-4 py-3 rounded-lg"
>
  <option>Study</option>
  <option>Fitness</option>
  <option>Work</option>
  <option>Personal</option>
</select>
<button
  onClick={addQuest}
  className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-semibold transition"
>
    <input
  type="date"
  value={dueDate}
  onChange={(e) => setDueDate(e.target.value)}
  className="bg-slate-800 text-white px-4 py-3 rounded-lg"
/>
  + Add Quest
</button>
      </div>
        
      {/* Quest List */}
      <h2 className="text-2xl font-bold mb-5">Today's Quests</h2>
      <div className="flex flex-wrap gap-4 mb-6">

  <input
    type="text"
    placeholder="Search quests..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="flex-1 bg-slate-800 text-white px-4 py-3 rounded-lg"
  />

  <select
    value={filterCategory}
    onChange={(e) => setFilterCategory(e.target.value)}
    className="bg-slate-800 text-white px-4 py-3 rounded-lg"
  >
    <option>All</option>
    <option>Study</option>
    <option>Work</option>
    <option>Fitness</option>
    <option>Personal</option>
  </select>

  <select
    value={filterStatus}
    onChange={(e) => setFilterStatus(e.target.value)}
    className="bg-slate-800 text-white px-4 py-3 rounded-lg"
  >
    <option>All</option>
    <option>Completed</option>
    <option>Pending</option>
  </select>

</div>
      {filteredQuests.length === 0 ? (
        <div className="bg-slate-900 rounded-xl p-8 text-center text-slate-400">
          No quests yet. Add your first quest!
        </div>
      ) : (
<div className="space-y-4">
  {filteredQuests.map((quest) => (
<QuestCard
  key={quest.id}
  title={quest.title}
  xp={quest.xp}
  category={quest.category}
  dueDate={quest.dueDate}
  completed={quest.completed}
  onToggle={() => toggleQuest(quest.id)}
  onDelete={() => deleteQuest(quest.id)}
  onEdit={() => editQuest(quest.id)}
/>
  ))}
</div>
      )}
     <h2 className="text-2xl font-bold mt-10 mb-5">
  Achievements
</h2>

<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
  {achievements.map((badge) => (
    <AchievementCard
      key={badge.title}
      title={badge.title}
      unlocked={badge.unlocked}
    />
  ))}
</div>
<div className="mt-10">
  <AnalyticsChart
    completed={completedCount}
    pending={pendingCount}    
  />
  <CategoryChart data={categoryData} />
</div>

    </DashboardLayout>
  );
}