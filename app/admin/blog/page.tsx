"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  published: boolean;
  created_at: string;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    published: false,
  });

  async function fetchPosts() {
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setPosts(data);
    setLoading(false);
  }

  useEffect(() => { fetchPosts(); }, []);

  function resetForm() {
    setForm({ title: "", slug: "", content: "", excerpt: "", published: false });
    setEditing(null);
  }

  function startEdit(post: BlogPost) {
    setEditing(post);
    setForm({
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt || "",
      published: post.published,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const data = {
      title: form.title,
      slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      content: form.content,
      excerpt: form.excerpt,
      published: form.published,
    };

    if (editing) {
      await supabase.from("blog_posts").update(data).eq("id", editing.id);
    } else {
      await supabase.from("blog_posts").insert(data);
    }

    resetForm();
    fetchPosts();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this post?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    fetchPosts();
  }

  if (loading) return <p className="text-[#666666]">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#2C2C2C]">Blog Posts ({posts.length})</h1>
        <button onClick={resetForm} className="bg-[#8B1E1E] text-white font-medium px-5 py-2.5 rounded-full text-sm hover:bg-[#6d1717] transition-colors">
          + New post
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
        <h2 className="font-bold text-[#2C2C2C] mb-4">
          {editing ? `Edit: ${editing.title}` : "New blog post"}
        </h2>
        <div className="space-y-4 mb-4">
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#8B1E1E]"
          />
          <input
            placeholder="Slug (e.g. my-blog-post)"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#8B1E1E]"
          />
          <textarea
            placeholder="Excerpt"
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#8B1E1E]"
            rows={2}
          />
          <textarea
            placeholder="Content (HTML allowed)"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#8B1E1E]"
            rows={6}
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-[#666666] mb-4">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
          />
          Published
        </label>
        <div className="flex gap-3">
          <button type="submit" className="bg-[#8B1E1E] text-white font-medium px-6 py-2.5 rounded-full text-sm hover:bg-[#6d1717] transition-colors">
            {editing ? "Update" : "Publish"}
          </button>
          {editing && (
            <button type="button" onClick={resetForm} className="text-[#666666] text-sm hover:text-[#2C2C2C]">Cancel</button>
          )}
        </div>
      </form>

      <div className="grid grid-cols-1 gap-3">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-[#2C2C2C] text-sm">{post.title}</h3>
                {post.published ? (
                  <span className="bg-green-100 text-green-600 text-[10px] font-medium px-2 py-0.5 rounded-full">Published</span>
                ) : (
                  <span className="bg-gray-100 text-[#666666] text-[10px] font-medium px-2 py-0.5 rounded-full">Draft</span>
                )}
              </div>
              <p className="text-[#999] text-xs">{new Date(post.created_at).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => startEdit(post)} className="text-xs text-[#8B1E1E] hover:underline">Edit</button>
              <button onClick={() => handleDelete(post.id)} className="text-xs text-red-500 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}