import { useEffect, useState } from "react";

export interface ScrollState {
  scrollY: number;
  scrollProgress: number; // 0 to 1
  velocity: number; // px per frame
  direction: "up" | "down" | "idle";
  isScrolled: boolean; // true if scrolled > 40px
}

/**
 * useScrollPhysics Hook
 * Provides high-frequency, interpolated scroll dynamics for buttery smooth parallax & state morphs.
 */
export function useScrollPhysics(): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    scrollProgress: 0,
    velocity: 0,
    direction: "idle",
    isScrolled: false,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let targetScrollY = window.scrollY;
    let currentVelocity = 0;
    let rafId: number | null = null;
    let ticking = false;

    const calculateState = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(window.scrollY / docHeight, 0), 1) : 0;
      const delta = targetScrollY - lastScrollY;
      
      // Damped velocity calculation
      currentVelocity = delta;
      const dir: "up" | "down" | "idle" = delta > 0.5 ? "down" : delta < -0.5 ? "up" : "idle";

      setScrollState({
        scrollY: targetScrollY,
        scrollProgress: progress,
        velocity: Math.abs(currentVelocity),
        direction: dir,
        isScrolled: targetScrollY > 40,
      });

      lastScrollY = targetScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(calculateState);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial run
    calculateState();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return scrollState;
}
