"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function PageTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    const page_path = `${pathname}${searchParams?.toString() ? `?${searchParams}` : ""}`;
    window.gtag?.("event", "page_view", { page_path });
  }, [pathname, searchParams]);

  return null;
}
