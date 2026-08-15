import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { AmbientSound } from "@/components/corbit/AmbientSound";
import { useScrollPhysics } from "@/hooks/useScrollPhysics";

export function TopBar() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { isScrolled } = useScrollPhysics();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);


  function onSearch(e: FormEvent) {
    e.preventDefault();
    setOpen(false);
    navigate({ to: "/discover", search: { q: q.trim() || undefined } });
  }

  return (
    <header className={`topbar${open ? " topbar--open" : ""}${isScrolled ? " topbar--scrolled" : ""}`}>
      <div className="topbar-inner">
        <Link className="brand" to="/" aria-label="CORBIT — home" data-cursor="pointer" data-cursor-label="CORBIT">
          CORBIT
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav-toggle-bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <nav className="nav" aria-label="Primary">
          <div className="nav-item">
            <Link to="/discover">Discover</Link>
          </div>
          <div className="nav-item">
            <Link to="/journal">Journal</Link>
          </div>
          <div className="nav-item">
            <Link to="/assets">Assets</Link>
          </div>
          <div className="nav-item">
            <Link to="/shop">Shop</Link>
          </div>
          <div className="nav-item">
            <Link to="/contact">Contact</Link>
          </div>
        </nav>

        <div
          className="topbar-actions"
          style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}
        >
          <AmbientSound />
          <form className="search" role="search" onSubmit={onSearch}>
            <input
              type="search"
              name="q"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Enter Search…"
              aria-label="Search"
            />
            <button type="submit" aria-label="Search">
              <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round">
                <circle cx="10.5" cy="10.5" r="6.5" />
                <line x1="20" y1="20" x2="15.5" y2="15.5" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
