import { useEffect, useState } from "react";
import { useScrollPhysics } from "@/hooks/useScrollPhysics";
import { useMagnetic } from "@/hooks/useMagnetic";

export function ScrollTelemetry() {
  const { scrollProgress, velocity, direction, isScrolled } = useScrollPhysics();
  const [timecode, setTimecode] = useState("00:00:00:00");
  const magneticBackToTopRef = useMagnetic<HTMLButtonElement>({ strength: 0.4, radius: 60 });

  // Simulated live cinema timecode counter
  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      frame = (frame + 1) % 24;
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const s = String(now.getSeconds()).padStart(2, "0");
      const f = String(frame).padStart(2, "0");
      setTimecode(`${h}:${m}:${s}:${f}`);
    }, 1000 / 24);

    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const progressPercent = Math.round(scrollProgress * 100);

  return (
    <aside
      className={`corbit-telemetry-hud ${isScrolled ? "is-active" : ""}`}
      aria-label="Studio Telemetry and Navigation HUD"
    >
      <div className="telemetry-capsule">
        {/* Status indicator pulse */}
        <div className="telemetry-item telemetry-status">
          <span className="pulse-dot" />
          <span className="telemetry-label">CORBIT LIVE</span>
        </div>

        {/* Live SMPTE Timecode */}
        <div className="telemetry-item telemetry-timecode" title="Archive Studio Clock (24fps)">
          <span className="hud-code">{timecode}</span>
        </div>

        {/* Dynamic Scroll Progress meter */}
        <div className="telemetry-item telemetry-meter">
          <div className="meter-track">
            <div
              className="meter-fill"
              style={{
                width: `${progressPercent}%`,
                transform: `scaleX(${progressPercent / 100})`,
                transformOrigin: "left center",
              }}
            />
          </div>
          <span className="meter-text">{progressPercent}%</span>
        </div>

        {/* Scroll Velocity indicator (subtle dynamic badge) */}
        {velocity > 2 && (
          <div className="telemetry-item telemetry-velocity">
            <span className="velocity-glyph">{direction === "down" ? "↓" : "↑"}</span>
            <span className="velocity-speed">{(velocity * 0.5).toFixed(1)}k</span>
          </div>
        )}

        {/* Magnetic Back to Top */}
        {isScrolled && (
          <button
            ref={magneticBackToTopRef}
            type="button"
            className="telemetry-action-top"
            onClick={scrollToTop}
            data-cursor="pointer"
            data-cursor-label="TOP ↑"
            aria-label="Scroll to top of page"
            title="Return to top"
          >
            ↑
          </button>
        )}
      </div>
    </aside>
  );
}
