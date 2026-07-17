import DashboardLayout from "../layouts/DashboardLayout";
import XPCard from "../components/XPCard";
import StreakCard from "../components/StreakCard";
import LevelCard from "../components/LevelCard";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <XPCard />
        <StreakCard />
        <LevelCard />
      </div>
    </DashboardLayout>
  );
}