"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setError("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Account created! You can now sign in.");
    }
  }

  async function handleGoogleSignUp() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });

    if (error) setError(error.message);
  }

  return (
    <section className="pt-24 pb-16 min-h-screen bg-white">
      <div className="max-w-md mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2 text-center">Create an account</h1>
        <p className="text-[#666666] text-center mb-8">Join Uptimyzas Kitchen</p>

        {message && (
          <div className="bg-[#27AE60]/10 border border-[#27AE60]/20 rounded-xl p-4 mb-6 text-[#27AE60] text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Google button */}
        <button
          onClick={handleGoogleSignUp}
          className="w-full bg-white border border-gray-300 text-[#2C2C2C] font-medium px-6 py-3 rounded-full hover:bg-gray-50 transition-colors text-base flex items-center justify-center gap-3 mb-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Sign up with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs text-[#999]">or</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Email form */}
        <form onSubmit={handleSignUp} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-[#2C2C2C] mb-1.5">Full name</label>
            <input
              id="name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#8B1E1E] outline-none transition-colors"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-[#2C2C2C] mb-1.5">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#8B1E1E] outline-none transition-colors"
              placeholder="you@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-[#2C2C2C] mb-1.5">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#8B1E1E] outline-none transition-colors"
              placeholder="At least 6 characters"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#8B1E1E] text-white font-medium px-6 py-3.5 rounded-full hover:bg-[#6d1717] transition-colors text-base"
          >
            Create account
          </button>
        </form>

        <p className="text-[#666666] text-sm text-center mt-6">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#8B1E1E] font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}