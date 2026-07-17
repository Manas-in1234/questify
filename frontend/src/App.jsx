import Navbar from "./components/Navbar";

function App() {
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
          Stay motivated with XP, streaks, achievements, and an AI coach that
          helps you achieve your goals.
        </p>

        <div className="mt-10 flex gap-5">
          <button className="bg-indigo-600 hover:bg-indigo-700 px-7 py-3 rounded-xl text-lg font-semibold transition">
            Start Your Journey
          </button>

          <button className="border border-slate-700 hover:bg-slate-800 px-7 py-3 rounded-xl text-lg transition">
            Learn More
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;