"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles: {
    full_name: string;
  } | null;
}

export default function BlogComments({ postId }: { postId: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchComments = useCallback(async () => {
    const { data } = await supabase
      .from("comments")
      .select("id, content, created_at, user_id, profiles(full_name)")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (data) {
      const formatted: Comment[] = data.map((item: any) => ({
        id: item.id,
        content: item.content,
        created_at: item.created_at,
        user_id: item.user_id,
        profiles: Array.isArray(item.profiles) && item.profiles.length > 0
          ? item.profiles[0]
          : null,
      }));
      setComments(formatted);
    }
    setLoading(false);
  }, [postId]);

  useEffect(() => {
    async function init() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    }
    init();
    fetchComments();
  }, [fetchComments]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim() || !user) return;

    setSubmitting(true);
    await supabase.from("comments").insert({
      post_id: postId,
      user_id: user.id,
      content: content.trim(),
    });

    setContent("");
    setSubmitting(false);
    fetchComments();
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#2C2C2C] mb-8">
        Comments{comments.length > 0 ? ` (${comments.length})` : ""}
      </h2>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-10">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts..."
            rows={3}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#8B1E1E] outline-none transition-colors resize-none text-[#2C2C2C] mb-3"
          />
          <button
            type="submit"
            disabled={submitting || !content.trim()}
            className="bg-[#8B1E1E] text-white font-medium px-6 py-2.5 rounded-full hover:bg-[#6d1717] transition-colors text-sm disabled:opacity-50"
          >
            {submitting ? "Posting..." : "Post comment"}
          </button>
        </form>
      ) : (
        <div className="bg-white rounded-2xl p-6 text-center mb-10">
          <p className="text-[#666666] mb-3">Sign in to leave a comment.</p>
          <Link
            href="/auth/login"
            className="inline-block bg-[#8B1E1E] text-white font-medium px-5 py-2 rounded-full hover:bg-[#6d1717] transition-colors text-sm"
          >
            Sign in
          </Link>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-5 animate-pulse">
              <div className="w-24 h-4 bg-gray-200 rounded mb-2"></div>
              <div className="w-full h-12 bg-gray-100 rounded"></div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <p className="text-[#666666] text-center py-8">No comments yet. Be the first.</p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-[#2C2C2C] text-sm">
                  {comment.profiles?.full_name || "Anonymous"}
                </span>
                <span className="text-[#999] text-xs">
                  {new Date(comment.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <p className="text-[#2C2C2C] text-sm leading-relaxed">
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}