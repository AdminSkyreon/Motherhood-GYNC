"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
} from "react";

/** Pause after manual swipe / drag on the carousel track. */
export const CAROUSEL_USER_SCROLL_PAUSE_MS = 3500;
/** Pause when the user taps or clicks a card in the carousel. */
export const CAROUSEL_CARD_CLICK_PAUSE_MS = 5000;
const AUTO_SCROLL_IGNORE_MS = 50;

export type InfiniteAutoScrollOptions = {
  enabled: boolean;
  pxPerSec: number;
  /** When true, auto-scroll is paused (e.g. expanded review card). */
  blockAutoScroll?: boolean;
  itemCount: number;
};

export function useInfiniteAutoScroll({
  enabled,
  pxPerSec,
  blockAutoScroll = false,
  itemCount,
}: InfiniteAutoScrollOptions) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef(0);
  const ignoreUserPauseUntilRef = useRef(0);
  const visibleRef = useRef(true);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);

  const pauseAfterUserScroll = useCallback(
    (ms: number = CAROUSEL_USER_SCROLL_PAUSE_MS) => {
      if (!enabled) return;
      pausedRef.current = true;
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = setTimeout(() => {
        pausedRef.current = false;
        resumeTimerRef.current = null;
      }, ms);
    },
    [enabled],
  );

  const markProgrammaticScroll = useCallback(() => {
    ignoreUserPauseUntilRef.current = performance.now() + AUTO_SCROLL_IGNORE_MS;
  }, []);

  const normalizeInfiniteScroll = useCallback(
    (el: HTMLDivElement, fromAuto = false) => {
      if (!el || !enabled) return;
      const segment = el.scrollWidth / 3;
      if (segment < 1) return;

      const min = segment;
      const max = segment * 2;

      if (el.scrollLeft >= max - 1) {
        markProgrammaticScroll();
        el.scrollLeft -= segment;
      } else if (el.scrollLeft < min) {
        markProgrammaticScroll();
        el.scrollLeft += segment;
      } else if (fromAuto) {
        markProgrammaticScroll();
      }
    },
    [enabled, markProgrammaticScroll],
  );

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el || !enabled) return;
    const segment = el.scrollWidth / 3;
    if (segment > 0) {
      markProgrammaticScroll();
      el.scrollLeft = segment;
    }
  }, [enabled, itemCount, markProgrammaticScroll]);

  useEffect(() => {
    if (!enabled) return;

    const el = scrollRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 },
    );
    io.observe(el);

    const onScroll = () => {
      normalizeInfiniteScroll(el, false);
      if (performance.now() < ignoreUserPauseUntilRef.current) {
        return;
      }
      pauseAfterUserScroll();
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 2) {
        pauseAfterUserScroll();
      }
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: true });

    lastFrameRef.current = performance.now();

    const tick = (now: number) => {
      const deltaMs = Math.min(now - lastFrameRef.current, 48);
      lastFrameRef.current = now;

      if (
        visibleRef.current &&
        !pausedRef.current &&
        !blockAutoScroll &&
        el.scrollWidth > el.clientWidth + 2
      ) {
        markProgrammaticScroll();
        el.scrollLeft += (pxPerSec * deltaMs) / 1000;
        normalizeInfiniteScroll(el, true);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      io.disconnect();
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("wheel", onWheel);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [
    enabled,
    blockAutoScroll,
    pxPerSec,
    pauseAfterUserScroll,
    normalizeInfiniteScroll,
    markProgrammaticScroll,
  ]);

  const onPointerDown = (e: ReactPointerEvent) => {
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerMove = (e: ReactPointerEvent) => {
    const start = dragStartRef.current;
    if (!start) return;
    const dx = Math.abs(e.clientX - start.x);
    const dy = Math.abs(e.clientY - start.y);
    if (dx >= 8 && dx > dy) {
      pauseAfterUserScroll();
      dragStartRef.current = null;
    }
  };

  const onPointerUp = () => {
    dragStartRef.current = null;
  };

  return {
    scrollRef,
    pauseAfterUserScroll,
    pointerHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
    },
  };
}
