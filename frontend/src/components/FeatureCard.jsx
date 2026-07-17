export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500 transition-all duration-300 hover:scale-105">
      <div className="text-4xl mb-4">{icon}</div>

      <h2 className="text-xl font-bold mb-2">
        {title}
      </h2>

      <p className="text-slate-400">
        {description}
      </p>
    </div>
  );
}
