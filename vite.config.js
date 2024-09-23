import { sentryVitePlugin } from "@sentry/vite-plugin";
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: "8080",
  },

  plugins: [react(), sentryVitePlugin({
    org: "veloxforce",
    project: "invoice-agent-frontend",
    url: "https://sentry.io/"
  })],

  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
      {
        find: "lib",
        replacement: resolve(__dirname, "lib"),
      },
    ],
  },

  build: {
    sourcemap: true
  }
});