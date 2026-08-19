import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, type FormEvent } from "react";
import { TopBar } from "@/components/corbit/TopBar";
import { SiteFooter } from "@/components/corbit/SiteFooter";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — CORBIT" },
      {
        name: "description",
        content: "Get in touch with CORBIT — send a short message about work, projects, or ideas.",
      },
      { property: "og:title", content: "Contact — CORBIT" },
      {
        property: "og:description",
        content: "Send CORBIT a short message about work, projects, or ideas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: "https://corbit.in/contact/" },
    ],
    links: [{ rel: "canonical", href: "https://corbit.in/contact/" }],
  }),
  component: Contact,
});

function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const pending = sessionStorage.getItem("corbit_pending_inquiry");
      if (pending) {
        setMessage(pending);
        sessionStorage.removeItem("corbit_pending_inquiry");
      }
    } catch {
      // Storage unavailable or disabled
    }
  }, []);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const body = encodeURIComponent(`${message}\n\n— ${email}`);
    window.location.href = `mailto:corbit.info@gmail.com?subject=${encodeURIComponent("Project Inquiry — corbit.in")}&body=${body}`;
  }

  return (
    <div className="corbit-about">
      <TopBar />
      <main className="page" style={{ maxWidth: 560 }}>
        <h1>Contact</h1>
        <p className="lede">Short note, quick reply. Tell us what you're working on.</p>

        <form className="contact-panel" onSubmit={onSubmit}>
          <label className="contact-label" htmlFor="contact-email">
            Email
          </label>
          <input
            id="contact-email"
            className="contact-input"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />

          <label className="contact-label" htmlFor="contact-message">
            Message
          </label>
          <textarea
            id="contact-message"
            className="contact-input contact-textarea"
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="A few lines is plenty…"
          />

          <button className="contact-send" type="submit">
            Send
          </button>
        </form>
      </main>
      <SiteFooter />
    </div>
  );
}
