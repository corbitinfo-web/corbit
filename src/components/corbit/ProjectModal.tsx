import { useEffect } from "react";

export type ProjectDetail = {
  id: string;
  title: string;
  category: string;
  tag: string;
  src: string;
  year?: string;
  client?: string;
  description: string;
  tools: string[];
  specs: {
    resolution: string;
    aspectRatio: string;
    fps: string;
    colorSpace: string;
  };
  colors: string[];
};

interface ProjectModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export function ProjectModal({ project, onClose, onPrev, onNext }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose, onPrev, onNext]);

  if (!project) return null;

  return (
    <div
      className="project-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="project-modal-card">
        <button
          className="modal-close-btn"
          type="button"
          onClick={onClose}
          aria-label="Close project modal"
        >
          ×
        </button>

        <div className="modal-preview-area">
          <img
            src={project.src}
            alt={project.title}
            className="modal-preview-img"
            loading="eager"
            decoding="async"
          />
          <div className="modal-nav-arrows">
            {onPrev && (
              <button
                className="modal-nav-btn prev"
                type="button"
                onClick={onPrev}
                aria-label="Previous project"
              >
                ‹
              </button>
            )}
            {onNext && (
              <button
                className="modal-nav-btn next"
                type="button"
                onClick={onNext}
                aria-label="Next project"
              >
                ›
              </button>
            )}
          </div>
        </div>

        <div className="modal-info-pane">
          <div className="modal-header">
            <div className="modal-category-badge">{project.tag || project.category}</div>
            <h2 id="modal-title" className="modal-title">
              {project.title}
            </h2>
            <div className="modal-meta-row">
              <span>{project.year || "2026"}</span>
              <span>•</span>
              <span>{project.client || "CORBIT Studio Archive"}</span>
            </div>
          </div>

          <p className="modal-description">{project.description}</p>

          <div className="modal-section">
            <div className="modal-section-title">Production Toolchain</div>
            <div className="modal-tags">
              {project.tools.map((t) => (
                <span key={t} className="modal-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <div className="modal-section-title">Color Science &amp; Palette</div>
            <div className="modal-palette">
              {project.colors.map((c, i) => (
                <div key={i} className="palette-swatch" style={{ backgroundColor: c }} title={c} />
              ))}
            </div>
          </div>

          <div className="modal-specs-grid">
            <div className="spec-item">
              <span className="spec-label">Format</span>
              <span className="spec-val">{project.specs.resolution}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Ratio</span>
              <span className="spec-val">{project.specs.aspectRatio}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Frame Rate</span>
              <span className="spec-val">{project.specs.fps}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Color Space</span>
              <span className="spec-val">{project.specs.colorSpace}</span>
            </div>
          </div>

          <div className="modal-footer-action">
            <a href="/contact" className="modal-cta-btn">
              Commission Similar Work →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
