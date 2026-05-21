"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface PopupData {
  id: string;
  title: string;
  message: string;
  button_text: string;
  button_link: string;
  image_url: string | null;
}

export default function Popup() {
  const [popup, setPopup] = useState<PopupData | null>(null);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const dismiss = useCallback(() => {
    if (!popup) return;
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem(`popup-dismissed-${popup.id}`, "true");
  }, [popup]);

  useEffect(() => {
    async function fetchPopup() {
      const { data } = await supabase
        .from("popups")
        .select("id, title, message, button_text, button_link, image_url")
        .eq("active", true)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (!data) return;

      const alreadyDismissed = sessionStorage.getItem(`popup-dismissed-${data.id}`);
      if (alreadyDismissed) return;

      const lastShown = localStorage.getItem(`popup-shown-${data.id}`);
      if (lastShown) {
        const hoursSince = (Date.now() - parseInt(lastShown)) / (1000 * 60 * 60);
        if (hoursSince < 24) return;
      }

      setPopup(data);

      setTimeout(() => {
        setVisible(true);
        localStorage.setItem(`popup-shown-${data.id}`, Date.now().toString());
      }, 4000);
    }

    fetchPopup();
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape" && visible) dismiss();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [visible, dismiss]);

  if (!popup || !visible || dismissed) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={dismiss}
        aria-hidden="true"
      />

      {/* Popup card — centered on all devices */}
      <div
        className="fixed z-[101] inset-0 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
      >
        <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
          {/* Close button */}
          <button
            onClick={dismiss}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-colors"
            aria-label="Close popup"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Image — with object-fit control */}
          {popup.image_url && (
            <div className="relative w-full h-48 bg-gray-100">
              <Image
                src={popup.image_url}
                alt={popup.title}
                fill
                className="object-cover"
                priority
                sizes="400px"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-6 text-center">
            <h2 id="popup-title" className="text-xl font-bold text-[#2C2C2C] mb-2">
              {popup.title}
            </h2>
            <p className="text-[#666666] text-sm leading-relaxed mb-6">
              {popup.message}
            </p>

            <Link
              href={popup.button_link}
              onClick={dismiss}
              className="block w-full bg-[#8B1E1E] text-white font-medium px-6 py-3 rounded-full hover:bg-[#6d1717] transition-colors text-center"
            >
              {popup.button_text}
            </Link>

            <button
              onClick={dismiss}
              className="mt-3 text-[#999] text-xs hover:text-[#666666] transition-colors"
            >
              Not now
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </>
  );
}