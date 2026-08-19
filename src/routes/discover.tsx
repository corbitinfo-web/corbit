import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/corbit/TopBar";
import { SiteFooter } from "@/components/corbit/SiteFooter";

export const Route = createFileRoute("/discover")({
  head: () => ({
    meta: [
      { title: "Discover — CORBIT Archive" },
      { name: "description", content: "Browse and search the full CORBIT archive." },
      { property: "og:title", content: "Discover — CORBIT" },
      { property: "og:description", content: "Browse and search the full CORBIT archive." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://corbit.in/discover/" },
    ],
    links: [{ rel: "canonical", href: "https://corbit.in/discover/" }],
  }),
  component: Discover,
});

function Discover() {
  return (
    <div className="corbit-discover">
      <TopBar />
      <main className="page" style={{ minHeight: "60vh" }} />
      <SiteFooter />
    </div>
  );
}
