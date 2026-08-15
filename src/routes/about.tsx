import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/corbit/TopBar";
import { SiteFooter } from "@/components/corbit/SiteFooter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — CORBIT Creative Studio" },
      {
        name: "description",
        content:
          "About CORBIT — visual archive and creative studio across video editing, creative direction, story writing, scripting, and experimental visuals.",
      },
      { property: "og:title", content: "About — CORBIT" },
      {
        property: "og:description",
        content:
          "About CORBIT — visual archive and creative studio across video editing, creative direction, story writing, scripting, and experimental visuals.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://corbit.in/about/" },
    ],
    links: [{ rel: "canonical", href: "https://corbit.in/about/" }],
  }),
  component: About,
});

function About() {
  return (
    <div className="corbit-about">
      <TopBar />

      <main className="page about-page-content" style={{ maxWidth: 860, margin: "0 auto" }}>
        <header className="about-header">
          <h1>About</h1>
        </header>

        <section className="about-statement">
          <p className="about-lead">
            Honestly, I don't really know how to put myself into one category.{" "}
            <strong>I just like making things.</strong>
          </p>
          <p className="about-sublead">
            One day I might be editing a video, the next I'm writing a story, figuring out a script,
            directing something, or messing around with AI to see what I can create.
          </p>



        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
