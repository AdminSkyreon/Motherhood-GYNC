"use client";

import { useEffect, useState } from "react";
import BookNowButton from "@/components/BookNowButton";

/** Show when the hero (#booking) has mostly scrolled out of view. */
function usePastHeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("booking");
    if (!hero) return;

    const update = () => {
      const rect = hero.getBoundingClientRect();
      setVisible(rect.bottom < Math.min(window.innerHeight * 0.25, 160));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return visible;
}

export default function FloatingVerticalBookNow() {
  const show = usePastHeroSection();

  return (
    <BookNowButton
      className={`floating-vertical-book-now lg:flex${show ? " floating-vertical-book-now--visible" : ""}`}
    >
      Book Now
    </BookNowButton>
  );
}
