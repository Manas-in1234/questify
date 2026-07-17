import Navbar from "../components/Navbar";
import FeatureCard from "../components/FeatureCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="flex flex-col items-center justify-center text-center px-6 mt-24">
        <h1 className="text-6xl font-extrabold leading-tight">
          Turn Your Goals
          <br />
          Into Adventures
        </h1>

        <p className="text-slate-400 text-xl mt-6 max-w-2xl">
          Stay motivated with XP, streaks, achievements, and an AI coach.
        </p>

        <div className="mt-10 flex gap-5">
          <button className="bg-indigo-600 hover:bg-indigo-700 px-7 py-3 rounded-xl">
            Start Your Journey
          </button>

          <button className="border border-slate-700 hover:bg-slate-800 px-7 py-3 rounded-xl">
            Learn More
          </button>
        </div>

        <section className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
          <FeatureCard
            icon="⭐"
            title="XP System"
            description="Earn XP every time you complete your daily goals."
          />

          <FeatureCard
            icon="🔥"
            title="Streaks"
            description="Build daily consistency and never break your streak."
          />

          <FeatureCard
            icon="🏆"
            title="Achievements"
            description="Unlock badges and celebrate every milestone."
          />

          <FeatureCard
            icon="🤖"
            title="AI Coach"
            description="Receive personalized guidance and motivational insights."
          />
        </section>
      </main>
    </div>
  );
}