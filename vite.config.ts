import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages のプロジェクトサイト: https://<user>.github.io/<repo>/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === "production" ? "/cursor-memo/" : "/",
}));
