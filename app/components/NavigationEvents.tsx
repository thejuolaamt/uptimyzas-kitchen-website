"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Navigation event detected — ProgressBar responds automatically
  }, [pathname, searchParams]);

  return null;
}