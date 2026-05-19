"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

interface Testimonial {
  id: string;
  name: string;
  comment: string;
  rating: number;
  created_at: string;
}

export default function Testimonials() {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const fetchReviews = useCallback(async () => {
    const { data } = await supabase
      .from("testimonials")
      .select("id, name, comment, rating, created_at")
      .order("created_at", { ascending: false })
      .limit(3);

    if (data) setReviews(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    async function init() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    }
    init();
    fetchReviews();
  }, [fetchReviews]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || rating === 0 || !comment.trim()) return;

    setSubmitting(true);

    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .single();

    const name = profile?.full_name || user.email?.split("@")[0] || "Customer";

    await supabase.from("testimonials").insert({
      user_id: user.id,
      name,
      comment: comment.trim(),
      rating,
    });

    setRating(0);
    setComment("");
    setSubmitting(false);
    setSubmitted(true);
    setShowForm(false);
    fetchReviews();

    setTimeout(() => setSubmitted(false), 3000);
  }

  function handleLeaveReview() {
    if (!user) {
      window.location.href = "/auth/login";
      return;
    }
    setShowForm(true);
  }

  if (loading) return null;

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-14 reveal-on-scroll">
          <p className="text-[#666666] text-sm uppercase tracking-widest mb-3">From people who eat here</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]">
            What people are saying
          </h2>
        </div>

        {/* Reviews */}
        {reviews.length === 0 ? (
          <div className="text-center py-12 reveal-on-scroll">
            <p className="text-4xl mb-4">🍛</p>
            <p className="text-[#666666] text-lg mb-2">No reviews yet</p>
            <p className="text-[#999] text-sm mb-6">Be the first to tell us what you think.</p>
            <button
              onClick={handleLeaveReview}
              className="inline-flex items-center gap-2 bg-[#8B1E1E] text-white font-medium px-6 py-3 rounded-full hover:bg-[#6d1717] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              Leave a review
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className="bg-[#F9F9F9] rounded-2xl p-6 reveal-on-scroll"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-4 h-4 ${star <= review.rating ? "text-[#F4D03F]" : "text-gray-300"}`}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>

                <p className="text-[#2C2C2C] leading-relaxed mb-4 text-sm">
                  "{review.comment}"
                </p>

                <p className="text-[#666666] text-xs font-medium">— {review.name}</p>
              </div>
            ))}
          </div>
        )}

        {reviews.length > 0 && !showForm && (
          <div className="text-center mt-8 reveal-on-scroll">
            <button
              onClick={handleLeaveReview}
              className="text-[#8B1E1E] font-medium text-sm hover:underline"
            >
              {user ? "Leave a review" : "Sign in to leave a review"}
            </button>
          </div>
        )}

        {submitted && (
          <div className="text-center mt-4 reveal-on-scroll">
            <p className="text-[#27AE60] text-sm font-medium">Thanks for your review!</p>
          </div>
        )}

        {showForm && (
          <div className="max-w-md mx-auto mt-8 bg-[#F9F9F9] rounded-2xl p-6 reveal-on-scroll">
            <h3 className="font-bold text-[#2C2C2C] mb-4 text-center">Leave a review</h3>

            <div className="flex justify-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-8 h-8 ${star <= (hoverRating || rating) ? "text-[#F4D03F]" : "text-gray-300"}`}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-center text-[#666666] text-xs mb-3">
                {rating === 5 ? "Excellent!" : rating === 4 ? "Great!" : rating === 3 ? "Good" : rating === 2 ? "Okay" : "Not great"}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us about your experience..."
                rows={3}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#8B1E1E] outline-none transition-colors resize-none text-sm"
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting || rating === 0 || !comment.trim()}
                  className="flex-1 bg-[#8B1E1E] text-white font-medium px-6 py-2.5 rounded-full text-sm hover:bg-[#6d1717] transition-colors disabled:opacity-50"
                >
                  {submitting ? "Posting..." : "Submit review"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-[#666666] text-sm hover:text-[#2C2C2C]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}