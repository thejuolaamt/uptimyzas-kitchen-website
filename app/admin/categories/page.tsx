"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

  async function fetchCategories() {
    const { data } = await supabase
      .from("menu_categories")
      .select("*")
      .order("name", { ascending: true });
    if (data) setCategories(data);
    setLoading(false);
  }

  useEffect(() => { fetchCategories(); }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    await supabase.from("menu_categories").insert({ name: name.trim(), slug });
    setName("");
    fetchCategories();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this category? This won't delete the menu items in it.")) return;
    await supabase.from("menu_categories").delete().eq("id", id);
    fetchCategories();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#2C2C2C] mb-8">Categories</h1>

      <form onSubmit={handleAdd} className="bg-white rounded-2xl p-6 mb-8 shadow-sm flex gap-3">
        <input
          placeholder="Category name (e.g. Swallows)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#8B1E1E]"
        />
        <button type="submit" className="bg-[#8B1E1E] text-white font-medium px-6 py-2.5 rounded-full text-sm hover:bg-[#6d1717] transition-colors flex-shrink-0">
          Add
        </button>
      </form>

      {loading ? (
        <p className="text-[#666666]">Loading...</p>
      ) : categories.length === 0 ? (
        <p className="text-[#666666] text-center py-8">No categories yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
              <div>
                <p className="font-bold text-[#2C2C2C] text-sm">{cat.name}</p>
                <p className="text-[#999] text-xs">{cat.slug}</p>
              </div>
              <button onClick={() => handleDelete(cat.id)} className="text-xs text-red-500 hover:underline">
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}