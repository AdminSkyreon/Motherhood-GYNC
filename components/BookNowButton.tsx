"use client";

import type { ReactNode } from "react";
import { handleBookNowClick } from "@/lib/activateBookingForm";

type BookNowButtonProps = {
  className?: string;
  children?: ReactNode;
};

export default function BookNowButton({
  className,
  children = "Book Now",
}: BookNowButtonProps) {
  return (
    <a href="#booking" className={className} onClick={handleBookNowClick}>
      {children}
    </a>
  );
}
