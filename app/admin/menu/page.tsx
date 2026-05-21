"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  popular: boolean;
  available: boolean;
}

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string; slug: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image_url: "",
    popular: false,
    available: true,
  });

  async function fetchItems() {
    const { data } = await supabase
      .from("menu_items")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setItems(data);
  }

  async function fetchCategories() {
    const { data } = await supabase
      .from("menu_categories")
      .select("*")
      .order("name", { ascending: true });
    if (data) {
      setCategories(data);
      if (!form.category) setForm((prev) => ({ ...prev, category: data[0]?.slug || "" }));
    }
  }

  useEffect(() => {
  async function load() {
    setLoading(true);
    await fetchItems();
    await fetchCategories();
    setLoading(false);
  }
  load();
}, []);

  function resetForm() {
    setForm({ name: "", description: "", price: "", category: categories[0]?.slug || "", image_url: "", popular: false, available: true });
    setEditing(null);
  }

  function startEdit(item: MenuItem) {
    setEditing(item);
    setForm({
      name: item.name,
      description: item.description || "",
      price: item.price.toString(),
      category: item.category,
      image_url: item.image_url || "",
      popular: item.popular,
      available: item.available,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const data = {
      name: form.name,
      description: form.description,
      price: parseInt(form.price),
      category: form.category,
      image_url: form.image_url,
      popular: form.popular,
      available: form.available,
    };

    if (editing) {
      await supabase.from("menu_items").update(data).eq("id", editing.id);
    } else {
      await supabase.from("menu_items").insert(data);
    }

    resetForm();
    fetchItems();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this item?")) return;
    await supabase.from("menu_items").delete().eq("id", id);
    fetchItems();
  }

  async function toggleAvailable(id: string, current: boolean) {
    await supabase.from("menu_items").update({ available: !current }).eq("id", id);
    fetchItems();
  }

  if (loading) {
    return <p className="text-[#666666]">Loading...</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#2C2C2C]">Menu Items ({items.length})</h1>
        <button
          onClick={resetForm}
          className="bg-[#8B1E1E] text-white font-medium px-5 py-2.5 rounded-full text-sm hover:bg-[#6d1717] transition-colors"
        >
          + Add item
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
        <h2 className="font-bold text-[#2C2C2C] mb-4">
          {editing ? `Edit: ${editing.name}` : "New menu item"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#8B1E1E]"
          />
          <input
            placeholder="Price (₦)"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
            className="px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#8B1E1E]"
          />
          <input
            placeholder="Image URL"
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
            className="px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#8B1E1E]"
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#8B1E1E]"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>{cat.name}</option>
            ))}
          </select>
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#8B1E1E] md:col-span-2"
            rows={2}
          />
        </div>
        <div className="flex items-center gap-6 mb-4">
          <label className="flex items-center gap-2 text-sm text-[#666666]">
            <input
              type="checkbox"
              checked={form.popular}
              onChange={(e) => setForm({ ...form, popular: e.target.checked })}
            />
            Popular
          </label>
          <label className="flex items-center gap-2 text-sm text-[#666666]">
            <input
              type="checkbox"
              checked={form.available}
              onChange={(e) => setForm({ ...form, available: e.target.checked })}
            />
            Available
          </label>
        </div>
        <div className="flex gap-3">
          <button type="submit" className="bg-[#8B1E1E] text-white font-medium px-6 py-2.5 rounded-full text-sm hover:bg-[#6d1717] transition-colors">
            {editing ? "Update" : "Add"}
          </button>
          {editing && (
            <button type="button" onClick={resetForm} className="text-[#666666] text-sm hover:text-[#2C2C2C]">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Items list */}
      <div className="grid grid-cols-1 gap-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
              {item.image_url && (
                <Image src={item.image_url} alt={item.name} fill className="object-cover" sizes="64px" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-[#2C2C2C] text-sm">{item.name}</h3>
                {item.popular && <span className="bg-[#F4D03F] text-[#2C2C2C] text-[10px] font-medium px-2 py-0.5 rounded-full">Popular</span>}
                {!item.available && <span className="bg-red-100 text-red-600 text-[10px] font-medium px-2 py-0.5 rounded-full">Hidden</span>}
              </div>
              <p className="text-[#666666] text-xs truncate">{item.description}</p>
              <p className="text-[#8B1E1E] font-bold text-sm mt-1">₦{item.price.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => toggleAvailable(item.id, item.available)} className="text-xs text-[#666666] hover:text-[#2C2C2C]">
                {item.available ? "Hide" : "Show"}
              </button>
              <button onClick={() => startEdit(item)} className="text-xs text-[#8B1E1E] hover:underline">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="text-xs text-red-500 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}