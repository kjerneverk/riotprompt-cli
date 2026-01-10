import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/cli.ts"),
      name: "riotprompt-cli",
      fileName: () => "cli.js",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "commander",
        "chalk",
        "riotprompt",
        "execution-openai",
        "execution-anthropic",
        "execution-gemini",
        "node:fs",
        "node:path",
        "node:process",
      ],
      output: {
        banner: "#!/usr/bin/env node",
      },
    },
    sourcemap: true,
    minify: false,
  },
});

