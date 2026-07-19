"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { analytics } from "../../lib/firebase";
import { logEvent } from "firebase/analytics";

export default function FirebaseAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (analytics) {
      logEvent(analytics, 'page_view', {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}
