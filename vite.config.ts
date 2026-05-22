import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const base = process.env.VITE_BASE_PATH ?? "/";

export default defineConfig(() => ({
  base,
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
