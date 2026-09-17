"use client";

import { useEffect } from "react";

export default function ThankYouScrollToBooking() {
  useEffect(() => {
    const el = document.getElementById("booking");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return null;
}
