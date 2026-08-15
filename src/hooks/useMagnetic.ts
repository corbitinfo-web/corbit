import { useEffect, useRef } from "react";

interface MagneticOptions {
  strength?: number; // 0.1 to 0.8
  radius?: number; // Distance in px to start triggering magnetic pull
  ease?: number;
}

/**
 * useMagnetic Hook
 * Gives any button or DOM element an elastic physical attraction to the cursor.
 */
export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(options: MagneticOptions = {}) {
  const { strength = 0.35, radius = 90, ease = 0.15 } = options;
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Disable magnetic physics on touch devices or reduced motion
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number | null = null;
    let isHovering = false;

    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

    const animate = () => {
      currentX = lerp(currentX, targetX, ease);
      currentY = lerp(currentY, targetY, ease);

      if (el) {
        el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      }

      // Stop loop if it has settled to prevent unnecessary work
      if (!isHovering && Math.abs(currentX) < 0.05 && Math.abs(currentY) < 0.05) {
        currentX = 0;
        currentY = 0;
        if (el) el.style.transform = "translate3d(0, 0, 0)";
        rafId = null;
        return;
      }

      rafId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);

      if (distance < radius) {
        isHovering = true;
        targetX = (e.clientX - centerX) * strength;
        targetY = (e.clientY - centerY) * strength;

        if (!rafId) {
          rafId = requestAnimationFrame(animate);
        }
      } else if (isHovering) {
        isHovering = false;
        targetX = 0;
        targetY = 0;
      }
    };

    const handleMouseLeave = () => {
      isHovering = false;
      targetX = 0;
      targetY = 0;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
      if (el) el.style.transform = "";
    };
  }, [strength, radius, ease]);

  return ref;
}
