import { createFileRoute, Link } from "@tanstack/react-router";
import { TopBar } from "@/components/corbit/TopBar";
import { SiteFooter } from "@/components/corbit/SiteFooter";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy & Disclosure — CORBIT" },
      {
        name: "description",
        content: "CORBIT's privacy policy and affiliate/advertising disclosure.",
      },
      { property: "og:title", content: "Privacy & Disclosure — CORBIT" },
      {
        property: "og:description",
        content: "CORBIT's privacy policy and affiliate/advertising disclosure.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://corbit.in/privacy/" },
    ],
    links: [{ rel: "canonical", href: "https://corbit.in/privacy/" }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="corbit-privacy">
      <TopBar />
      <main className="page">
        <h1>Privacy &amp; Disclosure</h1>
        <p className="updated">Last updated: January 2026</p>

        <div className="disclosure">
          <strong>Short version:</strong> CORBIT doesn't sell your personal data. This site uses
          standard analytics, may show ads through Google AdSense, and includes affiliate links
          (Amazon Associates, Envato, Vecteezy, and similar programs) — CORBIT may earn a small
          commission on qualifying purchases made through those links, at no extra cost to you.
        </div>

        <h2>Overview</h2>
        <p>
          This page explains what information CORBIT collects, how it's used, and how affiliate and
          advertising relationships work on this site.
        </p>

        <h2>Information We Collect</h2>
        <p>
          CORBIT collects limited information automatically when you visit the site, and only what
          you provide directly if you choose to contact us.
        </p>
        <ul>
          <li>
            <strong>Automatically collected:</strong> standard technical data such as browser type,
            device type, pages visited, and approximate location (via IP address), typically
            gathered through analytics tools.
          </li>
          <li>
            <strong>Provided by you:</strong> if you use a contact form or email address on the
            site, we collect whatever information you choose to send us (e.g. name, email, message).
          </li>
          <li>
            <strong>Search queries:</strong> terms entered into the on-site search bar are used only
            to filter results on this site and are not stored or shared.
          </li>
        </ul>

        <h2>Cookies &amp; Analytics</h2>
        <p>
          This site may use cookies or similar technologies from analytics providers (such as Google
          Analytics) to understand how visitors use the site. These tools may set cookies in your
          browser. You can disable cookies through your browser settings; doing so may affect some
          site functionality.
        </p>

        <h2>Advertising</h2>
        <p>
          CORBIT may display ads served by Google AdSense. Google and its partners may use cookies
          to serve ads based on your prior visits to this or other websites. You can learn more
          about how Google uses this data, and opt out of personalized advertising, at{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google's Ads Policy page
          </a>
          .
        </p>

        <h2>Affiliate Disclosure</h2>
        <p>
          Some links on this site — including those on the <Link to="/shop">Shop</Link> and{" "}
          <Link to="/assets">Assets</Link> pages — are affiliate links. This means CORBIT may earn a
          commission if you click through and make a qualifying purchase, at no additional cost to
          you. Only tools, products, and resources genuinely used in this work are linked.
        </p>
        <ul>
          <li>
            <strong>Amazon Associates:</strong> as an Amazon Associate, CORBIT earns from qualifying
            purchases.
          </li>
          <li>
            <strong>Envato Elements / Vecteezy:</strong> links to these platforms may be affiliate
            links.
          </li>
        </ul>
        <p>
          Prices, availability, and product details shown on third-party sites (Amazon, Envato,
          Vecteezy, etc.) are accurate as of the date shown on those sites, not necessarily as shown
          here.
        </p>

        <h2>Third-Party Links</h2>
        <p>
          This site links to external sites (social platforms, marketplaces, tool providers) that
          CORBIT does not control. We aren't responsible for the privacy practices or content of
          those sites — please review their own privacy policies before sharing information with
          them.
        </p>

        <h2>Children's Privacy</h2>
        <p>
          This site is not directed at children under 13, and CORBIT does not knowingly collect
          personal information from children under 13.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          This policy may be updated from time to time to reflect changes in tools, affiliate
          programs, or legal requirements. Continued use of the site after changes are posted means
          you accept the updated policy.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent to{" "}
          <a href="mailto:corbit.info@gmail.com">corbit.info@gmail.com</a>.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
