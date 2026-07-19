import { useState, useEffect } from "react";
import api from "../api/api";

import DashboardLayout from "../layouts/DashboardLayout";
import XPCard from "../components/XPCard";
import StreakCard from "../components/StreakCard";
import LevelCard from "../components/LevelCard";
import QuestCard from "../components/QuestCard";
import AchievementCard from "../components/AchievementCard";
import AnalyticsChart from "../components/AnalyticsChart";
import CategoryChart from "../components/CategoryChart";

export default function Dashboard() {



  const [quests, setQuests] = useState([]);

  const [title, setTitle] = useState("");
  const [xp, setXp] = useState("");
  const [category, setCategory] = useState("Study");
  const [difficulty, setDifficulty] = useState("Easy");
  const [dueDate, setDueDate] = useState("");

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const [userXP, setUserXP] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [streak, setStreak] = useState(0);

  const fetchDashboard = async () => {
  try {
    const res = await api.get("/dashboard");

    setUserXP(res.data.user.xp);
    setUserLevel(res.data.user.level);
    setStreak(res.data.user.streak);
  } catch (err) {
    console.log(err);
  }
};
  // ===========================
  // Fetch Quests
  // ===========================

  const fetchQuests = async () => {
    try {
      const res = await api.get("/quests");

      setQuests(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch quests");
    }
  };

  useEffect(() => {
    fetchQuests();
    fetchDashboard();
  }, []);

  // ===========================
  // Add Quest
  // ===========================

  const addQuest = async () => {
    if (!title || !xp) return;

    try {
      await api.post(
        "/quests",
        {
          title,
          category,
          difficulty,
          xp: Number(xp),
          dueDate,
        },
      
      );

      setTitle("");
      setXp("");
      setCategory("Study");
      setDifficulty("Easy");
      setDueDate("");

      fetchQuests();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create quest");
    }
  };

  // ===========================
  // Delete Quest
  // ===========================

  const deleteQuest = async (id) => {
    try {
      await api.delete(`/quests/${id}`);

      fetchQuests();
    } catch (err) {
      console.error(err);
      alert("Failed to delete quest");
    }
  };

  // ===========================
  // Edit Quest
  // ===========================

  const editQuest = async (quest) => {
    const newTitle = prompt("Quest Title", quest.title);

    if (newTitle === null) return;

    const newXP = prompt("Quest XP", quest.xp);

    if (newXP === null) return;

    try {
      await api.put(
        `/quests/${quest.id}`,
        {
          title: newTitle,
          xp: Number(newXP),
        },
       
      );

      fetchQuests();
    } catch (err) {
      console.error(err);
      alert("Failed to update quest");
    }
  };

  // ===========================
  // Complete Quest
  // ===========================

  const toggleQuest = async (id) => {
    try {
      const res = await api.patch(
        `/quests/${id}/complete`,
        {},
    
      );

      if (res.data.user) {
        setUserXP(res.data.user.xp);
        setUserLevel(res.data.user.level);
      }
      fetchDashboard();
      fetchQuests();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Unable to complete quest");
    }
  };

  // ===========================
  // Search & Filters
  // ===========================

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

  const completedCount = quests.filter((q) => q.completed).length;
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

  const categoryData = ["Study", "Work", "Fitness", "Personal"].map(
    (cat) => ({
      category: cat,
      xp: quests
        .filter((q) => q.category === cat && q.completed)
        .reduce((sum, q) => sum + q.xp, 0),
    })
  );

  return ( <DashboardLayout>
  <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

  {/* Stats Cards */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
    <XPCard xp={userXP} />
    <StreakCard streak={streak} />
    <LevelCard xp={userXP} level={userLevel} />
  </div>

  {/* Add Quest */}
  <h2 className="text-2xl font-bold mb-5">
    Add New Quest
  </h2>

  <div className="bg-slate-900 p-6 rounded-2xl flex flex-wrap gap-4 mb-8">

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
      <option>Work</option>
      <option>Fitness</option>
      <option>Personal</option>
    </select>

    <select
      value={difficulty}
      onChange={(e) => setDifficulty(e.target.value)}
      className="bg-slate-800 text-white px-4 py-3 rounded-lg"
    >
      <option>Easy</option>
      <option>Medium</option>
      <option>Hard</option>
    </select>

    <input
      type="date"
      value={dueDate}
      onChange={(e) => setDueDate(e.target.value)}
      className="bg-slate-800 text-white px-4 py-3 rounded-lg"
    />

    <button
      onClick={addQuest}
      className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-semibold transition"
    >
      + Add Quest
    </button>

  </div>

  {/* Search & Filters */}

  <h2 className="text-2xl font-bold mb-5">
    Today's Quests
  </h2>

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

  {/* Quest List */}

  {filteredQuests.length === 0 ? (
    <div className="bg-slate-900 rounded-xl p-8 text-center text-slate-400">
      No quests found.
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
          onEdit={() => editQuest(quest)}
        />

      ))}

    </div>
  )}
        {/* Achievements */}

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

      {/* Analytics */}

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