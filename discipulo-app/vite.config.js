import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prototypeJsDir = path.resolve(__dirname, "../JS");

function legacyPrototypePlugin() {
  return {
    name: "legacy-prototype-js",
    resolveId(source) {
      if (source.startsWith("legacy:")) {
        return source;
      }
    },
    load(id) {
      if (!id.startsWith("legacy:")) {
        return null;
      }

      const fileName = id.slice("legacy:".length);
      const filePath = path.join(prototypeJsDir, fileName);
      const content = fs.readFileSync(filePath, "utf-8");

      return content
        .replace(/^const /gm, "export const ")
        .replace(/^function /gm, "export function ")
        .replace(/^async function /gm, "export async function ");
    }
  };
}

export default defineConfig({
  plugins: [react(), legacyPrototypePlugin()],
  server: {
    port: 5173,
    fs: {
      allow: [".."]
    }
  }
});
