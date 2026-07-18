import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function CategoryChart({ data }) {
  return (
    <div className="bg-slate-900 p-6 rounded-2xl mt-8">
      <h2 className="text-xl font-bold mb-4">
        XP by Category
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="xp" fill="#6366f1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}