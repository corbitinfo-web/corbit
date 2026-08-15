// Standalone TanStack Start + Cloudflare Workers config.
// Previously wrapped @lovable.dev/vite-tanstack-config — replaced with the
// equivalent plugins directly so the build has zero Lovable dependency.
import { defineConfig, type UserConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig(async ({ command }): Promise<UserConfig> => ({
  css: { transformer: "lightningcss" },
  resolve: {
    alias: { "@": `${process.cwd()}/src` },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
    ],
    ignoreOutdatedRequests: true,
  },
  // host: true avoids the IPv6-only "::" bind that fails on hosts without
  // IPv6 support; override with --host/--port as needed.
  server: { host: true, port: 8080 },
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      server: { entry: "server" },
      importProtection: {
        behavior: "error",
        client: { files: ["**/server/**"], specifiers: ["server-only"] },
      },
    }),
    // Nitro (Cloudflare Workers build) only needed for `vite build`.
    ...(command === "build"
      ? [(await import("nitro/vite")).nitro({ defaultPreset: "cloudflare-module" })]
      : []),
    viteReact(),
  ],
}));
