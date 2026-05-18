"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Popup {
  id: string;
  title: string;
  message: string;
  button_text: string;
  button_link: string;
  image_url: string | null;
  active: boolean;
}

export default function AdminPopupsPage() {
  const [popups, setPopups] = useState<Popup[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Popup | null>(null);
  const [form, setForm] = useState({
    title: "",
    message: "",
    button_text: "Order now",
    button_link: "/menu",
    image_url: "",
    active: true,
  });

  async function fetchPopups() {
    const { data } = await supabase
      .from("popups")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setPopups(data);
    setLoading(false);
  }

  useEffect(() => { fetchPopups(); }, []);

  function resetForm() {
    setForm({ title: "", message: "", button_text: "Order now", button_link: "/menu", image_url: "", active: true });
    setEditing(null);
  }

  function startEdit(popup: Popup) {
    setEditing(popup);
    setForm({
      title: popup.title,
      message: popup.message,
      button_text: popup.button_text,
      button_link: popup.button_link,
      image_url: popup.image_url || "",
      active: popup.active,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const data = {
      title: form.title,
      message: form.message,
      button_text: form.button_text,
      button_link: form.button_link,
      image_url: form.image_url || null,
      active: form.active,
    };

    if (editing) {
      await supabase.from("popups").update(data).eq("id", editing.id);
    } else {
      await supabase.from("popups").insert(data);
    }

    resetForm();
    fetchPopups();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this popup?")) return;
    await supabase.from("popups").delete().eq("id", id);
    fetchPopups();
  }

  async function setActive(id: string) {
    // Deactivate all, then activate selected
    await supabase.from("popups").update({ active: false }).neq("id", "none");
    await supabase.from("popups").update({ active: true }).eq("id", id);
    fetchPopups();
  }

  if (loading) return <p className="text-[#666666]">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#2C2C2C]">Popups ({popups.length})</h1>
        <button onClick={resetForm} className="bg-[#8B1E1E] text-white font-medium px-5 py-2.5 rounded-full text-sm hover:bg-[#6d1717] transition-colors">
          + New popup
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
        <h2 className="font-bold text-[#2C2C2C] mb-4">
          {editing ? `Edit popup` : "New popup"}
        </h2>
        <div className="space-y-4 mb-4">
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#8B1E1E]"
          />
          <textarea
            placeholder="Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#8B1E1E]"
            rows={3}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Button text"
              value={form.button_text}
              onChange={(e) => setForm({ ...form, button_text: e.target.value })}
              className="px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#8B1E1E]"
            />
            <input
              placeholder="Button link"
              value={form.button_link}
              onChange={(e) => setForm({ ...form, button_link: e.target.value })}
              className="px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#8B1E1E]"
            />
          </div>
          <input
            placeholder="Image URL (optional)"
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#8B1E1E]"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-[#666666] mb-4">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => setForm({ ...form, active: e.target.checked })}
          />
          Active
        </label>
        <div className="flex gap-3">
          <button type="submit" className="bg-[#8B1E1E] text-white font-medium px-6 py-2.5 rounded-full text-sm hover:bg-[#6d1717] transition-colors">
            {editing ? "Update" : "Create"}
          </button>
          {editing && (
            <button type="button" onClick={resetForm} className="text-[#666666] text-sm hover:text-[#2C2C2C]">Cancel</button>
          )}
        </div>
      </form>

      <div className="grid grid-cols-1 gap-3">
        {popups.map((popup) => (
          <div key={popup.id} className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-[#2C2C2C] text-sm">{popup.title}</h3>
                {popup.active ? (
                  <span className="bg-green-100 text-green-600 text-[10px] font-medium px-2 py-0.5 rounded-full">Active</span>
                ) : (
                  <span className="bg-gray-100 text-[#666666] text-[10px] font-medium px-2 py-0.5 rounded-full">Inactive</span>
                )}
                {popup.image_url && <span className="text-[10px] text-[#999]">📷</span>}
              </div>
              <p className="text-[#666666] text-xs truncate max-w-md">{popup.message}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {!popup.active && (
                <button onClick={() => setActive(popup.id)} className="text-xs text-[#27AE60] hover:underline">Activate</button>
              )}
              <button onClick={() => startEdit(popup)} className="text-xs text-[#8B1E1E] hover:underline">Edit</button>
              <button onClick={() => handleDelete(popup.id)} className="text-xs text-red-500 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}