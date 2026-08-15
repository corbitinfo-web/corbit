import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

interface ServiceOption {
  id: string;
  name: string;
  basePrice: number;
  description: string;
}

const SERVICES: ServiceOption[] = [
  {
    id: "video-editing",
    name: "Video Editing & Narrative",
    basePrice: 45000,
    description: "Narrative pacing, commercial cutdowns, YouTube/reels pacing & color match.",
  },
  {
    id: "motion-3d",
    name: "3D Motion & CGI",
    basePrice: 65000,
    description: "Octane/Blender 3D simulation, product visualization, kinetic typography.",
  },
  {
    id: "vfx",
    name: "Visual Effects & Clean-up",
    basePrice: 55000,
    description: "Compositing, camera tracking, screen replacements, rotoscoping & grain.",
  },
  {
    id: "design-identity",
    name: "Brand & Visual Identity",
    basePrice: 40000,
    description: "Complete visual language, custom typography, asset kits & guideline manual.",
  },
  {
    id: "creative-writing",
    name: "Scripts & Creative Copy",
    basePrice: 25000,
    description: "Treatment writing, voiceover scripting, and editorial storytelling.",
  },
];

const SCOPES = [
  { id: "compact", label: "Single Hero Piece", multiplier: 1.0 },
  { id: "campaign", label: "Campaign Package (3-5 Deliverables)", multiplier: 2.2 },
  { id: "full", label: "Comprehensive Production System", multiplier: 3.5 },
];

const DELIVERABLES = [
  { id: "4k-master", label: "4K Master ProRes 4444XQ", addOn: 8000 },
  { id: "social-cuts", label: "9:16 & 1:1 Social Adaptations", addOn: 12000 },
  { id: "source-files", label: "Archival Raw Project Files", addOn: 18000 },
  { id: "audio-foley", label: "Custom Sound Foley & Mix", addOn: 14000 },
];

export function QuoteCalculator() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string>("video-editing");
  const [selectedScope, setSelectedScope] = useState<string>("compact");
  const [isRush, setIsRush] = useState<boolean>(false);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["4k-master"]);

  const service = SERVICES.find((s) => s.id === selectedService) ?? SERVICES[0]!;
  const scope = SCOPES.find((sc) => sc.id === selectedScope) ?? SCOPES[0]!;

  const addonsTotal = selectedAddons.reduce((acc, curr) => {
    const addon = DELIVERABLES.find((d) => d.id === curr);
    return acc + (addon ? addon.addOn : 0);
  }, 0);

  const baseCalculated = Math.round(service.basePrice * scope.multiplier + addonsTotal);
  const rushMultiplier = isRush ? 1.35 : 1.0;
  const finalMin = Math.round((baseCalculated * rushMultiplier * 0.9) / 1000) * 1000;
  const finalMax = Math.round((baseCalculated * rushMultiplier * 1.15) / 1000) * 1000;

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleInquire = () => {
    const inquiryDetails = `Inquiry Summary:\n• Service: ${service.name}\n• Scope: ${scope.label}\n• Timeline: ${isRush ? "Rush Delivery (5-7 Days)" : "Standard Schedule (2-3 Weeks)"}\n• Add-ons: ${selectedAddons.map((id) => DELIVERABLES.find((d) => d.id === id)?.label).join(", ") || "None"}\n• Est. Budget Range: ₹${finalMin.toLocaleString("en-IN")} – ₹${finalMax.toLocaleString("en-IN")}\n\nProject Notes:`;

    // Store inquiry in sessionStorage so contact page can pre-fill
    try {
      sessionStorage.setItem("corbit_pending_inquiry", inquiryDetails);
    } catch {
      // Ignore storage errors if disabled
    }

    navigate({
      to: "/contact",
    });
  };

  return (
    <div className="quote-calculator-card">
      <div className="calc-header">
        <div className="calc-pill">Interactive Scope Estimator</div>
        <h3 className="calc-title">Studio Production &amp; Budget Planner</h3>
        <p className="calc-subtitle">
          Configure discipline, deliverables, and timeline for an instant studio scope breakdown.
        </p>
      </div>

      <div className="calc-grid">
        <div className="calc-config-pane">
          <div className="calc-group">
            <label className="calc-label">1. Select Discipline</label>
            <div className="calc-service-list">
              {SERVICES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`calc-service-btn${selectedService === s.id ? " active" : ""}`}
                  onClick={() => setSelectedService(s.id)}
                >
                  <div className="service-btn-name">{s.name}</div>
                  <div className="service-btn-desc">{s.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="calc-group">
            <label className="calc-label">2. Project Scope</label>
            <div className="calc-pill-row">
              {SCOPES.map((sc) => (
                <button
                  key={sc.id}
                  type="button"
                  className={`calc-option-chip${selectedScope === sc.id ? " active" : ""}`}
                  onClick={() => setSelectedScope(sc.id)}
                >
                  {sc.label}
                </button>
              ))}
            </div>
          </div>

          <div className="calc-group">
            <label className="calc-label">3. Deliverables &amp; Asset Packages</label>
            <div className="calc-addons-grid">
              {DELIVERABLES.map((d) => {
                const checked = selectedAddons.includes(d.id);
                return (
                  <button
                    key={d.id}
                    type="button"
                    className={`calc-addon-item${checked ? " checked" : ""}`}
                    onClick={() => toggleAddon(d.id)}
                  >
                    <span className="addon-checkbox">{checked ? "✓" : ""}</span>
                    <span className="addon-name">{d.label}</span>
                    <span className="addon-price">+₹{d.addOn.toLocaleString("en-IN")}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="calc-group">
            <label className="calc-label">4. Turnaround Pace</label>
            <div className="calc-pill-row">
              <button
                type="button"
                className={`calc-option-chip${!isRush ? " active" : ""}`}
                onClick={() => setIsRush(false)}
              >
                Standard Schedule (2–3 Weeks)
              </button>
              <button
                type="button"
                className={`calc-option-chip${isRush ? " active" : ""}`}
                onClick={() => setIsRush(true)}
              >
                ⚡ Priority Rush (5–7 Days)
              </button>
            </div>
          </div>
        </div>

        <div className="calc-summary-pane">
          <div className="summary-box">
            <div className="summary-label">Estimated Studio Range</div>
            <div className="summary-amount">
              ₹{finalMin.toLocaleString("en-IN")}
              <span className="amount-sep"> – </span>₹{finalMax.toLocaleString("en-IN")}
            </div>
            <div className="summary-tax-note">Approximate quote based on selected parameters.</div>

            <hr className="summary-divider" />

            <div className="summary-breakdown">
              <div className="breakdown-row">
                <span>Discipline:</span>
                <strong>{service.name.split("&")[0]}</strong>
              </div>
              <div className="breakdown-row">
                <span>Scope:</span>
                <strong>{scope.label.split("(")[0]}</strong>
              </div>
              <div className="breakdown-row">
                <span>Timeline:</span>
                <strong>{isRush ? "Rush Priority" : "Standard"}</strong>
              </div>
              <div className="breakdown-row">
                <span>Deliverables:</span>
                <strong>{selectedAddons.length} selected</strong>
              </div>
            </div>

            <button type="button" className="calc-cta-btn" onClick={handleInquire}>
              Initiate Project Brief →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
