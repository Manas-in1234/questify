import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-8 py-5">
      <h1
        className="text-2xl font-bold text-indigo-400 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Questify
      </h1>

      <div className="space-x-4">
        <button
          onClick={() => navigate("/login")}
          className="px-5 py-2 rounded-lg hover:bg-slate-800 transition"
        >
          Login
        </button>

<button
  onClick={() => navigate("/register")}
  className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-lg transition"
>
  Get Started
</button>
      </div>
    </nav>
  );
}