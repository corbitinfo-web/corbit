import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="sitefooter">
      <div className="footer-inner">
        <div className="footer-col">
          <div className="brand">CORBIT</div>
          <p className="foot-note">
            Visual archive &amp; creative studio — video editing, design, creative writing, and
            research work.
          </p>
        </div>
        <div className="footer-col">
          <div className="foot-label">Follow</div>
          <div className="social-row">
            <a
              href="https://www.instagram.com/corbit.info/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" />
              </svg>
            </a>
            <a
              href="https://pin.it/40lFy047E"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest"
            >
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <path d="M9 17c1-3 1.5-5 1.5-5m0 0C10 10 11 8 13 8c2 0 3 1.5 2.6 3.6-.3 1.7-1.4 3-2.9 3-.7 0-1.2-.3-1.4-.7" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@Corbit-8"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <svg viewBox="0 0 24 24">
                <rect x="3" y="6" width="18" height="12" rx="3" />
                <path d="M11 10l4 2-4 2z" fill="var(--ink)" stroke="none" />
              </svg>
            </a>
          </div>
        </div>
        <div className="footer-col">
          <div className="foot-label">Site</div>
          <Link to="/services">Services</Link>
          <Link to="/journal">Journal</Link>
          <Link to="/assets">Assets</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-col">
          <div className="foot-label">Legal</div>
          <Link to="/about">About</Link>
          <Link to="/privacy">Privacy &amp; Disclosure</Link>
        </div>
      </div>
      <div className="footer-bottom">
        © 2026 CORBIT. As an Amazon Associate I earn from qualifying purchases. Some links are
        affiliate links.
      </div>
    </footer>
  );
}
