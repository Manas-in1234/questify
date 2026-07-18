import { useState, useEffect } from "react";

export default function QuestModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}) {
  const [title, setTitle] = useState("");
  const [xp, setXp] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setXp(initialData.xp);
    } else {
      setTitle("");
      setXp("");
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!title.trim() || !xp) return;

    onSave({
      title: title.trim(),
      xp: Number(xp),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

      <div className="bg-slate-900 rounded-2xl p-8 w-96">

        <h2 className="text-2xl font-bold mb-6">
          {initialData ? "Edit Quest" : "Add Quest"}
        </h2>

        <input
          className="w-full bg-slate-800 p-3 rounded-lg mb-4"
          placeholder="Quest Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full bg-slate-800 p-3 rounded-lg"
          type="number"
          placeholder="XP Reward"
          value={xp}
          onChange={(e) => setXp(e.target.value)}
        />

        <div className="flex justify-end gap-4 mt-6">

          <button
            onClick={onClose}
            className="bg-slate-700 px-5 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="bg-indigo-600 px-5 py-2 rounded-lg"
          >
            Save
          </button>

        </div>

      </div>

    </div>
  );
}