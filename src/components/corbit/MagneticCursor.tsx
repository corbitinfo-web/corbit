import { useEffect, useRef, useState } from "react";

export type CursorMode = "default" | "pointer" | "inspect" | "drag" | "text" | "sound" | "close";

interface CursorContext {
  mode: CursorMode;
  label?: string;
}

export function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const [cursorContext, setCursorContext] = useState<CursorContext>({ mode: "default" });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device supports fine hover pointer and not reduced motion
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || isReducedMotion) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;

    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    // Smooth inertia loop for the outer ring/aura
    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.16);
      ringY = lerp(ringY, mouseY, 0.16);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(2)}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    // Detect hovered targets and update cursor mode
    const onElementOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.(
        "[data-cursor], button, a, .tile, .filmstrip-frame, .catalog-card, input, select, textarea, [role='button']"
      ) as HTMLElement | null;

      if (!target) {
        setCursorContext({ mode: "default" });
        return;
      }

      const explicitCursor = target.getAttribute("data-cursor");
      const explicitLabel = target.getAttribute("data-cursor-label");

      if (explicitCursor) {
        setCursorContext({
          mode: explicitCursor as CursorMode,
          label: explicitLabel || undefined,
        });
      } else if (target.classList.contains("tile") || target.classList.contains("catalog-card")) {
        setCursorContext({ mode: "inspect", label: "INSPECT ↗" });
      } else if (target.classList.contains("filmstrip-frame")) {
        setCursorContext({ mode: "drag", label: "REEL" });
      } else if (target.tagName === "BUTTON" || target.tagName === "A" || target.getAttribute("role") === "button") {
        setCursorContext({ mode: "pointer" });
      } else if (["INPUT", "TEXTAREA"].includes(target.tagName)) {
        setCursorContext({ mode: "text" });
      } else {
        setCursorContext({ mode: "default" });
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onElementOver, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onElementOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  return (
    <div
      className={`corbit-magnetic-cursor-root ${isVisible ? "is-visible" : "is-hidden"} mode-${cursorContext.mode}`}
      aria-hidden="true"
    >
      {/* Precision Core Dot */}
      <div ref={dotRef} className="cursor-dot" />

      {/* Kinetic Trailing Aura / Morphing Capsule */}
      <div ref={ringRef} className="cursor-ring">
        <div className="cursor-ring-inner">
          {cursorContext.label && (
            <span ref={labelRef} className="cursor-label">
              {cursorContext.label}
            </span>
          )}
          {cursorContext.mode === "inspect" && !cursorContext.label && (
            <span className="cursor-label">✦ OPEN</span>
          )}
          {cursorContext.mode === "drag" && !cursorContext.label && (
            <span className="cursor-label">‹ DRAG ›</span>
          )}
        </div>
      </div>
    </div>
  );
}
